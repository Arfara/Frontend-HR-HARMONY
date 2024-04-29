import { toast } from 'react-toastify';

import axiosInstance from '@/configs/axiosInstance';

export const APIPayroll = {
  getAllPayrolls: async () => {
    try {
      const result = await axiosInstance.get('/payrolls', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getPayrollHistory: async () => {
    try {
      const result = await axiosInstance.get('/payrolls/history', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updatePayrollStatus: async (payrollId, paidStatus) => {
    try {
      const result = await axiosInstance.put(`/payrolls/${payrollId}`, { paid_status: paidStatus }, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success('Updated payroll status successfully');
      return result.data;
    } catch (error) {
      toast.error('Failed to update payroll status');
      throw new Error(error);
    }
  },

  createAdvanceSalary: async (advanceSalaryData) => {
    try {
      const result = await axiosInstance.post('/advance_salaries', advanceSalaryData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success('Advance salary created successfully');
      return result.data;
    } catch (error) {
      toast.error('Failed to create advance salary');
      throw new Error(error);
    }
  },

  getAllAdvanceSalaries: async () => {
    try {
      const result = await axiosInstance.get('/advance_salaries', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getAdvanceSalaryById: async (id) => {
    try {
      const result = await axiosInstance.get(`/advance_salaries/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateAdvanceSalaryById: async (id, advanceSalaryData) => {
    try {
      const result = await axiosInstance.put(`/advance_salaries/${id}`, advanceSalaryData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success('Advance salary updated successfully');
      return result.data;
    } catch (error) {
      toast.error('Failed to update advance salary');
      throw new Error(error);
    }
  },

  deleteAdvanceSalaryById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/advance_salaries/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success('Advance salary deleted successfully');
      return result.data;
    } catch (error) {
      toast.error('Failed to delete advance salary');
      throw new Error(error);
    }
  },

  createRequestLoan: async (requestLoanData) => {
    try {
      const result = await axiosInstance.post('/request_loans', requestLoanData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success('Request loan created successfully');
      return result.data;
    } catch (error) {
      toast.error('Failed to create request loan');
      throw new Error(error);
    }
  },

  getAllRequestLoans: async () => {
    try {
      const result = await axiosInstance.get('/request_loans', {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getRequestLoanById: async (id) => {
    try {
      const result = await axiosInstance.get(`/request_loans/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateRequestLoanById: async (id, requestLoanData) => {
    try {
      const result = await axiosInstance.put(`/request_loans/${id}`, requestLoanData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success('Request loan updated successfully');
      return result.data;
    } catch (error) {
      toast.error('Failed to update request loan');
      throw new Error(error);
    }
  },

  deleteRequestLoanById: async (id) => {
    try {
      const result = await axiosInstance.delete(`/request_loans/${id}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success('Request loan deleted successfully');
      return result.data;
    } catch (error) {
      toast.error('Failed to delete request loan');
      throw new Error(error);
    }
  }
};
