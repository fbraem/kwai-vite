import { createApp} from "vue"
// Create app
import App from "./App.vue"
import "./index.css"
const app = createApp(App)

// Setup i18n
import { createI18n } from "vue-i18n"
import messages from '@intlify/vite-plugin-vue-i18n/messages'
const i18n = createI18n({
    legacy: false,
    locale: 'nl',
    messages
})
app.use(i18n)

// Setup pinia store
import { createPinia } from "pinia"
const pinia = createPinia()
app.use(pinia)

// Setup router
import { createRouter, createWebHistory } from "vue-router"
import { routes } from "./routes"
const router = createRouter({
    history: createWebHistory('login'),
    routes
})
app.use(router)

app.mount("#app")
