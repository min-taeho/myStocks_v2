import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'

// router setup
import routes from './routes/routes'
//import './registerServiceWorker'
import VModal from 'vue-js-modal';
Vue.use(VModal, { dynamic: true })

/*
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
*/
import { BootstrapVue, LayoutPlugin, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(LayoutPlugin)
Vue.use(IconsPlugin)

Vue.config.productionTip = false


// plugin setup
Vue.use(VueRouter)


import { currency } from "@/utils/currency";
import { rate } from "@/utils/rate";

// add filter
Vue.filter("makeComma", val =>{
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})
Vue.filter('currency', currency)
Vue.filter('currencyDollar', currency)
Vue.filter('currencyWon', value => {
    return currency(value, "￦", 0);
})
Vue.filter('exchangeWon', value => {
  return currency(value, "￦", 2);
})
Vue.filter('rate', rate)


// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  //linkActiveClass: 'nav-item active',
  /*
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
  */
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
