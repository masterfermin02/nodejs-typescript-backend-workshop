# API Testing Reference

Base URL: `http://localhost:3000`

---

## Health Check

```
GET /health
```

**Response 200**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## Users

### List all users

```
GET /api/users
```

**Response 200**
```json
{
  "status": "success",
  "data": [
    {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "name": "Alice",
      "email": "alice@example.com",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

---

### Get a user by ID

```
GET /api/users/:id
```

**Response 200**
```json
{
  "status": "success",
  "data": { "id": "...", "name": "Alice", "email": "alice@example.com", ... }
}
```

**Response 400** — invalid UUID
```json
{ "status": "error", "errors": [{ "field": "id", "message": "Invalid user ID format" }] }
```

**Response 404**
```json
{ "status": "error", "message": "User with id \"...\" not found" }
```

---

### Create a user

```
POST /api/users
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com"
}
```

**Response 201**
```json
{
  "status": "success",
  "data": { "id": "...", "name": "Alice", "email": "alice@example.com", ... }
}
```

**Response 400** — validation failure
```json
{
  "status": "error",
  "errors": [{ "field": "email", "message": "Invalid email address" }]
}
```

**Response 409** — duplicate email
```json
{ "status": "error", "message": "Email \"alice@example.com\" is already in use" }
```

---

### Update a user

```
PATCH /api/users/:id
Content-Type: application/json

{
  "name": "Alicia"
}
```

**Response 200**
```json
{
  "status": "success",
  "data": { "id": "...", "name": "Alicia", "email": "alice@example.com", ... }
}
```

---

### Delete a user

```
DELETE /api/users/:id
```

**Response 204** — no body

**Response 404**
```json
{ "status": "error", "message": "User with id \"...\" not found" }
```

---

## Quick curl Examples

```bash
# Create a user
curl -s -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}' | jq

# List users
curl -s http://localhost:3000/api/users | jq

# Get user by ID (replace UUID)
curl -s http://localhost:3000/api/users/f47ac10b-58cc-4372-a567-0e02b2c3d479 | jq

# Update user
curl -s -X PATCH http://localhost:3000/api/users/f47ac10b-58cc-4372-a567-0e02b2c3d479 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alicia"}' | jq

# Delete user
curl -s -X DELETE http://localhost:3000/api/users/f47ac10b-58cc-4372-a567-0e02b2c3d479
```
