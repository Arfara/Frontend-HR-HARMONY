import { toast } from 'react-toastify';

import axiosInstance from '@/configs/axiosInstance';

export const APICoreHR = {
  createDepartment: async (departmentData) => {
    try {
      const result = await axiosInstance.post('/departments', departmentData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Department created successfully");
      return result.data;
    } catch (error) {
      toast.error("Error while creating department.");
      throw new Error(error);
    }
  },
  
  getAllDepartments: async (params) => {
    try {
      const result = await axiosInstance.get('/departments', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getDepartmentById: async (id) => {
    try {
      const result = await axiosInstance.get(`/departments/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateDepartment: async (id, departmentData) => {
    try {
      const result = await axiosInstance.put(`/departments/${id}`, departmentData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Department updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error while updating department.");
      throw new Error(error);
    }
  },

  deleteDepartment: async (id) => {
    try {
      const result = await axiosInstance.delete(`/departments/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Department deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error while deleting department.");
      throw new Error(error);
    }
  },

  createDesignation: async (designationData) => {
    try {
      const result = await axiosInstance.post('/designations', designationData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Designation created successfully");
      return result.data;
    } catch (error) {
      toast.error("Error while creating designation.");
      throw new Error(error);
    }
  },

  getAllDesignations: async (params) => {
    try {
      const result = await axiosInstance.get('/designations', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateDesignation: async (id, designationData) => {
    try {
      const result = await axiosInstance.put(`/designations/${id}`, designationData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Designation updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error while updating designation.");
      throw new Error(error);
    }
  },

  deleteDesignation: async (id) => {
    try {
      const result = await axiosInstance.delete(`/designations/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Designation deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error while deleting designation.");
      throw new Error(error);
    }
  },

  createPolicy: async (policyData) => {
    try {
      const result = await axiosInstance.post('/policies', policyData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Policy created successfully");
      return result.data;
    } catch (error) {
      toast.error("Error while creating policy.");
      throw new Error(error);
    }
  },

  getAllPolicies: async (params) => {
    try {
      const result = await axiosInstance.get('/policies', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getPolicyById: async (id) => {
    try {
      const result = await axiosInstance.get(`/policies/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updatePolicyById: async (id, policyData) => {
    try {
      const result = await axiosInstance.put(`/policies/${id}`, policyData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Policy updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error while updating policy.");
      throw new Error(error);
    }
  },

  deletePolicyById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/policies/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Policy deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error while deleting policy.");
      throw new Error(error);
    }
  },

  createAnnouncement: async (announcementData) => {
    try {
      const result = await axiosInstance.post('/announcements', announcementData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Announcement created successfully");
      return result.data;
    } catch (error) {
      toast.error("Error while creating announcement.");
      throw new Error(error);
    }
  },

  getAllAnnouncements: async (params) => {
    try {
      const result = await axiosInstance.get('/announcements', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getAnnouncementById: async (id) => {
    try {
      const result = await axiosInstance.get(`/announcements/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateAnnouncement: async (id, announcementData) => {
    try {
      const result = await axiosInstance.put(`/announcements/${id}`, announcementData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Announcement updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error while updating announcement.");
      throw new Error(error);
    }
  },

  deleteAnnouncement: async (id) => {
    try {
      const result = await axiosInstance.delete(`/announcements/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Announcement deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error while deleting announcement.");
      throw new Error(error);
    }
  },
};