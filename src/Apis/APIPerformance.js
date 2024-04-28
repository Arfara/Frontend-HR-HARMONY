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
      toast.success("KPI Indicator added successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while adding KPI Indicator.");
      throw new Error(error);
    }
  },

  viewAllKpiIndicators: async () => {
    try {
      const result = await axiosInstance.get('/kpi_indicators', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
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
      toast.error("Error occurred while fetching KPI Indicator.");
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
      toast.success("KPI Indicator updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while updating KPI Indicator.");
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
      toast.success("KPI Indicator deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while deleting KPI Indicator.");
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
      toast.success("KPA Indicator created successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while adding KPA Indicator.");
      throw new Error(error);
    }
  },

  viewAllKpaIndicators: async () => {
    try {
      const result = await axiosInstance.get('/kpa_indicators', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      toast.error("Error occurred while fetching all KPA Indicators.");
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
      toast.error("Error occurred while fetching KPA Indicator.");
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
      toast.success("KPA Indicator updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while updating KPA Indicator.");
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
      toast.success("KPA Indicator deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while deleting KPA Indicator.");
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
      toast.success("Goal created successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while adding goal.");
      throw new Error(error);
    }
  },

  viewAllGoals: async () => {
    try {
      const result = await axiosInstance.get('/goals', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      toast.error("Error occurred while fetching all goals.");
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
      toast.error("Error occurred while fetching goal.");
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
      toast.success("Goal updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while updating goal.");
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
      toast.success("Goal deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while deleting goal.");
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
      toast.success("Goal type added successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while adding goal type.");
      throw new Error(error);
    }
  },

  viewAllGoalTypes: async () => {
    try {
      const result = await axiosInstance.get('/goals_types', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      toast.error("Error occurred while fetching all goal types");
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
      toast.error("Error occurred while fetching goal type.");
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
      toast.success("Goal type updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while updating goal type.");
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
      toast.success("Goal type deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while deleting goal type.");
      throw new Error(error);
    }
  },
};
