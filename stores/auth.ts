import { defineStore } from "pinia";


export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: null as string | null,
        user: null as { id: number; name: string; email: string } | null,
    }),
    actions: {
        setUser(user: { id: number; name: string; email: string }) {
            this.user = user;
            useCookie("user", {
                maxAge: 60 * 60 * 24 * 7, // 7 days
            }).value = JSON.stringify(user);
        },
        setToken(token: string) {
            this.token = token;
            useCookie("token", {
                maxAge: 60 * 60 * 24 * 7, // 7 days
            }).value = token;
        },
        logout() {
            this.token = null;
            this.user = null;
            useCookie("token").value = null;
            useCookie("user").value = null;
        },
        loadAuthFromCookies() {
            const token = useCookie<string>('token')
            const user = useCookie<string>('user')

            this.token = token.value || ''
            this.user = user.value ? JSON.parse(JSON.stringify(user.value)) : null
        }
    }

});