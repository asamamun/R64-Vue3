# Vue 3 E-commerce App with Pinia

This is a Vue 3 e-commerce application that uses Pinia for state management.

## Features

- Product listing from DummyJSON API
- Shopping cart functionality
- Add/remove products from cart
- Update product quantities
- Place orders with customer information
- View order history with details
- Cart persistence using localStorage
- Responsive design with Bootstrap

## Migration from Vuex to Pinia

This application was originally using Vuex for state management and has been successfully migrated to use Pinia.

### Benefits of Migration:

- Simpler store structure with Pinia's Composition API
- Better TypeScript support
- More intuitive API
- Reduced boilerplate code
- Improved developer experience

## Project Structure

```
src/
├── components/          # Reusable Vue components
├── stores/              # Pinia stores
│   ├── productStore.js  # Main store for products and cart
│   └── README.md        # Documentation for stores
├── views/               # Page components
│   ├── Cart.vue         # Shopping cart page
│   ├── Orders.vue       # Order history page
│   └── ProductList.vue  # Product listing page
├── App.vue              # Main application component
├── config.js            # API configuration
├── main.js              # Application entry point
├── router.js            # Vue Router configuration
├── style.css            # Global styles
└── sweetalert2.js       # SweetAlert2 integration
```

## How the App Works

### State Management with Pinia

The application uses a single Pinia store ([productStore.js](file:///d:/xampp8240/htdocs/ROUND64/VUE3/R64-Vue3/class06/ecommerce-app/src/stores/productStore.js)) to manage all state:

1. **Products Management**
   - Fetches products from the DummyJSON API
   - Stores the product list in the `products` state

2. **Cart Management**
   - Manages the shopping cart items in the `cart` state
   - Provides actions to add, remove, and update cart items
   - Calculates the total cart value with the `cartTotal` getter
   - Persists cart data to localStorage

3. **Order Management**
   - Fetches and stores order history in the `orders` state
   - Provides actions to place new orders and fetch existing orders

### Components

1. **ProductList.vue**
   - Displays products fetched from the API
   - Allows adding products to the cart
   - Shows success notifications using SweetAlert2

2. **Cart.vue**
   - Displays items in the shopping cart
   - Allows updating item quantities
   - Allows removing items from the cart
   - Collects customer information for orders
   - Handles order placement

3. **Orders.vue**
   - Displays a list of all previous orders
   - Shows order summary information (customer, date, total items, total price)
   - Provides a "View Details" button for each order
   - Shows detailed order information in a modal dialog including:
     - Customer information
     - Order date
     - Itemized list of products with images, prices, and quantities
     - Total order value

4. **App.vue**
   - Main application layout
   - Navigation bar with cart item count and orders link
   - Router view for displaying pages

### Data Flow

1. On application startup:
   - Cart data is loaded from localStorage
   - Products are fetched from the DummyJSON API

2. User interactions:
   - Adding products to cart updates the Pinia store
   - Cart changes are automatically saved to localStorage
   - Cart updates are reflected in real-time in the UI

3. Order placement:
   - Customer information is collected in the cart view
   - Order data is sent to the backend API
   - Cart is cleared after successful order placement
   - Order history is automatically refreshed

4. Order viewing:
   - Orders are fetched from the backend API when the Orders page is accessed
   - Order details are displayed in a modal when the "View Details" button is clicked

## Project Setup

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm run prod
```

## API Endpoints

The application uses the following API endpoints:

1. **Product API**: `https://dummyjson.com/products` (external)
2. **Place Order**: `/APIS/place-order.php` (local)
3. **Get Orders**: `/APIS/getorders.php` (local)

## Dependencies

- Vue 3
- Pinia (State Management)
- Vue Router
- Axios (HTTP Client)
- Bootstrap 5 (UI Framework)
- SweetAlert2 (Notifications)

## Development Tools

- Vite (Build Tool)
- Vue DevTools (Browser Extension recommended)