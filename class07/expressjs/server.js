const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Sample products data (20 products)
let products = [
  { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop', category: 'Electronics' },
  { id: 2, name: 'Smartphone', price: 699.99, description: 'Latest smartphone model', category: 'Electronics' },
  { id: 3, name: 'Headphones', price: 199.99, description: 'Noise-cancelling headphones', category: 'Electronics' },
  { id: 4, name: 'Desk Chair', price: 299.99, description: 'Ergonomic office chair', category: 'Furniture' },
  { id: 5, name: 'Coffee Maker', price: 89.99, description: 'Automatic coffee machine', category: 'Appliances' },
  { id: 6, name: 'Bookshelf', price: 149.99, description: '5-tier wooden bookshelf', category: 'Furniture' },
  { id: 7, name: 'Running Shoes', price: 129.99, description: 'Comfortable athletic shoes', category: 'Sports' },
  { id: 8, name: 'Backpack', price: 59.99, description: 'Water-resistant backpack', category: 'Accessories' },
  { id: 9, name: 'Watch', price: 199.99, description: 'Digital smartwatch', category: 'Accessories' },
  { id: 10, name: 'Table Lamp', price: 39.99, description: 'LED desk lamp', category: 'Home' },
  { id: 11, name: 'Bluetooth Speaker', price: 79.99, description: 'Portable wireless speaker', category: 'Electronics' },
  { id: 12, name: 'Yoga Mat', price: 29.99, description: 'Non-slip exercise mat', category: 'Sports' },
  { id: 13, name: 'Water Bottle', price: 24.99, description: 'Insulated stainless steel bottle', category: 'Sports' },
  { id: 14, name: 'Notebook', price: 14.99, description: 'Premium paper notebook', category: 'Stationery' },
  { id: 15, name: 'Pen Set', price: 19.99, description: 'Set of premium pens', category: 'Stationery' },
  { id: 16, name: 'Desk Organizer', price: 34.99, description: 'Multi-compartment desk organizer', category: 'Office' },
  { id: 17, name: 'Plant Pot', price: 19.99, description: 'Ceramic plant container', category: 'Home' },
  { id: 18, name: 'Picture Frame', price: 24.99, description: 'Wooden photo frame', category: 'Home' },
  { id: 19, name: 'USB Cable', price: 9.99, description: 'Fast-charging USB cable', category: 'Electronics' },
  { id: 20, name: 'Mouse Pad', price: 14.99, description: 'Large gaming mouse pad', category: 'Accessories' }
];

// In-memory cart storage (in a real app, this would be in a database)
let carts = {};

// Ensure orders directory exists
const ordersDir = path.join(__dirname, 'orders');
if (!fs.existsSync(ordersDir)) {
  fs.mkdirSync(ordersDir);
}

// Routes

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get a specific product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(product);
});

// Get user cart
app.get('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  
  if (!carts[userId]) {
    carts[userId] = [];
  }
  
  res.json(carts[userId]);
});

// Add item to cart
app.post('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity } = req.body;
  
  // Validate product exists
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  // Initialize user cart if it doesn't exist
  if (!carts[userId]) {
    carts[userId] = [];
  }
  
  // Check if product is already in cart
  const existingItemIndex = carts[userId].findIndex(item => item.productId === productId);
  
  if (existingItemIndex >= 0) {
    // Update quantity
    carts[userId][existingItemIndex].quantity += quantity || 1;
  } else {
    // Add new item
    carts[userId].push({
      productId,
      quantity: quantity || 1,
      name: product.name,
      price: product.price
    });
  }
  
  res.json(carts[userId]);
});

// Update item quantity in cart
app.put('/api/cart/:userId/:productId', (req, res) => {
  const userId = req.params.userId;
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;
  
  // Initialize user cart if it doesn't exist
  if (!carts[userId]) {
    carts[userId] = [];
  }
  
  // Find item in cart
  const itemIndex = carts[userId].findIndex(item => item.productId === productId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }
  
  // Update quantity or remove if quantity is 0
  if (quantity <= 0) {
    carts[userId].splice(itemIndex, 1);
  } else {
    carts[userId][itemIndex].quantity = quantity;
  }
  
  res.json(carts[userId]);
});

// Remove item from cart
app.delete('/api/cart/:userId/:productId', (req, res) => {
  const userId = req.params.userId;
  const productId = parseInt(req.params.productId);
  
  // Initialize user cart if it doesn't exist
  if (!carts[userId]) {
    carts[userId] = [];
  }
  
  // Find item in cart
  const itemIndex = carts[userId].findIndex(item => item.productId === productId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }
  
  // Remove item
  carts[userId].splice(itemIndex, 1);
  
  res.json(carts[userId]);
});

// Place order
app.post('/api/orders/:userId', (req, res) => {
  const userId = req.params.userId;
  
  // Check if user has items in cart
  if (!carts[userId] || carts[userId].length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }
  
  // Create order object
  const order = {
    orderId: Date.now().toString(),
    userId,
    items: [...carts[userId]],
    timestamp: new Date().toISOString(),
    total: carts[userId].reduce((sum, item) => sum + (item.price * item.quantity), 0)
  };
  
  // Save order to file
  const orderFileName = `order_${order.orderId}.json`;
  const orderFilePath = path.join(ordersDir, orderFileName);
  
  fs.writeFile(orderFilePath, JSON.stringify(order, null, 2), (err) => {
    if (err) {
      console.error('Error saving order:', err);
      return res.status(500).json({ message: 'Error saving order' });
    }
    
    // Clear user's cart
    carts[userId] = [];
    
    res.json({ 
      message: 'Order placed successfully',
      order 
    });
  });
});

// Get all orders for a user
app.get('/api/orders/:userId', (req, res) => {
  const userId = req.params.userId;
  const orders = [];
  
  // Read all order files
  fs.readdir(ordersDir, (err, files) => {
    if (err) {
      console.error('Error reading orders directory:', err);
      return res.status(500).json({ message: 'Error retrieving orders' });
    }
    
    // Filter files that belong to this user
    const userOrders = files.filter(file => {
      if (!file.startsWith('order_') || !file.endsWith('.json')) return false;
      
      try {
        const orderData = JSON.parse(fs.readFileSync(path.join(ordersDir, file)));
        return orderData.userId === userId;
      } catch (parseErr) {
        return false;
      }
    });
    
    // Read each order file
    const orderPromises = userOrders.map(file => {
      return new Promise((resolve, reject) => {
        fs.readFile(path.join(ordersDir, file), 'utf8', (err, data) => {
          if (err) {
            reject(err);
          } else {
            try {
              resolve(JSON.parse(data));
            } catch (parseErr) {
              reject(parseErr);
            }
          }
        });
      });
    });
    
    Promise.all(orderPromises)
      .then(orders => {
        res.json(orders);
      })
      .catch(err => {
        console.error('Error reading order files:', err);
        res.status(500).json({ message: 'Error retrieving orders' });
      });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});