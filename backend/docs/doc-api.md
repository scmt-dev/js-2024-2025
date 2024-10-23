Here’s a simple API documentation for your `signup` and `signin` routes. This documentation will help developers understand how to interact with your API, including the endpoints, request formats, and response formats.

---

# Auth API Documentation

## Base URL:
```
http://localhost:4000
```

---

## 1. **Signup a New User**

### Endpoint:
```
POST /signup
```

### Description:
Registers a new user in the system. The user must provide a name, email, and password. If the user with the same email already exists, the API will return an error.

### Request Headers:
- `Content-Type: application/json`

### Request Body:
```json
{
  "name": "string",         // Required: Full name of the user
  "email": "string",        // Required: Valid email address
  "password": "string",     // Required: Password for the user account
  "role": "string"          // Optional: Role of the user (default is 'user')
}
```

### Example Request Body:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "user"
}
```

### Responses:

#### Success (User created):
- **Status**: `201 Created`
- **Response Body**:
```json
{
  "message": "User created successfully"
}
```

#### Failure (User already exists):
- **Status**: `400 Bad Request`
- **Response Body**:
```json
{
  "error": "User already exists"
}
```

#### Failure (Missing required fields):
- **Status**: `400 Bad Request`
- **Response Body**:
```json
{
  "error": "All fields are required"
}
```

---

## 2. **Signin an Existing User**

### Endpoint:
```
POST /signin
```

### Description:
Logs in an existing user by verifying the email and password. If the credentials are correct, the API returns a JSON Web Token (JWT) for future authenticated requests.

### Request Headers:
- `Content-Type: application/json`

### Request Body:
```json
{
  "email": "string",        // Required: Email address of the user
  "password": "string"      // Required: Password of the user
}
```

### Example Request Body:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success (User authenticated):
- **Status**: `200 OK`
- **Response Body**:
```json
{
  "message": "Signin successful",
  "token": "JWT_TOKEN"   // JWT token to use for authenticated routes
}
```

#### Failure (Invalid password):
- **Status**: `400 Bad Request`
- **Response Body**:
```json
{
  "error": "Invalid password"
}
```

#### Failure (User not found):
- **Status**: `400 Bad Request`
- **Response Body**:
```json
{
  "error": "User not found"
}
```

---

## 3. **Accessing Protected Routes**

### Example Protected Route:

Once the user has successfully signed in and obtained a JWT token, they can use this token to access protected routes. An example of a protected route:

### Endpoint:
```
GET /protected
```

### Description:
Returns information to the authenticated user.

### Request Headers:
- `Authorization: Bearer JWT_TOKEN`  (Replace `JWT_TOKEN` with the token received during signin)

### Responses:

#### Success:
- **Status**: `200 OK`
- **Response Body**:
```json
{
  "message": "You are authorized",
  "user": {
    "id": "USER_ID",
    "email": "USER_EMAIL",
    "role": "USER_ROLE"
  }
}
```

#### Failure (Missing or invalid token):
- **Status**: `401 Unauthorized`
- **Response Body**:
```json
{
  "error": "Token not provided" or "Invalid token"
}
```

---

## Notes:
- Make sure to include the JWT token in the `Authorization` header when accessing protected routes.
- The token has an expiration (typically 1 hour), after which the user will need to re-authenticate.
- All request bodies must be in JSON format, and the `Content-Type: application/json` header must be included.

---

This documentation covers the essential functionality of the `signup` and `signin` APIs, along with an example of a protected route. Let me know if you need further customizations!