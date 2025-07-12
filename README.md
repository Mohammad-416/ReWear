# ReWear – Team Bit Lords

## Tech Stack
- React + Vite (Frontend)
- Django Python (Backend)
- PostgreSQL (Database)
- Docker Compose for cross-platform compatibility
---

## 📦 Prerequisites

Make sure the following tools are installed:

### Linux (Ubuntu)
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Bash shell (already available)

### Windows (WSL Required)
- [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  - Enable WSL Integration in Docker Desktop Settings

> **WSL is required on Windows** for Docker to run Linux containers smoothly.

---

## Set Up

### 1. Clone the Repository

```bash
git clone https://github.com/Mohammad-416/ReWear.git
cd ReWear
```

### 2. Create .env File for Backend

You must create a .env file inside the /backend folder before running the project.

```env
# Backend secret for superuser API
SUPERUSER_SECRET_KEY=<SECRET_KEY> #This is required when creating superusers to visit django admin panel

# PostgreSQL connection
POSTGRES_DB=<DB_NAME>
POSTGRES_USER=<USER_NAME>
POSTGRES_PASSWORD=<PASSWORD>
DB_HOST=db

# Django settings
SECRET_KEY=django-insecure-<REPLACE_THIS_WITH_A_RANDOM_STRING>
DEBUG=True
ALLOWED_HOSTS=*

```

### 3. Make the start script executable
```bash
chmod +x start.sh
```

### 4. Run the project
```bash
./start.sh
```

🐳 This script will:

    Build Docker containers

    Start Postgres DB

    Run Django migrations

    Start Django and Vite development servers

## Create Django Superuser via API (Secure Endpoint)

This project provides an API route to create a Django superuser (admin account) via a `POST` request. It is protected with a secret key defined in the `.env` file.

---

### Endpoint
POST /api/accounts/create-superuser/
```bash

---

## Request Body (JSON)

{
  "username": "adminuser",
  "email": "admin@example.com",
  "password": "adminpassword123",
  "secret_key": <SUPERUSER_SECRET_KEY_FROM_ENV>
}

```

### Login on Django Admin Panel

Once the superuser is created, visit:

http://localhost:8000/admin/

Use the created credentials to log in.


## Project Structure
```bash
.
├── backend/           # Django backend
│   ├── manage.py
│   ├── init_backend.py
│   ├── venv
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .env               # Environment variables
│   ├── core/
│   └── ...
├── frontend/          # React + Vite frontend
│   └── ...
├── start.sh           # One-command startup script
├── docker-compose.yml
├── .gitignore
└── README.md
```


