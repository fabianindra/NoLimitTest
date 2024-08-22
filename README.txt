markdown
Copy code
# NestJS Blog API with JWT Authentication

This project is a simple REST API built with [NestJS](https://nestjs.com/), [Sequelize](https://sequelize.org/), and [MySQL](https://www.mysql.com/). The API manages blog posts and users, featuring JWT-based authentication.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login with JWT authentication.
- Create, update, delete, and fetch blog posts.
- Secure endpoints with JWT authentication.
- Sequelize ORM for database management.
- Unit tests for critical parts of the application.

## Technologies

- [NestJS](https://nestjs.com/)
- [Node.js](https://nodejs.org/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)
- [Passport](http://www.passportjs.org/)
- [JWT](https://jwt.io/)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) (or compatible SQL database)
- [Git](https://git-scm.com/)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/nestjs-blog-api.git
   cd nestjs-blog-api
Navigate to backend-test1 and install dependencies:

bash
Copy code
npm install
Database Setup
Create a MySQL database:

bash
Copy code
CREATE DATABASE blog;
Run migrations:

(If you have migrations set up, otherwise, Sequelize should sync the models automatically)

bash
Copy code
npm run migration:run
Running the Application
Start the application:

bash
Copy code
npm run start
The API will be running at http://localhost:3000.

API Endpoints
Authentication
Register User
POST /auth/register

Request Body:

json
Copy code
{
  "name": "NoLimit",
  "email": "nolimit@mail.com",
  "password": "yourpassword"
}
Login User
POST /auth/login

Request Body:

json
Copy code
{
  "email": "nolimit@mail.com",
  "password": "yourpassword"
}
Response:

json
Copy code
{
  "access_token": "YOUR_JWT_TOKEN"
}
Posts
Get All Posts
GET /posts

Get Post by ID
GET /posts/:id

Create Post (Requires Authentication)
POST /posts

Headers:

bash
Copy code
Authorization: Bearer YOUR_JWT_TOKEN
Request Body:

json
Copy code
{
  "content": "Your blog post content"
}
Update Post (Requires Authentication)
PUT /posts/:id

Headers:

bash
Copy code
Authorization: Bearer YOUR_JWT_TOKEN
Request Body:

json
Copy code
{
  "content": "Updated blog post content"
}
Delete Post (Requires Authentication)
DELETE /posts/:id

Headers:

bash
Copy code
Authorization: Bearer YOUR_JWT_TOKEN
Testing
Run Unit Tests:
bash
Copy code
npm run test
Run End-to-End Tests:
bash
Copy code
npm run test:e2e
Error Handling
All errors return a JSON response with message, error, and statusCode fields.

Example:

json
Copy code
{
  "message": "User not found",
  "error": "Not Found",
  "statusCode": 404
}
