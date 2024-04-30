import { toast } from 'react-toastify';
import axiosInstance from '@/configs/axiosInstance';

export const APITasks = {
  createTask: async (taskData) => {
    try {
      const response = await axiosInstance.post('/tasks', taskData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Task created successfully.");
      return response.data;
    } catch (error) {
      toast.error("Failed to create task.");
      throw new Error(error);
    }
  },

  getAllTasks: async () => {
    try {
      const response = await axiosInstance.get('/tasks', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getTaskById: async (id) => {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return response.data.task;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateTaskById: async (id, taskData) => {
    try {
      const response = await axiosInstance.put(`/tasks/${id}`, taskData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Task updated successfully.");
      return response.data;
    } catch (error) {
      toast.error("Failed to update task.");
      throw new Error(error);
    }
  },

  deleteTaskById: async (id) => {
    try {
      const response = await axiosInstance.delete(`/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Task deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete task.");
      throw new Error(error);
    }
  },
};