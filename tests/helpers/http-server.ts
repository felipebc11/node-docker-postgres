import 'reflect-metadata';
import { iocContainer } from '../../src/ioc';
import { Bootstrap } from '../../src/app';

const app = iocContainer.get<Bootstrap>(Bootstrap);

export const startHttpServer = async () => {
  await app.start();
};

export const stopHttpServer = async () => {
  app.stop();
};