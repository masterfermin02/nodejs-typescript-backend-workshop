# Workshop Agenda

## Node.js + TypeScript Backend Workshop (~4 hours)

---

### Module 1 — Project Setup & TypeScript Basics (30 min)
- Initializing a Node.js project with TypeScript
- `tsconfig.json` options that matter in production
- `ts-node-dev` for fast development loops
- Environment variable management with `dotenv` + type safety

### Module 2 — Express Fundamentals (30 min)
- Creating an Express app
- Routing and HTTP verbs
- Request / response typing with generics
- Health check endpoint

### Module 3 — Layered Architecture (45 min)
- Why layers matter: Controller → Service → Repository
- Defining domain models with TypeScript interfaces
- In-memory repository pattern
- Business logic isolation in the service layer

### Module 4 — Input Validation with Zod (30 min)
- Schema-first validation
- Reusable `validate` middleware
- Returning structured error responses
- Deriving TypeScript types from Zod schemas

### Module 5 — Error Handling (20 min)
- Custom error classes (`NotFoundError`, `ConflictError`)
- Central error-handler middleware
- Consistent JSON error envelope

### Module 6 — Testing (45 min)
- Unit tests with Jest: testing the service layer in isolation
- Integration tests with Supertest: testing HTTP endpoints end-to-end
- `beforeEach` cleanup strategies for in-memory stores
- Coverage reports

### Module 7 — CI/CD with GitHub Actions (20 min)
- Anatomy of a CI workflow file
- Matrix builds across Node.js versions
- Running typecheck, tests, and build in sequence

### Module 8 — Production Considerations (20 min)
- Graceful shutdown (`SIGTERM` / `SIGINT`)
- Structured logging (intro to `pino`)
- What comes next: real databases, auth, Docker

---

Total: ~4 hours with breaks
