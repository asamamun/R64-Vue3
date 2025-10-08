# Vue3 Multiple View Layout with Props Passing

This project demonstrates how to create a Vue3 application with multiple view layouts using named router views and props passing.

## Features

1. **Multiple View Layout**: The application uses Vue Router's named views to create a layout with:
   - Header section
   - Left sidebar (category navigation)
   - Main content area (product listing)
   - Right sidebar (wishlist/cart)

2. **Props Passing**: Route components receive props for dynamic behavior

3. **State Management**: Uses Pinia for state management of products, cart, and wishlist

4. **Responsive Design**: Layout adapts to different screen sizes

## Project Structure

```
src/
├── App.vue              # Main layout component
├── main.ts              # Application entry point
├── router/
│   └── index.ts         # Vue Router configuration
├── stores/
│   └── productStore.ts  # Pinia store for product data
├── views/
│   ├── DashboardHeader.vue
│   ├── DashboardSidebar.vue
│   ├── DashboardMain.vue
│   └── WishlistSidebar.vue
└── components/
    ├── ProductCard.vue
    └── ProductList.vue
```

## Key Concepts Demonstrated

### 1. Named Router Views

The router configuration uses named views to render multiple components in a single route:

```javascript
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    components: {
      header: DashboardHeader,
      sidebar: DashboardSidebar,
      main: DashboardMain,
      wishlist: WishlistSidebar
    }
  }
]
```

### 2. Props Passing

Props are passed to route components:

```javascript
{
  path: '/category/:categoryId',
  name: 'Category',
  components: {
    header: DashboardHeader,
    sidebar: DashboardSidebar,
    main: DashboardMain,
    wishlist: WishlistSidebar
  },
  props: {
    header: true,
    sidebar: true,
    main: true,
    wishlist: true
  }
}
```

### 3. Layout Structure

The App.vue defines the layout structure using named router views:

```vue
<template>
  <div id="app">
    <router-view name="header"></router-view>
    <div class="container">
      <router-view name="sidebar"></router-view>
      <main>
        <router-view name="main"></router-view>
      </main>
      <router-view name="wishlist"></router-view>
    </div>
  </div>
</template>
```

## Sample Data

The application includes 20 sample products across 3 categories:
- Electronics (7 products)
- Clothing (6 products)
- Books (7 products)

## State Management

Pinia is used to manage:
- Product data
- Shopping cart
- Wishlist
- Selected category

## Responsive Design

The layout adapts to different screen sizes using CSS media queries.

## Development

To run the project:

```bash
npm install
npm run dev
```

## Learning Objectives

This project demonstrates:
1. How to create complex layouts with multiple named views
2. How to pass props to route components
3. How to use Pinia for state management
4. How to create responsive layouts
5. Component communication patterns in Vue3