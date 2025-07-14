  # 💻 Aksamedia Technical Test

This is a frontend project built using **Vue 3 (Composition API)** and **Tailwind CSS** as part of the Aksamedia technical test.

---

## 🚀 Project Setup

```bash
npm install
npm run dev
```

# ⚙️ Features

- ✅ Vue 3 Composition API  
- 🎨 Tailwind CSS for styling  
- 🔐 Simple login with authentication  

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

🔴 POST /api/logout
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
