import { toast } from 'react-toastify';
import axiosInstance from '@/configs/axiosInstance';

export const APIDashboard = {
    getDashboardData: async () => {
        try {
        const result = await axiosInstance.get('/admin/dashboard', {
            headers: {
                'Authorization': `Bearer YOUR_TOKEN_HERE`
            }
          });
          toast.success(result.data.message);
          return result.data;
        } catch (error) {
          toast.error(error.response.data.message);
          throw new Error(error);
        }
    }
};
