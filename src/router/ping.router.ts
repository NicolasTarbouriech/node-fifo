import { Request, Response, Router } from 'express';

const pingRouter = Router();

pingRouter.get("/ping", (req: Request, res: Response) => {
  res.json('pong');
});
export default pingRouter;
