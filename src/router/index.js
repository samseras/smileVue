import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/views/shoppingMall'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Goods from '@/views/Goods'
import GoodsCategory from '@/views/goodsCategory'
import Cart from '@/views/Cart'
import Main from '@/views/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/',
          name: 'ShoppingMall',
          component: ShoppingMall
        },
        {
          path: '/goodsCategory',
          name: 'GoodsCategory',
          component: GoodsCategory
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
  ]
})
