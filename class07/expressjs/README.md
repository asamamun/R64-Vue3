# Express.js Product & Cart API Server

This is a simple Express.js server that provides a RESTful API for managing products and a shopping cart. Orders are saved to text files in the `orders` directory.

For a detailed explanation of how Express.js works in this implementation, see [express.md](express.md).

## Features

- 20 sample products
- Add, update, and remove items from cart
- Place orders that are saved to text files
- View order history

## Installation

1. Navigate to the class07 directory:
   ```
   cd class07
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Server

To start the server:
```
npm start
```

The server will start on port 3000 by default. You can access it at http://localhost:3000

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product by ID

### Cart

- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/:userId` - Add item to cart
- `PUT /api/cart/:userId/:productId` - Update item quantity in cart
- `DELETE /api/cart/:userId/:productId` - Remove item from cart

### Orders

- `POST /api/orders/:userId` - Place an order
- `GET /api/orders/:userId` - Get user's order history

## Testing

Open your browser and go to http://localhost:3000 to test the API with the built-in frontend interface.

## Sample Data

The server comes with 20 sample products across various categories:
- Electronics
- Furniture
- Appliances
- Sports
- Accessories
- Home
- Stationery
- Office

## File Storage

Orders are saved as JSON files in the `orders` directory, with filenames in the format `order_{orderId}.json`.

## Dependencies

- express: Web framework
- cors: Cross-origin resource sharing middleware
- body-parser: Request body parsing middleware