import HomeView from '../views/User/HomeView.vue'
import SewingView from '../views/User/SewingView.vue'
import ProductsView from '../views/User/ProductsView.vue'
import ServicesView from '../views/User/ServicesView.vue'
import AboutView from '../views/User/AboutView.vue'
import AccountView from '../views/User/AccountView.vue'
import ContactsView from '../views/User/ContactsView.vue'
import PatternView from '../views/User/PatternView.vue'
import PrintView from '../views/User/PrintView.vue'

const isAuthorized = Object.prototype.hasOwnProperty.call(localStorage, 'token')

const authGuard = function (to, from, next) {
  if (!isAuthorized) {
    console.log(1);
    next({ name: 'home' })
  }
  else next()
}

const isAdmin = function(to, from, next) {
  if(localStorage.getItem('userRole') === 'ADMIN')
  {
    next({name: 'admin'})
  }
  else next()
}

const userRoutes = [
  {
    path: '/',
    name: 'home',
    beforeEnter: isAdmin,
    component: HomeView
  },
  {
    path: '/sewing',
    name: 'sewing', 
    component: SewingView
  },
  {
    path: '/pattern',
    name: 'pattern',
    component: PatternView
  },
  {
    path: '/print',
    name: 'print',
    component: PrintView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/account',
    name: 'account',
    beforeEnter: authGuard,
    component: AccountView
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsView
  },
]

export default userRoutes
