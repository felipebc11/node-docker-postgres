import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { iocContainer } from './ioc';
import { Bootstrap } from './app';

const bootstrap = iocContainer.get<Bootstrap>(Bootstrap);

bootstrap.start();
