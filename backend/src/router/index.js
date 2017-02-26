import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/Home'
import UserInfo from 'views/UserInfo'
import Jokes from 'views/Jokes'
import AddJoke from 'views/AddJoke'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    { path: '/admin/myjokes', name: 'Jokes', component: Jokes },
    { path: '/admin/addjoke', name: 'AddJoke', component: AddJoke },
    { path: '/admin/my', name: 'UserInfo', component: UserInfo }
  ]
})
