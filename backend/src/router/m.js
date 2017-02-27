import Vue from 'vue'
import Router from 'vue-router'
import Mhome from 'views/Mhome'
import Mlogin from 'views/Mlogin'
import Mnewjoke from 'views/Mnewjoke'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/m/login', name: 'login', component: Mlogin },
    { path: '/m', name: 'home', component: Mhome },
    { path: '/m/newjoke', name: 'newjoke', component: Mnewjoke }
  ]
})
