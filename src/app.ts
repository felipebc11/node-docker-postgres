import express, { json, urlencoded, Response as ExResponse, Request as ExRequest } from "express";

import swaggerUi from "swagger-ui-express";

import { RegisterRoutes } from "../build/routes";

export class Bootstrap {
  private port = process.env.HTTP_SEVER_PORT || 3000;
  public app = express()

  public startHttpServer(){
    this.app.use(
      urlencoded({
        extended: true,
      })
    );

    this.app.use(json());
    this.app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
      return res.send(
        swaggerUi.generateHTML(await import("../build/swagger.json"))
      );
    });

    RegisterRoutes(this.app);

    this.app.listen(this.port, () =>
      console.log(`Server is listening at http://localhost:${this.port}`)
    );
  }
}