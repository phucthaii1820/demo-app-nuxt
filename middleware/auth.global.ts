
import { publicPages } from "#imports"

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token')

    const authenticatedPages = ['/login', '/register']

    if (token.value && authenticatedPages.includes(to.path)) {
        return navigateTo('/')
    }

    if (Object.values(publicPages).includes(to.path)) {
        return
    }

    if (!token.value) {
        return navigateTo('/login')
    }
})