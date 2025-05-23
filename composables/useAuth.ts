import { useAuthStore } from '@/stores/auth'
import { useApi } from '~/composables/useApi';

const api = useApi();

export const useAuth = () => {
    const login = async (email: string, password: string) => {
        const authStore = useAuthStore()

        try {
            const response = await api.post('/login', {
                user: {
                    email,
                    password
                }
            });
            const { user } = response.status.data
            authStore.setUser(user)
            return { success: true, data: response }
        } catch (error: any) {
            console.error('Login failed:', error)
            const message = error?.data?.message || 'Login failed'

            return {
                success: false,
                message
            }
        }
    }

    return {
        login
    }
}