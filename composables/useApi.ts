// composables/useApi.ts
export const useApi = () => {
    return {
        get: async <T = any>(url: string, params?: Record<string, any>): Promise<T> => {
            const config = useRuntimeConfig();
            return await $fetch(url, {
                baseURL: config.public.API_URL,
                method: 'GET',
                query: params,
            });
        },

        post: async <T = any>(url: string, body?: any): Promise<T> => {
            const config = useRuntimeConfig();
            let token: string | undefined;
            const authStore = useAuthStore()

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
            });

            if (token) {
                authStore.setToken(token);
            }

            return data;

        },

        put: async <T = any>(url: string, body?: any): Promise<T> => {
            const config = useRuntimeConfig();
            return await $fetch(url, {
                baseURL: config.public.API_URL,
                method: 'PUT',
                body,
            });
        },

        del: async <T = any>(url: string, body?: any): Promise<T> => {
            const config = useRuntimeConfig();
            return await $fetch(url, {
                baseURL: config.public.API_URL,
                method: 'DELETE',
                body,
            });
        },
    };
};
