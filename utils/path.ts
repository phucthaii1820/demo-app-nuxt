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
    setting: '/setting',
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
        base: '/posts',
        getMyPosts: '/my-posts',
        search: '/posts/search',
        deletePost: (id: string) => `/posts/${id}`,
    },
    category: {
        getAll: '/categories',
    },
    user: {
        profile: '/signup',
    }
}