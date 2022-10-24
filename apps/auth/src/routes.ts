import { DialogLayout } from "@kwai/ui"
import { RouteRecordRaw } from "vue-router"
import LoginPage from "./pages/LoginPage.vue"
import InvitedPage from "./pages/InvitedPage.vue"
import RecoverPasswordPage from "./pages/RecoverPasswordPage.vue"
import ResetPasswordPage from "./pages/ResetPasswordPage.vue"

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
            },
            {
                name: 'invited',
                path: '/invited',
                component: InvitedPage
            },
            {
                name: 'recover',
                path: '/recover',
                component: RecoverPasswordPage
            },
            {
                name: 'reset',
                path: '/reset',
                component: ResetPasswordPage
            }
        ]
    }
]
