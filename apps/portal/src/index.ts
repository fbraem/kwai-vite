import { createApp } from 'vue'

import App from './App.vue'
import './index.css'

import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

const router = createRouter({
    history: createWebHashHistory(),
    routes: []
})
import routes from "./routes"
routes.forEach(route => router.addRoute(route))
app.use(router)

app.mount("#app")
