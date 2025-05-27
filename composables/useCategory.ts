import { useApi } from '~/composables/useApi';

const api = useApi();

export const useCategory = () => {
    const getAllCategories = async () => {
        try {
            const res = await api.get(pathApi.category.getAll);
            return {
                success: true,
                data: res.data
            };
        } catch (error: any) {
            console.error('Error fetching categories:', error);
            const message = error?.data?.errors[0] || 'Failed to fetch categories';
            return {
                success: false,
                message
            };
        }
    };

    return {
        getAllCategories
    };
};