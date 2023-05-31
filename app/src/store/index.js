import { createStore } from 'vuex';
import furniture from './modules/furniture';
import material from './modules/material';
import color from './modules/color';
import cut from './modules/cut';
import size from './modules/size';
import category from './modules/category';
import service from './modules/service';
import user from './modules/user';
import product from './modules/product';
import order from './modules/order';
import sale from './modules/sale';
import payment from './modules/payment';
import orderStatus from './modules/orderStatus';
import auth from './modules/auth';
import request from './modules/request';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    furniture,
    material,
    color,
    cut,
    service,
    user,
    product,
    size,
    category,
    order,
    sale,
    payment,
    orderStatus,
    auth,
    request
  }
})
