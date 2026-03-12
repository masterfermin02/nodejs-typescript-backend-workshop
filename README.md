# Node.js + TypeScript Backend Workshop

A hands-on workshop for building production-ready REST APIs with Node.js, TypeScript, and Express.

## What You'll Build

A fully tested CRUD API for user management, following a clean layered architecture:

```
HTTP Request → Route → Middleware (validate) → Controller → Service → Repository → Response
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js 18+ | Runtime |
| TypeScript 5 | Type safety |
| Express 4 | HTTP framework |
| Zod | Request validation |
| Jest + Supertest | Testing |
| GitHub Actions | CI/CD |

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/your-org/nodejs-typescript-backend-workshop.git
cd nodejs-typescript-backend-workshop

# 2. Switch to the starter branch
git checkout starter

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env

# 5. Start the development server
npm run dev
```

The server starts at `http://localhost:3000`.

```bash
curl http://localhost:3000/health
```

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Workshop overview and links |
| `starter` | Starting point for attendees |
| `final` | Completed solution |

## Project Structure

```
src/
├── config/        # Environment configuration
├── controllers/   # HTTP request handlers
├── middleware/    # Validation and error handling
├── models/        # TypeScript interfaces / types
├── repositories/  # Data access layer
├── routes/        # Express route definitions
├── services/      # Business logic
├── validators/    # Zod schemas
├── app.ts         # Express app setup
└── server.ts      # HTTP server entry point

tests/
├── unit/          # Service layer tests
└── integration/   # HTTP endpoint tests (Supertest)
```

## Available Scripts

```bash
npm run dev        # Start with hot reload
npm run build      # Compile TypeScript → dist/
npm start          # Run compiled output
npm test           # Run all tests
npm run test:unit  # Unit tests only
npm run test:integration  # Integration tests only
npm run typecheck  # Type check without emitting
npm run lint       # Lint source files
```

## Exercises

See [docs/exercises.md](docs/exercises.md) for the full list of exercises.

## API Reference

See [docs/api-testing.md](docs/api-testing.md) for endpoint documentation and curl examples.

## Workshop Agenda

See [docs/workshop-agenda.md](docs/workshop-agenda.md) for the full ~4-hour agenda.

## License

MIT
