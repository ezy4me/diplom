import AdminHomeView from '../views/Admin/AdminHomeView.vue'
import AUsersView from '../views/Admin/AUsersView.vue'
import AColorsView from '../views/Admin/AColorsView.vue'
import ARequestsView from '../views/Admin/ARequestsView.vue'
import AMaterialsView from '../views/Admin/AMaterialsView.vue'
import AFurnitureView from '../views/Admin/AFurnitureView.vue'
import AServicesView from '../views/Admin/AServicesView.vue'
import AProductsView from '../views/Admin/AProductsView.vue'
import AOrdersView from '../views/Admin/AOrdersView.vue'

// const isAuthorized = Object.prototype.hasOwnProperty.call(localStorage, 'token') 

const adminAuthGuard = function (to, from, next) {
  if (localStorage.getItem('userRole') !== 'ADMIN') {
    console.log('ты не админ');
    next({ name: 'home' })
  }
  else next()
}


const AdminRouter = [
  {
    path: '/admin',
    name: 'admin',
    component: AdminHomeView,
    beforeEnter: adminAuthGuard,

  },
  {
    path: '/admin/users',
    name: 'users',
    component: AUsersView,
    beforeEnter: adminAuthGuard,

  },
  {
    path: '/admin/colors',
    name: 'colors',
    component: AColorsView,
    beforeEnter: adminAuthGuard,
  },
  {
    path: '/admin/requests',
    name: 'requsts',
    component: ARequestsView,
    beforeEnter: adminAuthGuard,
  },
  {
    path: '/admin/materials',
    name: 'materials',
    component: AMaterialsView,
    beforeEnter: adminAuthGuard,
  },
  {
    path: '/admin/furnitures',
    name: 'furnitures',
    component: AFurnitureView,
    beforeEnter: adminAuthGuard,
  },
  {
    path: '/admin/services',
    name: 'services',
    component: AServicesView,
    beforeEnter: adminAuthGuard,
  },
  {
    path: '/admin/products',
    name: 'products',
    component: AProductsView,
    beforeEnter: adminAuthGuard,
  },
  {
    path: '/admin/orders',
    name: 'orders',
    component: AOrdersView,
    beforeEnter: adminAuthGuard,
  },
]

export default AdminRouter
