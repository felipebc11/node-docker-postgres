import supertest from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';

import { CreateUserParams } from '../../src/infrastructure/repositories/types/create-user.type';
import { DefaultSuccessMessages } from '../../src/domain/enums/default-messages/default-success-messages';
import { DefaultErrorMessages } from '../../src/domain/enums/default-messages/default-error-messages';

describe('Create User POST', () => {
  let app: TestAgent;

  beforeAll(async () => {
    app = supertest(`http://localhost:${process.env.HTTP_SEVER_PORT}`);
  });

  const defaultCreateUserBody: CreateUserParams = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    bornDate: faker.date.past(),
    documentNumber: faker.number.int({ min: 10000, max: 99999 }).toString(),
    documentType: 'CPF',
    address: {
      street: faker.location.street(),
      number: faker.number.int({ min: 10000, max: 99999 }),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      zipCode: faker.location.zipCode(),
    },
  };

  describe('When is unauthorized', () => {
    describe('When is missing token in header', () => {
      it('should return 401 and the error message', async () => {
        const response = await app.post('/users').send(defaultCreateUserBody);

        expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        expect(response.body).toEqual({ message: DefaultErrorMessages.MISSING_TOKEN_IN_HEADER });
      });
    });

    describe('When receive a invalid token', () => {
      it('should return 401 and the error message', async () => {
        const response = await app
          .post('/users')
          .set('Authorization', `Bearer ${faker.internet.password()}`)
          .send(defaultCreateUserBody);

        expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
        expect(response.body).toEqual({ message: DefaultErrorMessages.INVALID_TOKEN });
      });
    });
  });

  describe('When is authorized', () => {
    let bearerToken: string;

    beforeEach(async () => {
      const response = await app.post('/users/login').send({
        email: process.env.ADMIN_USER_EMAIL,
        password: process.env.ADMIN_USER_PASSWORD,
      });

      bearerToken = response.body;
    });

    describe('When receive invalid body', () => {
      it('should return 422 and the invalid fields', async () => {
        const { email: _, ...invalidBody } = defaultCreateUserBody;

        const response = await app.post('/users').set('Authorization', `Bearer ${bearerToken}`).send(invalidBody);

        expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
        expect(response.body).toEqual({
          details: {
            'userData.email': {
              message: '\'email\' is required',
            },
          },
          message: 'Validation Failed',
        });
      });
    });

    describe('When user is successfully created', () => {
      it('should create a user', async () => {
        const response = await app
          .post('/users')
          .set('Authorization', `Bearer ${bearerToken}`)
          .send(defaultCreateUserBody);

        expect(response.status).toBe(StatusCodes.CREATED);
        expect(response.body).toEqual(DefaultSuccessMessages.USER_CREATED_SUCCESSFULLY);
      });
    });
  });
});
