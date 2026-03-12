# Workshop Exercises

All exercises build on the `starter` branch. The completed solution lives on the `final` branch.

---

## Exercise 1 — Health Check Endpoint
**Goal:** Add a `GET /health` route that returns server status and uptime.

**Tasks:**
1. Add a `/health` route to `app.ts`
2. Return `{ status: "ok", uptime: process.uptime(), timestamp: ... }`
3. Verify with `curl http://localhost:3000/health`

---

## Exercise 2 — User Model & Repository
**Goal:** Define the `User` interface and implement the in-memory repository.

**Tasks:**
1. Create `src/models/User.ts` with `User`, `CreateUserDTO`, `UpdateUserDTO`
2. Implement `userRepository` with `findAll`, `findById`, `findByEmail`, `create`, `update`, `delete`
3. Use `uuid` for ID generation

---

## Exercise 3 — Service Layer
**Goal:** Add business logic on top of the repository.

**Tasks:**
1. Implement `userService` in `src/services/userService.ts`
2. Add `NotFoundError` and `ConflictError` custom error classes
3. Enforce the uniqueness rule on email in `createUser` and `updateUser`

---

## Exercise 4 — Zod Validation Schemas
**Goal:** Validate incoming request data before it reaches the controller.

**Tasks:**
1. Create `src/validators/userValidator.ts`
2. Write schemas for create, update, and ID param validation
3. Export inferred TypeScript types

---

## Exercise 5 — Validate Middleware
**Goal:** Build a reusable middleware that applies a Zod schema to any request target.

**Tasks:**
1. Implement `validate(schema, target)` in `src/middleware/validate.ts`
2. Return a `400` with structured field errors on failure
3. Attach parsed data back to `req[target]`

---

## Exercise 6 — Controller & Routes
**Goal:** Wire routes to controller methods.

**Tasks:**
1. Implement all five controller methods (`getAll`, `getById`, `create`, `update`, `remove`)
2. Register routes with appropriate middleware in `src/routes/userRoutes.ts`
3. Mount the router at `/api/users` in `app.ts`

---

## Exercise 7 — Error Handler Middleware
**Goal:** Centralize error handling.

**Tasks:**
1. Implement `errorHandler` in `src/middleware/errorHandler.ts`
2. Map `NotFoundError` → 404, `ConflictError` → 409, everything else → 500
3. Ensure `app.ts` registers it last

---

## Exercise 8 — Unit Tests
**Goal:** Test the service layer without HTTP.

**Tasks:**
1. Write tests in `tests/unit/userService.test.ts`
2. Cover happy paths and error paths for `createUser`, `getUserById`, `updateUser`, `deleteUser`
3. Use `userRepository.clear()` in `beforeEach`

---

## Exercise 9 — Integration Tests
**Goal:** Test the API end-to-end with Supertest.

**Tasks:**
1. Write tests in `tests/integration/userRoutes.test.ts`
2. Cover all five endpoints including validation and error cases
3. Run `npm test` and confirm all tests pass

---

## Exercise 10 — Graceful Shutdown
**Goal:** Handle `SIGTERM` and `SIGINT` cleanly.

**Tasks:**
1. Listen for signals in `src/server.ts`
2. Call `server.close()` before `process.exit(0)`
3. Log a shutdown message

---

## Exercise 11 — Pagination for GET /users

**Goal:** Add pagination support to the `GET /api/users` endpoint so large lists can be fetched in pages.

**Context:**
Right now `GET /api/users` returns every user at once. As the dataset grows this becomes slow and expensive. A paginated response lets the client control how many records it receives and which page it is on.

**Expected query parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer ≥ 1 | `1` | Page number to return |
| `limit` | integer 1–100 | `10` | Number of users per page |

**Expected response shape:**

```json
{
  "status": "success",
  "data": [ ...users... ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5
  }
}
```

**Tasks:**

1. Create a Zod schema in `src/validators/userValidator.ts` that validates `page` and `limit` as positive integers with the defaults above. Use `z.coerce.number()` since query params arrive as strings.
2. Add a `paginate(items, page, limit)` helper inside `userRepository.ts` that slices the full list and returns `{ data, total }`.
3. Add a `getAllUsers(page, limit)` overload (or update the existing one) in `userService.ts` to accept pagination arguments and return both the user slice and the total count.
4. Update `userController.ts` — `getAll` should read `page` and `limit` from `req.query` and include the `meta` object in the response.
5. Apply the new query validation schema to the `GET /` route in `userRoutes.ts` using `validate(paginationSchema, 'query')`.

**Hints:**
- `Array.slice((page - 1) * limit, page * limit)` gives you the right window.
- `totalPages` is `Math.ceil(total / limit)`.
- Test edge cases: `page` beyond the last page should return an empty `data` array, not an error.

**Verify manually:**
```bash
# Seed a few users first, then:
curl "http://localhost:3000/api/users?page=1&limit=2"
curl "http://localhost:3000/api/users?page=2&limit=2"
curl "http://localhost:3000/api/users?limit=abc"   # should return 400
```

---

## Exercise 12 — Unit Tests for the Repository and Validators

**Goal:** Write unit tests that cover the `userRepository` and the Zod validation schemas directly, without going through HTTP.

**Context:**
Exercise 8 tested the service layer in isolation. But two other pieces also have logic worth verifying on their own:

- `userRepository` — the in-memory store has real behaviour: ID generation, `findByEmail` lookups, `update` merging, `delete` returning a boolean.
- `userValidator` — Zod schemas have rules (minimum length, email format, UUID format) that should be confirmed without booting Express.

Testing these layers directly gives faster feedback and pinpoints bugs more precisely than integration tests.

**What to test in `userRepository`:**

- `create` stores the user and returns it with a valid UUID `id`, `createdAt`, and `updatedAt`
- `findAll` returns all stored users
- `findById` returns the correct user or `undefined` for an unknown id
- `findByEmail` finds a user by email or returns `undefined`
- `update` merges only the provided fields and advances `updatedAt`
- `update` returns `undefined` when the id does not exist
- `delete` returns `true` for an existing user and `false` for an unknown id
- `clear` empties the store so subsequent `findAll` returns an empty array

**What to test in `userValidator`:**

- `createUserSchema` accepts a valid `{ name, email }` payload
- `createUserSchema` rejects a name shorter than 2 characters
- `createUserSchema` rejects an invalid email
- `createUserSchema` rejects a missing `name` field
- `updateUserSchema` accepts partial updates (`name` only, `email` only)
- `updateUserSchema` rejects a payload where both fields are absent
- `userIdSchema` accepts a valid UUID
- `userIdSchema` rejects a non-UUID string

**Tasks:**

1. Create `tests/unit/userRepository.test.ts` and write the repository tests listed above. Call `userRepository.clear()` in `beforeEach`.
2. Create `tests/unit/userValidator.test.ts` and write the schema tests listed above. Use `schema.safeParse(input)` and assert on `result.success` and `result.error.errors`.
3. Run `npm run test:unit` and confirm all new tests pass alongside the existing service tests.

**Hints:**

- You do not need to import Express or start a server for any of these tests.
- For Zod tests, `result.error.errors[0].path` tells you which field failed — assert on it to confirm the right field is being rejected.
- `expect(result.success).toBe(false)` is clearer than `expect(result.success).not.toBe(true)`.

---

## Bonus — What's Next?
- Replace the in-memory store with PostgreSQL + Prisma or Drizzle
- Add JWT authentication middleware
- Containerize with Docker and `docker-compose`
- Add structured logging with `pino`
- Deploy to Railway, Render, or Fly.io
