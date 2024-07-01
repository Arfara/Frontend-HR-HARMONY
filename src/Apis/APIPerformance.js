import { toast } from 'react-toastify';

import axiosInstance from '@/configs/axiosInstance';

export const APIPerformance = {
  createKpiIndicators: async (kpiData) => {
    try {
      const result = await axiosInstance.post('/kpi_indicators', kpiData, {
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
  },

  viewAllKpiIndicators: async (params) => {
    try {
      const result = await axiosInstance.get('/kpi_indicators', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  
  viewKpiIndicatorById: async (id) => {
    try {
      const result = await axiosInstance.get(`/kpi_indicators/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  updateListKpiIndicatorsById: async (id, kpiData) => {
    try {
      const result = await axiosInstance.put(`/kpi_indicators/${id}`, kpiData, {
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
  },

  deleteListKpiIndicatorsById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/kpi_indicators/${id}`, {
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
  },

  createKpaIndicators: async (kpaData) => {
    try {
      const result = await axiosInstance.post('/kpa_indicators', kpaData, {
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
  },

  viewAllKpaIndicators: async (params) => {
    try {
      const result = await axiosInstance.get('/kpa_indicators', {
        params,
      });
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  viewListKpaIndicatorsById: async (id) => {
    try {
      const result = await axiosInstance.get(`/kpa_indicators/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  updateListKpaIndicatorsById: async (id, kpaData) => {
    try {
      const result = await axiosInstance.put(`/kpa_indicators/${id}`, kpaData, {
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
  },

  deleteListKpaIndicatorsById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/kpa_indicators/${id}`, {
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
  },

  createGoals: async (goalData) => {
    try {
      const result = await axiosInstance.post('/goals', goalData, {
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
  },

  viewAllGoals: async (params) => {
    try {
      const result = await axiosInstance.get('/goals', {
        params,
      });
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  viewGoalById: async (id) => {
    try {
      const result = await axiosInstance.get(`/goals/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  updateGoalById: async (id, goalData) => {
    try {
      const result = await axiosInstance.put(`/goals/${id}`, goalData, {
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
  },

  deleteGoalById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/goals/${id}`, {
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
  },

  createGoalType: async (goalTypeData) => {
    try {
      const result = await axiosInstance.post('/goals_types', goalTypeData, {
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
  },

  viewAllGoalTypes: async (params) => {
    try {
      const result = await axiosInstance.get('/goals_types', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  viewAllGoalTypesNonPagination: async () => {
    try {
      const result = await axiosInstance.get('/goals_types');
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  viewGoalTypeById: async (id) => {
    try {
      const result = await axiosInstance.get(`/goals_types/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  updateGoalTypeById: async (id, goalTypeData) => {
    try {
      const result = await axiosInstance.put(`/goals_types/${id}`, goalTypeData, {
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
  },

  deleteGoalTypeById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/goals_types/${id}`, {
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
  },
};
