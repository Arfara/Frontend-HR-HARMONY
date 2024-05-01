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
      toast.success("Trainer created successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while creating trainer.");
      throw new Error(error);
    }
  },

  viewAllTrainers: async () => {
    try {
      const result = await axiosInstance.get('/trainers', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      toast.error("Error occurred while fetching trainers.");
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
      toast.success("Trainer updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while updating trainer.");
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
      toast.success("Trainer deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while deleting trainer.");
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
      toast.success("TrainingSkill created successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while creating training skill.");
      throw new Error(error);
    }
  },

  viewAllTrainingSkills: async () => {
    try {
      const result = await axiosInstance.get('/training_skills', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
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
      toast.success("TrainingSkill updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while updating training skill.");
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
      toast.success("TrainingSkill deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while deleting training skill.");
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
      toast.success("Training created successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while creating training.");
      throw new Error(error);
    }
  },

  viewAllTrainings: async () => {
    try {
      const result = await axiosInstance.get('/trainings', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
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
      toast.success("Training updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while updating training.");
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
      toast.success("Training deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while deleting training.");
      throw new Error(error);
    }
  }
};