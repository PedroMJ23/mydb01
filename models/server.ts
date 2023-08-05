import express, { Express } from "express";
import userRoutes  from '../routes/usersr';
import { conectDB } from "../database/config";

export class Server {
  app: Express;

  constructor() {
    this.app = express();
    this.conectToDb();
    this.middlewares();
    this.routes();
    
  }
  async conectToDb(): Promise<void> {
    await conectDB();
  }

  middlewares(): void {
    this.app.use(express.json());
  }

  routes(): void{
    this.app.use("/users", userRoutes)
  }

  
  listen(): void{
    this.app.listen(8080, ()=>{
        console.log('Running on port 8080')
    })
  }


}
