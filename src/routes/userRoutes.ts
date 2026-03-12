import { Router } from 'express';
import { userController } from '../controllers/userController';
import { validate } from '../middleware/validate';
import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} from '../validators/userValidator';

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', validate(userIdSchema, 'params'), userController.getById);
router.post('/', validate(createUserSchema), userController.create);
router.patch(
  '/:id',
  validate(userIdSchema, 'params'),
  validate(updateUserSchema),
  userController.update
);
router.delete('/:id', validate(userIdSchema, 'params'), userController.remove);

export default router;
