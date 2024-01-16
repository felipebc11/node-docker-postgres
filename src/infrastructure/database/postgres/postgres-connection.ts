import { injectable } from 'inversify';
import { Repository, EntityTarget, DataSource } from 'typeorm';

import { postgresDataSource } from './data-source';

@injectable()
export class PostgresConnection {
  public getConnection(): DataSource {
    return postgresDataSource;
  }

  public async createConnection(): Promise<DataSource> {
    return postgresDataSource.initialize();
  }

  public async closeConnection(): Promise<void> {
    return postgresDataSource.destroy();
  }

  public getRepository(entity: EntityTarget<any>): Repository<any> {
    return postgresDataSource.getRepository(entity);
  }
}