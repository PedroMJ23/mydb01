import express, { Express } from "express";
import userRoutes from "../routes/usersr";
import ordersRoutes from "../routes/ordersr";
import { conectDB } from "../database/config";
import cors from "cors";
import ordenesRoutes from "../routes/ordenesr";

export class Server {
  app: Express;
  port: string | number | undefined;

  constructor() {
    this.app = express();
    this.conectToDb();
    this.middlewares();
    this.routes();
    this.port = process.env.PORT;
  }
  async conectToDb(): Promise<void> {
    await conectDB();
  }

  middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes(): void {
    this.app.use("/users", userRoutes);
    this.app.use("/ordenes", ordenesRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Running on port ${this.port}`);
    });
  }
}
