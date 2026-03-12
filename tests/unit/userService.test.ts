import { userService, NotFoundError, ConflictError } from '../../src/services/userService';
import { userRepository } from '../../src/repositories/userRepository';

beforeEach(() => {
  userRepository.clear();
});

describe('userService.createUser', () => {
  it('creates a user with valid data', () => {
    const user = userService.createUser({ name: 'Alice', email: 'alice@example.com' });
    expect(user.id).toBeDefined();
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@example.com');
  });

  it('throws ConflictError when email is already taken', () => {
    userService.createUser({ name: 'Alice', email: 'alice@example.com' });
    expect(() =>
      userService.createUser({ name: 'Bob', email: 'alice@example.com' })
    ).toThrow(ConflictError);
  });
});

describe('userService.getUserById', () => {
  it('returns a user by id', () => {
    const created = userService.createUser({ name: 'Alice', email: 'alice@example.com' });
    const found = userService.getUserById(created.id);
    expect(found).toEqual(created);
  });

  it('throws NotFoundError for unknown id', () => {
    expect(() => userService.getUserById('00000000-0000-0000-0000-000000000000')).toThrow(
      NotFoundError
    );
  });
});

describe('userService.updateUser', () => {
  it('updates a user name', () => {
    const user = userService.createUser({ name: 'Alice', email: 'alice@example.com' });
    const updated = userService.updateUser(user.id, { name: 'Alicia' });
    expect(updated.name).toBe('Alicia');
    expect(updated.email).toBe('alice@example.com');
  });

  it('throws ConflictError when updating to an email already taken by another user', () => {
    userService.createUser({ name: 'Alice', email: 'alice@example.com' });
    const bob = userService.createUser({ name: 'Bob', email: 'bob@example.com' });
    expect(() => userService.updateUser(bob.id, { email: 'alice@example.com' })).toThrow(
      ConflictError
    );
  });
});

describe('userService.deleteUser', () => {
  it('deletes an existing user', () => {
    const user = userService.createUser({ name: 'Alice', email: 'alice@example.com' });
    userService.deleteUser(user.id);
    expect(() => userService.getUserById(user.id)).toThrow(NotFoundError);
  });

  it('throws NotFoundError when deleting non-existent user', () => {
    expect(() => userService.deleteUser('00000000-0000-0000-0000-000000000000')).toThrow(
      NotFoundError
    );
  });
});
