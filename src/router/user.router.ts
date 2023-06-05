import { Request, Response, Router } from "express";
import { UserController } from "../controller/user.controller";
import { getUserMiddleware } from "../middleware/user.middleware";

const userRouter = Router();
// create new user
userRouter.post('/create', async (req: Request, res: Response) => {
  try {
    const user = await UserController.createUser();
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// add action to user
userRouter.post('/:userId/actions', getUserMiddleware, async (req: Request, res: Response) => {
  try {
    const action = await UserController.addActionUser(req, res);
    res.json(action);
  } catch (error) {
    console.error('Error adding action to user', error);
    res.status(500).json({message: 'Internal server error'})
  }
});

export default userRouter;
