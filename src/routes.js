import About from './components/About.vue'
import Home from './components/Home.vue'

export const routes = [
    { path: '/', component: Home },
    { path: '/:number', component: About }
]

// const router = new VueRouter({routes})

// router.beforeEach((to, from, next) => {
//     if(to.path !== '/'){
//         var pkmNumber = to.path.slice(1);

//         if(!pkmNumber.match(/\D/g)){
//             next();
//         }else{
//             next('/');
//         }
//     }else{
//         next();
//     }
// })