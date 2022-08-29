import { DialogLayout } from "@kwai/ui"
import { RouteRecordRaw } from "vue-router"
import LoginPage from "./pages/LoginPage.vue"

import heroImageUrl from '/hero.jpg'

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: DialogLayout,
        props: {
            image: heroImageUrl
        },
        children: [
            {
                name: 'login',
                path: '/',
                component: LoginPage
            }
        ]
    }
]
