import { useApi } from '~/composables/useApi';

const api = useApi();

export const usePost = () => {
    const getAllPost = async (page = 1, perPage = 16) => {
        try {
            const res = await api.get(pathApi.post.base + `?page=${page}&per_page=${perPage}`);
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

    const updatePostbyId = async (postId: number, postData: any) => {
        try {
            const res = await api.put(pathApi.post.deletePost(postId.toString()), postData);

            return {
                success: true,
                message: 'Post updated successfully',
                data: res.data
            }
        }
        catch (error: any) {
            console.error('Error updating post:', error);
            const message = error?.data?.errors[0] || 'Failed to update post';
            return {
                success: false,
                message
            }
        }
    }

    const createPost = async (postData: any) => {
        try {
            const res = await api.post(pathApi.post.base, postData);
            return {
                success: true,
                message: 'Post created successfully',
                data: res.data
            }
        }
        catch (error: any) {
            console.error('Error creating post:', error);
            const message = error?.data?.errors[0] || 'Failed to create post';
            return {
                success: false,
                message
            }
        }
    }

    return {
        getAllPost,
        getMyPost,
        searchPost,
        deletePostbyId,
        updatePostbyId,
        createPost
    }
}