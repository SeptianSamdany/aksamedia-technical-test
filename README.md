# 💻 Aksamedia Technical Test

This project is a fullstack web application built as part of the Aksamedia technical test.  
It consists of:

- 🔧 **Backend**: Laravel (RESTful API using Sanctum for authentication)  
- 🌐 **Frontend**: Vue 3 (Composition API) with Tailwind CSS for styling  

---

## 🚀 Project Setup

### 🔧 Frontend (Vue 3)

```bash
npm install
npm run dev
```

### 🛠 Backend (Laravel API)

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

# ⚙️ Features

- ✅ Vue 3 Composition API

- 🎨 Tailwind CSS for modern UI

- 🔐 Laravel Sanctum Authentication

- 👥 CRUD for Employees

- 🏢 Division listing

---

## 🔐 Test Login Credentials

Use the following credentials to log in:

- **Username:** `admin`  
- **Password:** `pastibisa`

---

## 📡 Simple API Documentation

This frontend connects to a basic authentication API.

### 🟢 POST `/api/login`

Authenticate user and receive a token.

**Request:**

```json
{
  "username": "admin",
  "password": "pastibisa"
}
```

**Response**:

```json
{
  "token": "BearerTokenHere",
  "user": {
    "id": 1,
    "name": "Admin"
  }
}

```
**Error Response**:

```json

{
  "message": "Invalid credentials"
}
```

### 🔴 POST /api/logout
Logs the user out and invalidates the token.

**Headers**:
```bash
Authorization: Bearer {token}
```
**Response**:

```json
{
  "message": "Logged out successfully."
}
```

### 🏢 Divisions
GET /api/divisions
Retrieve a list of all divisions.

**Headers**:
```bash
Authorization: Bearer {token}

```
**Response**:
```json
[
  {
    "id": 1,
    "name": "Human Resources"
  },
  {
    "id": 2,
    "name": "Engineering"
  }
]
```
### 👨‍💼 Employees
GET /api/employees
Retrieve all employee records.

**Headers**:
```bash
Authorization: Bearer {token}
```

**Response**:
```json
[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "division_id": 2
  }
]
```

### POST /api/employees
Create a new employee.

**Headers**:
```bash
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "Bob",
  "email": "bob@example.com",
  "division_id": 1
}
```

**Response**:

```json
{
  "message": "Employee created successfully.",
  "employee": {
    "id": 2,
    "name": "Bob",
    "email": "bob@example.com",
    "division_id": 1
  }
}
```

### PUT /api/employees/{employee}
Update an existing employee by ID.

**Headers**:
```bash
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body**:

```json
{
  "name": "Robert",
  "email": "robert@example.com",
  "division_id": 2
}
```

**Response**:
```json
{
  "message": "Employee updated successfully.",
  "employee": {
    "id": 2,
    "name": "Robert",
    "email": "robert@example.com",
    "division_id": 2
  }
}
```

### DELETE /api/employees/{employee}
Delete an employee by ID.

**Headers**:
```bash
Authorization: Bearer {token}
```

**Response**:

```json
{
  "message": "Employee deleted successfully."
}
```
