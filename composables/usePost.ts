import { useApi } from '~/composables/useApi';

const api = useApi();

export const usePost = () => {
    const getAllPost = async (page = 1, perPage = 10) => {
        try {
            const res = await api.get(pathApi.post.getAll + `?page=${page}&per_page=${perPage}`);
            return {
                success: true,
                data: res.data,
                meta: res.meta
            }
        } catch (error: any) {
            console.error('Error fetching posts:', error);
            const message = error?.data?.errors[0] || 'Failed to fetch posts';
            return {
                success: false,
                message
            }
        }
    }

    return {
        getAllPost
    }
}