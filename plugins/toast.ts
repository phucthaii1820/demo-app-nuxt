import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

export default defineNuxtPlugin((nuxtApp) => {
    // Doing something with nuxtApp
    const toast = useToast({
        position: 'bottom-right',
    });
    return {
        provide: {
            toast,
        },
    };
});
