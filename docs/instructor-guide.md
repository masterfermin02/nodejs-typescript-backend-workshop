# Instructor Guide

## Before the Workshop

### Prerequisites for Attendees
- Node.js 18+ installed (`node -v`)
- npm 9+ installed (`npm -v`)
- Git installed
- A code editor (VS Code recommended)
- Basic JavaScript/TypeScript knowledge

### Your Setup Checklist
- [ ] Clone the repo and run `npm install` on both `starter` and `final` branches
- [ ] Run `npm test` on `final` — all tests should pass
- [ ] Run `npm run dev` on `starter` — server should start on port 3000
- [ ] Share the repo URL and ask attendees to clone before the session

---

## Teaching Flow

### Starting Point (starter branch)
The `starter` branch contains:
- `package.json` with all dependencies
- `tsconfig.json` and `jest.config.ts`
- Empty/stubbed source files with TODO comments
- Working test files (they will fail until exercises are complete)

### Reference (final branch)
The `final` branch is the completed solution. Use it to:
- Demo the running application before exercises
- Help attendees who fall behind
- Show the finished test output

---

## Common Stumbling Points

### TypeScript strict mode
Attendees may struggle with `noImplicitReturns` and `noUnusedLocals`. Remind them these errors are intentional — strict mode catches bugs early.

### Express + TypeScript generics
`Request<Params, ResBody, ReqBody, Query>` confuses many attendees. Walk through one example on the `userController` slowly.

### Zod `safeParse` vs `parse`
`parse` throws; `safeParse` returns a result object. The middleware uses `safeParse` so it can control the response.

### Middleware order in Express
Error-handler middleware must be registered **last** and must have exactly **four parameters** `(err, req, res, next)` or Express won't treat it as an error handler.

### `supertest` and open handles
Jest may warn about open handles after integration tests. This is expected when the test file imports `app` directly. Adding `--forceExit` to the jest command resolves it if needed.

---

## Timing Tips

- Modules 1–2: Go fast, most attendees have seen Express before.
- Module 3 (Layered Architecture): Spend extra time here — this is the core concept.
- Module 6 (Controller & Routes): Live-code this one; it ties everything together.
- Module 8 (Testing): Pair attendees for this exercise — it goes faster with two people.

---

## Q&A Topics to Prepare

- "Why not use `any` for the request body?" — Type safety catches mismatches at compile time.
- "Why an in-memory store instead of a real DB?" — Keeps the setup friction low; the pattern is identical with Prisma/Drizzle.
- "Can we use `class` instead of plain objects for the service?" — Yes, both work. Plain objects keep things simple for a workshop.
