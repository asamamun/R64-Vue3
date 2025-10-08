# How Express.js Works in server.js

This document explains the implementation of the Express.js server in the [server.js](file:///d:/xampp8240/htdocs/ROUND64/VUE3/R64-Vue3/class07/server.js) file, detailing how the framework is used to create a RESTful API for product and cart management.

## Running the Server

1. Navigate to the class07 directory:
   ```
   cd class07
   ```

2. Install dependencies (if not already done):
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   or
   ```
   node server.js
   ```

4. Access the test interface at http://localhost:3000

## Testing the API

You can test the API using the built-in frontend interface or tools like curl or Postman. The API endpoints are fully RESTful and follow standard conventions for HTTP methods and status codes.

## Table of Contents
1. [Express.js Overview](#expressjs-overview)
2. [Server Setup](#server-setup)
3. [Middleware Configuration](#middleware-configuration)
4. [Data Storage](#data-storage)
5. [API Routes](#api-routes)
6. [File Operations](#file-operations)
7. [Server Initialization](#server-initialization)

## Express.js Overview

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It facilitates the rapid development of Node based Web applications.

In our implementation, Express.js is used to:
- Create API endpoints for products and cart management
- Handle HTTP requests and responses
- Process JSON data
- Serve static files

## Server Setup

The server is initialized with these key components:

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
```

1. **Import Express**: The express module is imported and an instance is created
2. **Port Configuration**: The server listens on the environment port or defaults to 3000

## Middleware Configuration

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.

```javascript
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
```

1. **CORS**: Enables Cross-Origin Resource Sharing for API access from different domains
2. **Body Parser**: Parses incoming request bodies in JSON format
3. **Static Files**: Serves static files from the 'public' directory

## Data Storage

The server uses in-memory storage for demonstration purposes:

```javascript
let products = [/* 20 sample products */];
let carts = {};
```

1. **Products**: An array of 20 sample products with id, name, price, description, and category
2. **Carts**: An object that stores user carts using userId as keys

For production applications, this would be replaced with a database.

## API Routes

### Product Routes

1. **GET /api/products**: Returns all products
   ```javascript
   app.get('/api/products', (req, res) => {
     res.json(products);
   });
   ```

2. **GET /api/products/:id**: Returns a specific product by ID
   ```javascript
   app.get('/api/products/:id', (req, res) => {
     const productId = parseInt(req.params.id);
     const product = products.find(p => p.id === productId);
     // ... error handling and response
   });
   ```

### Cart Routes

1. **GET /api/cart/:userId**: Retrieves a user's cart
   ```javascript
   app.get('/api/cart/:userId', (req, res) => {
     const userId = req.params.userId;
     // ... initialize cart if needed
     res.json(carts[userId]);
   });
   ```

2. **POST /api/cart/:userId**: Adds an item to the cart
   ```javascript
   app.post('/api/cart/:userId', (req, res) => {
     const userId = req.params.userId;
     const { productId, quantity } = req.body;
     // ... validation and cart update logic
   });
   ```

3. **PUT /api/cart/:userId/:productId**: Updates item quantity in cart
   ```javascript
   app.put('/api/cart/:userId/:productId', (req, res) => {
     const userId = req.params.userId;
     const productId = parseInt(req.params.productId);
     const { quantity } = req.body;
     // ... update or remove item logic
   });
   ```

4. **DELETE /api/cart/:userId/:productId**: Removes an item from cart
   ```javascript
   app.delete('/api/cart/:userId/:productId', (req, res) => {
     const userId = req.params.userId;
     const productId = parseInt(req.params.productId);
     // ... remove item logic
   });
   ```

### Order Routes

1. **POST /api/orders/:userId**: Places an order and saves it to a file
   ```javascript
   app.post('/api/orders/:userId', (req, res) => {
     const userId = req.params.userId;
     // ... order creation and file saving logic
   });
   ```

2. **GET /api/orders/:userId**: Retrieves order history for a user
   ```javascript
   app.get('/api/orders/:userId', (req, res) => {
     const userId = req.params.userId;
     // ... file reading and filtering logic
   });
   ```

## File Operations

Orders are persisted to the file system:

```javascript
const ordersDir = path.join(__dirname, 'orders');
if (!fs.existsSync(ordersDir)) {
  fs.mkdirSync(ordersDir);
}
```

1. **Directory Creation**: Ensures the orders directory exists
2. **Order Saving**: Each order is saved as a JSON file
3. **Order Retrieval**: Reads and filters order files by userId

## Server Initialization

The server is started with:

```javascript
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

This binds the server to the specified port and logs a startup message.

## Error Handling

The implementation includes basic error handling:
- 404 responses for not found resources
- 400 responses for bad requests (e.g., empty cart)
- 500 responses for server errors with logging

## Key Express.js Concepts Demonstrated

1. **Routing**: Using app.get(), app.post(), app.put(), and app.delete() to define routes
2. **Request Parameters**: Accessing URL parameters with req.params
3. **Request Body**: Processing JSON data with req.body
4. **Response Methods**: Using res.json() for JSON responses and res.status() for HTTP status codes
5. **Middleware**: Using third-party middleware (cors, body-parser) and built-in middleware (express.static)

This implementation provides a complete RESTful API for product and cart management with file-based order persistence, demonstrating core Express.js concepts and patterns.