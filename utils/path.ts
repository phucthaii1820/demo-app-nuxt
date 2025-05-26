export const publicPages = {
    home: '/',
    about: '/about',
    search: '/search',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
}

export const privatePages = {
    myPost: '/my-posts',
    profile: '/profile',
}

export const path = {
    ...publicPages,
    ...privatePages
}

export const pathApi = {
    auth: {
        login: '/login',
        register: '/signup',
    },
    post: {
        getAll: '/posts',
        getMyPosts: '/my-posts',
        search: '/posts/search',
        deletePost: (id: string) => `/posts/${id}`,
    }
}