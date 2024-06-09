import { toast } from 'react-toastify';
import axiosInstance from '@/configs/axiosInstance';

export const APIHelpdesk = {
  createHelpdesk: async (helpdeskData) => {
    try {
      const result = await axiosInstance.post('/helpdesks', helpdeskData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Helpdesk created successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while creating helpdesk.");
      throw new Error(error);
    }
  },

  viewAllHelpdesks: async () => {
    try {
      const result = await axiosInstance.get('/helpdesks', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      toast.error("Error occurred while fetching helpdesks.");
      throw new Error(error);
    }
  },

  viewHelpdeskById: async (id) => {
    try {
      const result = await axiosInstance.get(`/helpdesks/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      toast.error("Error occurred while fetching helpdesk.");
      throw new Error(error);
    }
  },

  updateHelpdeskById: async (id, helpdeskData) => {
    try {
      const result = await axiosInstance.put(`/helpdesks/${id}`, helpdeskData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Helpdesk updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while updating helpdesk.");
      throw new Error(error);
    }
  },

  deleteHelpdeskById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/helpdesks/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Helpdesk deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while deleting helpdesk.");
      throw new Error(error);
    }
  },

  getHelpdeskProgress: async () => {
    try {
      const result = await axiosInstance.get('/helpdesks/progress-bar');
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  }
};