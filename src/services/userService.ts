import { userRepository } from '../repositories/userRepository';
import { User, CreateUserDTO, UpdateUserDTO } from '../models/User';

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export const userService = {
  getAllUsers(): User[] {
    return userRepository.findAll();
  },

  getUserById(id: string): User {
    const user = userRepository.findById(id);
    if (!user) throw new NotFoundError(`User with id "${id}" not found`);
    return user;
  },

  createUser(dto: CreateUserDTO): User {
    const existing = userRepository.findByEmail(dto.email);
    if (existing) throw new ConflictError(`Email "${dto.email}" is already in use`);
    return userRepository.create(dto);
  },

  updateUser(id: string, dto: UpdateUserDTO): User {
    if (dto.email) {
      const existing = userRepository.findByEmail(dto.email);
      if (existing && existing.id !== id) {
        throw new ConflictError(`Email "${dto.email}" is already in use`);
      }
    }
    const updated = userRepository.update(id, dto);
    if (!updated) throw new NotFoundError(`User with id "${id}" not found`);
    return updated;
  },

  deleteUser(id: string): void {
    const deleted = userRepository.delete(id);
    if (!deleted) throw new NotFoundError(`User with id "${id}" not found`);
  },
};
