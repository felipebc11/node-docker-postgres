import { Repository } from 'typeorm';
import { inject, injectable } from 'inversify';

import { User } from '../../domain/entity/User';
import { CreateUserParams } from './types/create-user.type';
import { NotFoundException } from '../../domain/exceptions/Exceptions';
import { PostgresConnection } from '../../infrastructure/database/postgres/postgres-connection';
import { DefaultErrorMessages } from '../../domain/enums/default-messages/default-error-messages';
import { DefaultSuccessMessages } from '../../domain/enums/default-messages/default-success-messages';

@injectable()
export class UserRepository {
  constructor(@inject(PostgresConnection) private readonly connection: PostgresConnection) {}

  private get repository(): Repository<User> {
    return this.connection.getRepository(User);
  }

  public async findOne(params: Partial<User>): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        ...params,
      },
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          address: 'user.address',
        },
      },
    });

    if (!user) throw new NotFoundException(DefaultErrorMessages.USER_NOT_FOUND);

    return user;
  }

  public async save(params: CreateUserParams): Promise<string> {
    await this.repository.save(params);

    return DefaultSuccessMessages.USER_CREATED_SUCCESSFULLY;
  }
}
