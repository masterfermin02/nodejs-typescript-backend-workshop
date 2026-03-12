import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { CreateUserInput, UpdateUserInput } from '../validators/userValidator';

export const userController = {
  getAll(_req: Request, res: Response): void {
    const users = userService.getAllUsers();
    res.json({ status: 'success', data: users });
  },

  getById(req: Request, res: Response, next: NextFunction): void {
    try {
      const user = userService.getUserById(req.params.id);
      res.json({ status: 'success', data: user });
    } catch (err) {
      next(err);
    }
  },

  create(req: Request<object, object, CreateUserInput>, res: Response, next: NextFunction): void {
    try {
      const user = userService.createUser(req.body);
      res.status(201).json({ status: 'success', data: user });
    } catch (err) {
      next(err);
    }
  },

  update(
    req: Request<{ id: string }, object, UpdateUserInput>,
    res: Response,
    next: NextFunction
  ): void {
    try {
      const user = userService.updateUser(req.params.id, req.body);
      res.json({ status: 'success', data: user });
    } catch (err) {
      next(err);
    }
  },

  remove(req: Request, res: Response, next: NextFunction): void {
    try {
      userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
