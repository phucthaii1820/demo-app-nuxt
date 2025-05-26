import { useApi } from '~/composables/useApi';

const api = useApi();

export const usePost = () => {
    const getAllPost = async (page = 1, perPage = 16) => {
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

    const getMyPost = async (page = 1, perPage = 10) => {
        try {
            const res = await api.get(pathApi.post.getMyPosts + `?page=${page}&per_page=${perPage}`);
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
                message,
                data: []
            }
        }
    }

    const searchPost = async (query: string, page = 1, perPage = 16) => {
        try {
            const res = await api.get(pathApi.post.search + `?query=${query}&page=${page}&per_page=${perPage}`);
            return {
                success: true,
                data: res.data,
                meta: res.meta
            }
        }
        catch (error: any) {
            console.error('Error searching posts:', error?.data);
            const message = error?.data?.message || 'Failed to search posts';
            return {
                success: false,
                message,
                data: []
            }
        }
    }

    const deletePostbyId = async (postId: number) => {
        try {
            const res = await api.del(pathApi.post.deletePost(postId.toString()));

            return {
                success: true,
                message: 'Post deleted successfully',
                data: res.data
            }
        } catch (error: any) {
            console.error('Error deleting post:', error);
            const message = error?.data?.errors[0] || 'Failed to delete post';
        }
    }

    return {
        getAllPost,
        getMyPost,
        searchPost,
        deletePostbyId
    }
}