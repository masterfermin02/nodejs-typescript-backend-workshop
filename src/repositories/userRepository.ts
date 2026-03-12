import { v4 as uuidv4 } from 'uuid';
import { User, CreateUserDTO, UpdateUserDTO } from '../models/User';

// In-memory store — replace with a real DB in production
const users = new Map<string, User>();

export const userRepository = {
  findAll(): User[] {
    return Array.from(users.values());
  },

  findById(id: string): User | undefined {
    return users.get(id);
  },

  findByEmail(email: string): User | undefined {
    return Array.from(users.values()).find((u) => u.email === email);
  },

  create(dto: CreateUserDTO): User {
    const now = new Date();
    const user: User = {
      id: uuidv4(),
      name: dto.name,
      email: dto.email,
      createdAt: now,
      updatedAt: now,
    };
    users.set(user.id, user);
    return user;
  },

  update(id: string, dto: UpdateUserDTO): User | undefined {
    const existing = users.get(id);
    if (!existing) return undefined;

    const updated: User = {
      ...existing,
      ...dto,
      updatedAt: new Date(),
    };
    users.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    return users.delete(id);
  },

  // Utility for tests
  clear(): void {
    users.clear();
  },
};
