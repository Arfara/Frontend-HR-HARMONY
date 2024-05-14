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
          return result.data;
        } catch (error) {
          throw new Error(error);
        }
    }
};
