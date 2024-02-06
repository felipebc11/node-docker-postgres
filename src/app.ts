import express, { json, urlencoded, Response as ExResponse, Request as ExRequest, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import { inject, injectable } from 'inversify';

import { RegisterRoutes } from '../build/routes';
import { PostgresConnection } from './infrastructure/database/postgres/postgres-connection';
import { HandleGeneralErrors } from './infrastructure/helpers/handle-errors';

@injectable()
export class Bootstrap {
  private port = process.env.HTTP_SEVER_PORT || 3000;
  private app = express();
  private httpServer: ReturnType<express.Express['listen']>;

  constructor(
    @inject(HandleGeneralErrors) private readonly handleGeneralErrors: HandleGeneralErrors,
    @inject(PostgresConnection) private readonly postgresConnection: PostgresConnection,
  ) {}

  private startHttpServer() {
    this.app.use(
      urlencoded({
        extended: true,
      }),
    );

    this.app.use(json());

    this.app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
      return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')));
    });

    RegisterRoutes(this.app);

    this.app.use((err: Error, _: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void => {
      this.handleGeneralErrors.handleError(err, res);

      next();
    });

    this.httpServer = this.app.listen(this.port, () =>
      console.log(`Server is listening at http://localhost:${this.port}`),
    );
  }

  private async startDatabaseConnection() {
    await this.postgresConnection.createConnection();
  }

  public async start() {
    await this.startDatabaseConnection();
    this.startHttpServer();
  }

  public stop() {
    this.postgresConnection.closeConnection();
    this.httpServer.close();
  }
}
