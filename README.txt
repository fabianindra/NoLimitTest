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

navigate to backend-test1

Install dependencies:
```bash
npm install

Database Setup
Create a MySQL database:

sql
```bash
CREATE DATABASE blog;

Run migrations:

(If you have migrations set up, otherwise, Sequelize should sync the models automatically)

```bash
npm run migration:run


Running the Application
Start the application:
```bash
npm run start


The API will be running at http://localhost:3000.


API Endpoints
Authentication
Register User
```bash
POST /auth/register

Request Body:
```bash
{
  "name": "NoLimit",
  "email": "nolimit@mail.com",
  "password": "yourpassword"
}

Login User
```bash
POST /auth/login

Request Body:
```bash
{
  "email": "nolimit@mail.com",
  "password": "yourpassword"
}

Response:
```bash
{
  "access_token": "YOUR_JWT_TOKEN"
}

Posts
Get All Posts
```bash
GET /posts

Get Post by ID
```bash
GET /posts/:id

Create Post (Requires Authentication)
```bash
POST /posts

Headers:
```bash
Authorization: Bearer YOUR_JWT_TOKEN

Request Body:
```bash
{
  "content": "Your blog post content"
}

Update Post (Requires Authentication)
```bash
PUT /posts/:id

Headers:
```bash
Authorization: Bearer YOUR_JWT_TOKEN

Request Body:
```bash
{
  "content": "Updated blog post content"
}

Delete Post (Requires Authentication)
```bash
DELETE /posts/:id

Headers:
```bash
Authorization: Bearer YOUR_JWT_TOKEN

Testing
Run Unit Tests:
```bash
npm run test

Run End-to-End Tests:
```bash
npm run test:e2e

Error Handling
All errors return a JSON response with message, error, and statusCode fields.

Example:
```bash
{
  "message": "User not found",
  "error": "Not Found",
  "statusCode": 404
}


# 2. NestJS Elasticsearch Backend

## Overview
This project is a NestJS-based backend application that integrates with Elasticsearch to provide various employee metrics. It includes endpoints for retrieving employee counts, salary statistics, age distribution, and more.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing Endpoints](#testing-endpoints)
- [Reindexing Data](#reindexing-data)
- [Notes](#notes)
- [License](#license)

## Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- NestJS CLI: Install globally using `npm install -g @nestjs/cli`
- Elasticsearch (v8.x or later)
- cURL (for terminal commands)

## Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository

navigate to /backend-test2

install dependencies:
npm install

Configuration
Configure Elasticsearch
Make sure Elasticsearch is running. You can start Elasticsearch with Docker or from the official distribution.

```bash
docker run -d --name elasticsearch -p 9200:9200 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:8.1.0

Update Environment Variables
Configure the ElasticsearchModule in src/employee/employee.module.ts to match your Elasticsearch server configuration.

```bash
ElasticsearchModule.register({
  node: 'http://localhost:9200',
}),

Running the Application

Run the Application
Start the NestJS application:
```bash
npm run start

Verify the Application
Open your browser or Postman and go to http://localhost:3000/employee-metrics/count to see if it returns the employee count.

Testing Endpoints
Use Postman or cURL to test the various endpoints:

Count of Employees
```bash
curl -X GET "http://localhost:3000/employee-metrics/count"
curl -X GET "http://localhost:3000/employee-metrics/average-salary"
curl -X GET "http://localhost:3000/employee-metrics/age-distribution"
curl -X GET "http://localhost:3000/employee-metrics/gender-distribution"
curl -X GET "http://localhost:3000/employee-metrics/marital-status-distribution"
curl -X GET "http://localhost:3000/employee-metrics/date-of-joining-histogram"
curl -X GET "http://localhost:3000/employee-metrics/top-interests"
curl -X GET "http://localhost:3000/employee-metrics/designation-distribution"

Reindexing Data
To reindex data from an old index to a new index with correct mappings:
(I am using elasticsearch 8.15 where "type: employee" is not supported so i deleted the type for bulk processing,
and "string" data type for index is now "text" or "keyword", so i used "keyword" for querying)

```bash
curl -X PUT "localhost:9200/companydatabase" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "FirstName": { "type": "keyword" },
      "LastName": { "type": "keyword" },
      "Designation": { "type": "keyword" },
      "Salary": { "type": "integer" },
      "DateOfJoining": { "type": "date", "format": "yyyy-MM-dd" },
      "Address": { "type": "text" },
      "Gender": { "type": "keyword" },
      "Age": { "type": "integer" },
      "MaritalStatus": { "type": "keyword" },
      "Interests": { "type": "keyword" }
    }
  }
}
'

Reindex Data
```bash
curl -X POST "localhost:9200/_reindex" -H 'Content-Type: application/json' -d'
{
  "source": {
    "index": "companydatabase_v2"
  },
  "dest": {
    "index": "companydatabase"
  }
}
'

Verify Data
```bash
curl -X GET "localhost:9200/companydatabase/_search?size=10&pretty"


Notes
Ensure Elasticsearch is running and accessible.
Update the application configuration if you use a different Elasticsearch node or port.
Adjust mappings based on the actual structure of your data.


