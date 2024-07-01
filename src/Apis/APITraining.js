import { toast } from 'react-toastify';
import axiosInstance from '@/configs/axiosInstance';

export const APITraining = {
  createTrainer: async (trainerData) => {
    try {
      const result = await axiosInstance.post('/trainers', trainerData, {
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

  viewAllTrainers: async (params) => {
    try {
      const result = await axiosInstance.get('/trainers', {
        params,
      });
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },

  viewAllTrainersNonPagination: async () => {
    try {
      const result = await axiosInstance.get('/trainers/non-pagination');
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  viewTrainerById: async (id) => {
    try {
      const result = await axiosInstance.get(`/trainers/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateTrainerById: async (id, trainerData) => {
    try {
      const result = await axiosInstance.put(`/trainers/${id}`, trainerData, {
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

  deleteTrainerById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/trainers/${id}`, {
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

  createTrainingSkill: async (skillData) => {
    try {
      const result = await axiosInstance.post('/training_skills', skillData, {
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

  viewAllTrainingSkills: async (params) => {
    try {
      const result = await axiosInstance.get('/training_skills', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  viewAllTrainingSkillsNonPagination: async () => {
    try {
      const result = await axiosInstance.get('/training_skills/non-pagination');
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  viewTrainingSkillById: async (id) => {
    try {
      const result = await axiosInstance.get(`/training_skills/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateTrainingSkillById: async (id, skillData) => {
    try {
      const result = await axiosInstance.put(`/training_skills/${id}`, skillData, {
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

  deleteTrainingSkillById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/training_skills/${id}`, {
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

  createTraining: async (trainingData) => {
    try {
      const result = await axiosInstance.post('/trainings', trainingData, {
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

  viewAllTrainings: async (params) => {
    try {
      const result = await axiosInstance.get('/trainings', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  viewAllTrainingsNonPagination: async () => {
    try {
      const result = await axiosInstance.get('/trainings/non-pagination');
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  viewTrainingById: async (id) => {
    try {
      const result = await axiosInstance.get(`/trainings/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateTrainingById: async (id, trainingData) => {
    try {
      const result = await axiosInstance.put(`/trainings/${id}`, trainingData, {
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

  deleteTrainingById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/trainings/${id}`, {
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