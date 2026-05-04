# Computer House Backend API

Node.js + Express backend with MongoDB and JWT authentication.

## Features

- ✅ JWT Authentication
- ✅ MongoDB Models
- ✅ MVC Architecture
- ✅ RESTful APIs
- ✅ Error Handling
- ✅ Input Validation

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register (for initial setup)
- `GET /api/auth/me` - Get current user (Protected)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Repair Requests
- `POST /api/repairs` - Create repair request (Public)
- `GET /api/repairs` - Get all repairs (Admin)
- `GET /api/repairs/:id` - Get single repair (Admin)
- `PUT /api/repairs/:id` - Update repair (Admin)
- `PATCH /api/repairs/:id/status` - Update repair status (Admin)
- `DELETE /api/repairs/:id` - Delete repair (Admin)

### Contact Form
- `POST /api/contacts` - Submit contact form (Public)
- `GET /api/contacts` - Get all contacts (Admin)
- `GET /api/contacts/:id` - Get single contact (Admin)
- `PUT /api/contacts/:id` - Update contact (Admin)
- `PATCH /api/contacts/:id/read` - Mark as read/unread (Admin)
- `DELETE /api/contacts/:id` - Delete contact (Admin)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string and JWT secret.

4. Start the server:
```bash
npm run dev
```

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <your-token>
```

## MongoDB Models

- **User** - Admin authentication
- **Service** - Services offered
- **Product** - Products catalog
- **RepairRequest** - Repair requests
- **Contact** - Contact form submissions




