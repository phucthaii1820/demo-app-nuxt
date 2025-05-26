// composables/useApi.ts
export const useApi = () => {
    return {
        get: async <T = any>(url: string, params?: Record<string, any>): Promise<T> => {
            useAuthStore().loadAuthFromCookies();
            const config = useRuntimeConfig();
            return await $fetch(url, {
                baseURL: config.public.API_URL,
                method: 'GET',
                query: params,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': useAuthStore().token ? `Bearer ${useAuthStore().token}` : '',
                },
            });
        },

        post: async <T = any>(url: string, body?: any): Promise<T> => {
            const config = useRuntimeConfig();
            let token: string | undefined;
            const authStore = useAuthStore()
            useAuthStore().loadAuthFromCookies();

            const data = await $fetch<T>(url, {
                baseURL: config.public.API_URL,
                method: 'POST',
                body,
                onResponse({ response }) {
                    const authHeader = response.headers.get('authorization');
                    if (authHeader?.startsWith('Bearer ')) {
                        token = authHeader.split(' ')[1];
                    }
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': useAuthStore().token ? `Bearer ${useAuthStore().token}` : '',
                },
            });

            if (token) {
                authStore.setToken(token);
            }

            return data;

        },

        put: async <T = any>(url: string, body?: any): Promise<T> => {
            const config = useRuntimeConfig();
            useAuthStore().loadAuthFromCookies();
            return await $fetch(url, {
                baseURL: config.public.API_URL,
                method: 'PUT',
                body,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': useAuthStore().token ? `Bearer ${useAuthStore().token}` : '',
                },
            });
        },

        del: async <T = any>(url: string, body?: any): Promise<T> => {
            const config = useRuntimeConfig();
            useAuthStore().loadAuthFromCookies();
            return await $fetch(url, {
                baseURL: config.public.API_URL,
                method: 'DELETE',
                body,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': useAuthStore().token ? `Bearer ${useAuthStore().token}` : '',
                },
            });
        },
    };
};
