import { useApi } from '~/composables/useApi';

const api = useApi();

interface ParamsUpdateProfile {
    name: string;
    isUpdatePassword: boolean;
    currentPassword: string;
    newPassword: string;
}

export const useUser = () => {
    const updateProfile = async (body: ParamsUpdateProfile) => {
        try {
            let response
            if (body.isUpdatePassword) {
                response = await api.patch(pathApi.user.profile, {
                    user: {
                        name: body.name,
                        current_password: body.currentPassword,
                        new_password: body.newPassword
                    }
                })
            } else {
                response = await api.patch(pathApi.user.profile, {
                    user: {
                        name: body.name
                    }
                })
            }

            return {
                success: true,
                data: response
            }
        } catch (error: any) {
            return {
                success: false,
                message: error?.data?.status?.message || 'Update failed'
            }
        }
    }

    return {
        updateProfile
    }
}