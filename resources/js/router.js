import Vue from 'vue';
import Router  from 'vue-router';
import Dashboard  from './components/Dashboard.vue';
import Developer  from './components/Developer.vue';
import Profile  from './components/Profile.vue';
import Users  from './components/Users.vue';
import Post  from './components/Post.vue';
import NewPost  from './components/NewPost.vue';

Vue.use(Router);
const routes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/developer', component: Developer },
    { path: '/users', component: Users },
    { path: '/posts', component: Post },
    { path: '/newposts', component: NewPost },
    { path: '/profile', component: Profile }
  ]

export default new Router({
    mode: 'history',
    routes
})