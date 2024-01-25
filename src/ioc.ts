import { Container, decorate, injectable } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { Controller } from 'tsoa';
import 'reflect-metadata';

import { UserApplication } from './app/user.application';
import { UserController } from './presentation/user.controller';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { PostgresConnection } from './infrastructure/database/postgres/postgres-connection';
import { AuthService } from './infrastructure/auth/auth.service';
import { HandleAxiosErrors } from './infrastructure/helpers/handler-axios-errors';
import { HandleGeneralErrors } from './infrastructure/helpers/handle-errors';
import { Bootstrap } from './app';

const iocContainer = new Container();

decorate(injectable(), Controller);

iocContainer.bind<Bootstrap>(Bootstrap).to(Bootstrap);
iocContainer.bind<UserController>(UserController).to(UserController);
iocContainer.bind<UserApplication>(UserApplication).to(UserApplication);
iocContainer.bind<UserRepository>(UserRepository).to(UserRepository);
iocContainer.bind<AuthService>(AuthService).to(AuthService);
iocContainer.bind<HandleGeneralErrors>(HandleGeneralErrors).to(HandleGeneralErrors);
iocContainer.bind<HandleAxiosErrors>(HandleAxiosErrors).to(HandleAxiosErrors);
iocContainer.bind<PostgresConnection>(PostgresConnection).to(PostgresConnection);

iocContainer.load(buildProviderModule());

export { iocContainer };
