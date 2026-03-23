# 💻 Laptop Store API — RESTful API for Laptop Product Management

![CI - Unit Test](https://github.com/Kurtz17/laptop-store-api/actions/workflows/ci.yml/badge.svg)
![CS - Security Scan](https://github.com/Kurtz17/laptop-store-api/actions/workflows/cs.yml/badge.svg)
![CD - Docker Build](https://github.com/Kurtz17/laptop-store-api/actions/workflows/cd.yml/badge.svg)

A simple RESTful API built with **Node.js + Express** for managing laptop store products. Supports full CRUD operations with standard JSON response format, containerized with Docker, and equipped with a CI/CD pipeline using GitHub Actions.

---

## 1. 📋 Project Description

**Laptop Store API** is a RESTful API for managing laptop store products that allows users to:
- View a list of laptops (with category filter: Student, Gaming, Business, Premium)
- View details of a single laptop
- Add a new laptop product
- Update laptop product data
- Delete a laptop product

---

## 2. 📡 API Documentation

**Base URL:** `http://localhost:5000`

**API Endpoints:** `http://localhost:5000/api/v1/products`

**API Health:** `http://localhost:5000/health`

### Endpoint List

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |
| GET | `/api/v1/products` | Get all products |
| GET | `/api/v1/products?category=Student` | Filter products by category |
| GET | `/api/v1/products?search=asus` | Search products by name |
| GET | `/api/v1/products/:id` | Get a single product by ID |
| POST | `/api/v1/products` | Create a new product |
| PUT | `/api/v1/products/:id` | Update a product |
| DELETE | `/api/v1/products/:id` | Delete a product |

---

### Response Format

All responses use the following standard JSON structure:

#### ✅ Success Responses

**GET `/api/v1/products`**
```json
{
  "success": true,
  "message": "Successfully retrieved all products",
  "count": 5,
  "data": [
    {
      "id": 1,
      "name": "Laptop Asus VivoBook 15",
      "category": "Student",
      "price": 7500000,
      "stock": 15,
      "description": "Lightweight laptop for students and professionals, 15.6-inch FHD display",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

**GET `/api/v1/products/:id`**
```json
{
  "success": true,
  "message": "Successfully retrieved product",
  "data": {
    "id": 2,
    "name": "Laptop Dell XPS 13",
    "category": "Premium",
    "price": 18500000,
    "stock": 8,
    "description": "Slim premium laptop with 13.4-inch InfinityEdge display",
    "createdAt": "2025-01-02T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
}
```

**POST `/api/v1/products`** — Request Body:
```json
{
  "name": "Laptop HP Pavilion 14",
  "category": "Student",
  "price": 8500000,
  "stock": 25,
  "description": "Student laptop with 14-inch display, lightweight and durable"
}
```

Response:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 6,
    "name": "Laptop HP Pavilion 14",
    "category": "Student",
    "price": 8500000,
    "stock": 25,
    "description": "Student laptop with 14-inch display, lightweight and durable",
    "createdAt": "2025-03-23T10:00:00.000Z",
    "updatedAt": "2025-03-23T10:00:00.000Z"
  }
}
```

**DELETE `/api/v1/products/:id`**
```json
{
  "success": true,
  "message": "Product with id 4 deleted successfully",
  "data": null
}
```

#### ❌ Error Responses

**404 Not Found:**
```json
{
  "success": false,
  "message": "Product with id 9999 not found",
  "data": null
}
```

**400 Bad Request (Validation Failed):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "price is required",
    "stock is required"
  ]
}
```

---

## 3. 🐳 Installation Guide (Docker)

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

### Steps to Run the Application

**1. Clone the repository**
```bash
git clone https://github.com/Kurtz17/laptop-store-api.git
cd laptop-store-api
```

**2. Run with Docker Compose**
```bash
docker-compose up --build
```

**3. Access the API**
```
Base URL  : http://localhost:5000
Health    : http://localhost:5000/health
Endpoints : http://localhost:5000/api/v1/products
```

**4. Stop the container**
```bash
docker-compose down
```

### Port Information

| Description | Port |
|-------------|------|
| Host Port | `5000` |
| Container Port | `5000` |

> Mapping: `localhost:5000` → `container:5000`

---

## 4. 🌿 Git Workflow

### Branches Used

```
main        → Production branch (stable, protected)
develop     → Feature integration branch
feature/*   → Branch for specific feature development
```

### Workflow (Feature Branch Flow)

```
1. Create a branch from develop:
   git checkout develop
   git checkout -b feature/add-product-search

2. Work on the feature, then commit:
   git add .
   git commit -m "feat: add product search by name endpoint"

3. Push to remote:
   git push origin feature/add-product-search

4. Create Pull Request: feature/* → develop

5. After review & approval, merge into develop

6. Release: develop → main (via PR)
```

### Conventional Commits

Format: `<type>: <short description>`

| Type | Used for |
|------|----------|
| `feat:` | Adding a new feature |
| `fix:` | Fixing a bug |
| `docs:` | Documentation changes |
| `test:` | Adding or updating tests |
| `refactor:` | Code refactor without changing functionality |
| `chore:` | Build or config changes |

**Commit examples:**
```bash
git commit -m "feat: add CRUD endpoints for product management"
git commit -m "fix: handle 404 when product id not found"
git commit -m "docs: update README with API documentation"
git commit -m "test: add unit tests for product controller"
git commit -m "chore: add Dockerfile and docker-compose configuration"
```

---

## 5. ⚙️ Automation Status (GitHub Actions)

### Workflow Created

File: `.github/workflows/ci-cd.yml`

Pipeline runs automatically on **Push** or **Pull Request** to `main` and `develop` branches.

#### Job 1: CI — Unit Testing
- Setup Node.js 20
- Install dependencies (`npm ci`)
- Run all unit tests (`npm test`)
- Upload coverage report as artifact

#### Job 2: CS — Security Scan
- Run `npm audit` to check dependency vulnerabilities
- Run **Trivy** to scan filesystem for CRITICAL & HIGH severity issues

#### Job 3: CD — Build Docker Image
- Only runs on push to `main`
- Build Docker image to validate the Dockerfile

### Badge Status

```markdown
![CI - Unit Testing](https://github.com/Kurtz17/laptop-store-api/actions/workflows/ci-cd.yml/badge.svg?job=unit-test)
![CS - Security Scan](https://github.com/Kurtz17/laptop-store-api/actions/workflows/ci-cd.yml/badge.svg?job=security-scan)
![CD - Docker Build](https://github.com/Kurtz17/laptop-store-api/actions/workflows/ci-cd.yml/badge.svg?job=docker-build)
```

---

## 6. 🚀 Running Without Docker (Development)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
```

---

## 📁 Project Structure

```
laptop-store-api/
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # GitHub Actions pipeline
├── src/
│   ├── app.js                     # Express app setup
│   ├── server.js                  # Entry point
│   ├── controllers/
│   │   └── productController.js   # CRUD logic
│   ├── routes/
│   │   └── products.js            # Route definitions
│   └── data/
│       └── productStore.js        # In-memory data store
├── tests/
│   └── product.test.js            # Unit tests
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```
