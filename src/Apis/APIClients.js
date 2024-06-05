import { toast } from 'react-toastify';
import axiosInstance from '@/configs/axiosInstance';

export const APIClients = {
  createClient: async (clientData) => {
    try {
      const response = await axiosInstance.post('/admin/clients', clientData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error("Failed to create client.");
      throw new Error(error);
    }
  },

  getAllClients: async (params) => {
    try {
      const response = await axiosInstance.get('/admin/clients', {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getClientById: async (id) => {
    try {
      const response = await axiosInstance.get(`/admin/clients/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateClient: async (id, clientData) => {
    try {
      const response = await axiosInstance.put(`/admin/clients/${id}`, clientData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error("Failed to update client.");
      throw new Error(error);
    }
  },

  deleteClientById: async (id) => {
    try {
      const response = await axiosInstance.delete(`/admin/clients/${id}`);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error("Failed to delete client.");
      throw new Error(error);
    }
  }
};