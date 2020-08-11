import Vue from 'vue';
import Router  from 'vue-router';
import Dashboard  from './components/Dashboard.vue';
import Profile  from './components/Profile.vue';
import Users  from './components/Users.vue';

Vue.use(Router);
const routes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/users', component: Users },
    { path: '/profile', component: Profile }
  ]

export default new Router({
    mode: 'history',
    routes
})