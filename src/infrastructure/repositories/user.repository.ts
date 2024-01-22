import { Repository } from 'typeorm';
import { inject, injectable } from 'inversify';

import { User } from '../../domain/entity/User';
import { CreateUserParams } from './types/create-user.type';
import { PostgresConnection } from '../../infrastructure/database/postgres/postgres-connection';
import { DefaultSuccessMessages } from '../../domain/enums/default-messages/default-success-messages';

@injectable()
export class UserRepository {
  constructor(@inject(PostgresConnection) private readonly connection: PostgresConnection) {}

  private get repository(): Repository<User> {
    return this.connection.getRepository(User);
  }

  public async findOne(params: Partial<User>): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        ...params,
      },
      join: {
        alias: 'user',
        innerJoinAndSelect: {
          address: 'user.address',
        },
      },
    });

    return user ?? null;
  }

  public async save(params: CreateUserParams): Promise<string> {
    try {
      await this.repository.save(params);

      return DefaultSuccessMessages.USER_CREATED_SUCCESSFULLY;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
