import request from 'supertest';
import app from '../../src/app';
import { userRepository } from '../../src/repositories/userRepository';

beforeEach(() => {
  userRepository.clear();
});

describe('GET /api/users', () => {
  it('returns an empty array initially', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it('returns all created users', async () => {
    await request(app).post('/api/users').send({ name: 'Alice', email: 'alice@example.com' });
    await request(app).post('/api/users').send({ name: 'Bob', email: 'bob@example.com' });
    const res = await request(app).get('/api/users');
    expect(res.body.data).toHaveLength(2);
  });
});

describe('POST /api/users', () => {
  it('creates a user and returns 201', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com' });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe('alice@example.com');
  });

  it('returns 400 for invalid email', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Alice', email: 'not-an-email' });
    expect(res.status).toBe(400);
  });

  it('returns 409 when email is already in use', async () => {
    await request(app).post('/api/users').send({ name: 'Alice', email: 'alice@example.com' });
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Alice2', email: 'alice@example.com' });
    expect(res.status).toBe(409);
  });
});

describe('GET /api/users/:id', () => {
  it('returns a user by id', async () => {
    const created = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com' });
    const { id } = created.body.data;
    const res = await request(app).get(`/api/users/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(id);
  });

  it('returns 400 for non-UUID id', async () => {
    const res = await request(app).get('/api/users/not-a-uuid');
    expect(res.status).toBe(400);
  });

  it('returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/users/00000000-0000-0000-0000-000000000000');
    expect(res.status).toBe(404);
  });
});

describe('PATCH /api/users/:id', () => {
  it('updates a user', async () => {
    const created = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com' });
    const { id } = created.body.data;
    const res = await request(app).patch(`/api/users/${id}`).send({ name: 'Alicia' });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Alicia');
  });
});

describe('DELETE /api/users/:id', () => {
  it('deletes a user and returns 204', async () => {
    const created = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com' });
    const { id } = created.body.data;
    const res = await request(app).delete(`/api/users/${id}`);
    expect(res.status).toBe(204);
  });

  it('returns 404 when deleting a non-existent user', async () => {
    const res = await request(app).delete('/api/users/00000000-0000-0000-0000-000000000000');
    expect(res.status).toBe(404);
  });
});
