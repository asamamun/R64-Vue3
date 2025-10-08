import { createRouter, createWebHistory } from 'vue-router'
import { 
  DashboardHeader, 
  DashboardSidebar, 
  DashboardMain, 
  WishlistSidebar,
  ProductDetails,
  CartView,
  // EmptyView
} from '../views'
import EmptyView from '../views/EmptyView.vue'

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
  },
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
  },
  // New route for product details
  {
    path: '/product/:id',
    name: 'ProductDetails',
    components: {
      header: DashboardHeader,
      sidebar: DashboardSidebar,
      main: ProductDetails,
      wishlist: WishlistSidebar
    },
    props: {
      header: true,
      sidebar: true,
      main: true,
      wishlist: true
    }
  },
  // New route for cart
  {
    path: '/cart',
    name: 'Cart',
    components: {
      header: DashboardHeader,
      sidebar:EmptyView ,
      main: CartView,
      wishlist: WishlistSidebar
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router