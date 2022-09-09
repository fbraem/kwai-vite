import { createApp} from "vue"

import App from "./App.vue"
import "./index.css"

import { createPinia } from "pinia"
const pinia = createPinia()

const app = createApp(App)
app.use(pinia)

import { createRouter, createWebHashHistory } from "vue-router"
import { routes } from "./routes"
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
app.use(router)

app.mount("#app")
