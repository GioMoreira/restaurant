import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '@/components/Cart.vue'
import AddToCart from '@/components/AddToCart.vue'
import Payment from '../views/Payment.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/addToCart/:id',
    name: 'AddToCart',
    component: AddToCart,
    props: true
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment,
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
]

const router = new VueRouter({
  routes
})

export default router
