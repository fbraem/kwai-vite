import { RouteRecordRaw } from "vue-router"
import HomePage from "@theme/pages/Home.vue"
import PortalToolbar from "./components/PortalToolbar.vue"
import { PortalLayout } from "@kwai/ui"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: PortalLayout,
        children: [
            {
                name: 'home',
                path: '/',
                components: {
                    toolbar: PortalToolbar,
                    main: HomePage
                }
            }
        ]
    }
]
export default routes
