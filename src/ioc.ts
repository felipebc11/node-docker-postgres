import { Container, decorate, injectable } from 'inversify';
import { buildProviderModule } from "inversify-binding-decorators";
import { Controller } from "tsoa";
import 'reflect-metadata';

import { UserApplication } from './app/user.application';
import { UserController } from './presentation/user.controller';
import { UserRepository } from './service/repositories/user.repository';


const iocContainer = new Container();

decorate(injectable(), Controller);

iocContainer.bind<UserController>(UserController).to(UserController);
iocContainer.bind<UserApplication>(UserApplication).to(UserApplication);
iocContainer.bind<UserRepository>(UserRepository).to(UserRepository);

iocContainer.load(buildProviderModule());

export { iocContainer };