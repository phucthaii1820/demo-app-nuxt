export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token')

    const publicPages = ['/login', '/register', '/', '/about']
    const authenticatedPages = ['/login', '/register']

    if (token.value && authenticatedPages.includes(to.path)) {
        return navigateTo('/')
    }

    if (publicPages.includes(to.path)) {
        return
    }

    if (!token.value) {
        return navigateTo('/login')
    }
})