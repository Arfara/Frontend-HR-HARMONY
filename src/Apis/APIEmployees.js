import { toast } from 'react-toastify';

import axiosInstance from '@/configs/axiosInstance';

export const APIEmployees = {
  changePassword: async (id, data, token) => {
    try {
      const response = await axiosInstance.put(`/change-password/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } 
  },


  createEmployee: async (employeeData) => {
      try {
        const result = await axiosInstance.post('/admin/employees', employeeData);
        toast.success(result.data.message);
        return result.data;
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Error occurred while adding employee.");
        }
        throw new Error(error);
      }
  },

  getAllEmployees: async (params) => {
    try {
      const result = await axiosInstance.get('/admin/employees', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getEmployeeById: async (employeeId) => {
    try {
      const result = await axiosInstance.get(`/admin/employees/${employeeId}`);
      return result.data;
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error occurred while retrieving employee details.");
      }
      throw new Error(error);
    }
  },

  updateEmployee: async (employeeId, employeeData) => {
    try {
      const result = await axiosInstance.put(`/admin/employees/${employeeId}`, employeeData);
      toast.success(result.data.message);
      return result.data;
    } catch (error) {
      toast.error("Error occurred while updating employee.");
      throw new Error(error);
    }
  },

  deleteEmployee: async (employeeId) => {
    try {
      const result = await axiosInstance.delete(`/admin/employees/${employeeId}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Employee deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while deleting employee.");
      throw new Error(error);
    }
  },

  createRole: async (roleData) => {
    try {
      const result = await axiosInstance.post('/roles', roleData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success(result.data.message);
      return result.data;
    } catch (error) {
      toast.error("Error occurred while adding role.");
      throw new Error(error);
    }
  },

  getRoles: async (params) => {
    try {
        const result = await axiosInstance.get('/roles', {
            params,
        });
        return result.data;
    } catch (error) {
        throw new Error(error);
    }
  },

  editRole: async (roleId, roleData) => {
    try {
      const result = await axiosInstance.put(`/roles/${roleId}`, roleData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success(result.data.message);
      return result.data;
    } catch (error) {
      toast.error("Error occurred while updating role.");
      throw new Error(error);
    }
  },

  deleteRole: async (roleId) => {
    try {
      const result = await axiosInstance.delete(`/roles/${roleId}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success(result.data.message);
      return result.data;
    } catch (error) {
      toast.error("Error occurred while deleting role.");
      throw new Error(error);
    }
  },

  createOfficeShift: async (newShift) => {
    try {
      const response = await axiosInstance.post('/shifts', newShift, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Shift created successfully");
      return response.data;
    } catch (error) {
      toast.error("Error occurred while adding shift.");
      throw new Error(error);
    }
  },

  getOfficeShifts: async (params) => {
    try {
        const result = await axiosInstance.get('/shifts', {
            params,
        });
        return result.data;
    } catch (error) {
        throw new Error(error);
    }
  },
  
  updateOfficeShift: async (shiftId, updatedShift) => {
    try {
      const response = await axiosInstance.put(`/shifts/${shiftId}`, updatedShift, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Shift updated successfully");
      return await response.data;
    } catch (error) {
      toast.error("Error occurred while updating shift.");
      throw new Error(error);
    }
  },

  deleteOfficeShift: async (shiftId) => {
    try {
      const result = await axiosInstance.delete(`/shifts/${shiftId}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Shift deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while deleting shift.");
      throw new Error(error);
    }
  },

  createExitType: async (exitData) => {
    try {
      const result = await axiosInstance.post('/exits', exitData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Exit status created successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while adding exit type.");
      throw new Error(error);
    }
  },
  
  getAllExitTypes: async (params) => {
    try {
      const result = await axiosInstance.get('/exits', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  
  updateExitType: async (id, exitData) => {
    try {
      const result = await axiosInstance.put(`/exits/${id}`, exitData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Exit status updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while updating exit type.");
      throw new Error(error);
    }
  },
  
  deleteExitType: async (id) => {
    try {
      const result = await axiosInstance.delete(`/exits/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Exit status deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while deleting exit type.");
      throw new Error(error);
    }
  },

  createEmployeeExit: async (exitEmployeesId, exitData) => {
    try {
      const result = await axiosInstance.post(`/admin/employees/${exitEmployeesId}/exit`, exitData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Employee exit processed successfully");
      return result.data;
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error occurred while processing employee exit.");
      }
      throw new Error(error);
    }
  },

  getAllEmployeeExits: async (params) => {
    try {
      const result = await axiosInstance.get('/admin/employees/exit', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getEmployeeExitById: async (exitEmployeeId) => {
    try {
      const result = await axiosInstance.get(`/admin/employees/${exitEmployeeId}/exit`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteExitById: async (exitEmployeeId) => {
    try {
      const result = await axiosInstance.delete(`/admin/employees/${exitEmployeeId}/exit`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Employee exit deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error occurred while deleting employee exit.");
      throw new Error(error);
    }
  },
};