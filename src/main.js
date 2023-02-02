import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes.js'
import './style.css'
import App from './App.vue'

const app = createApp(App)
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

app.directive('rotate-on-scroll', (el, binding) => {
    window.addEventListener('scroll', () => {
        var rotation = `translateY(-50%) rotateZ(${window.scrollY / 15}deg)`;
        el.style.transform = rotation;
    })
})
app.use(router)
app.mount('#app')
