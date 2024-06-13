import { toast } from 'react-toastify';

import axiosInstance from '@/configs/axiosInstance';

export const APIAttendance  = {
  getEmployeeAttendanceReport: async (employeeId, monthYear) => {
    try {
      const response = await axiosInstance.get(`/admin/employee_attendance_report`, {
        params: {
          employee_id: employeeId,
          month_year: monthYear,
        },
        headers: {
          'Content-Type': 'application/pdf',
        },
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      toast.error("Error fetching attendance report.");
      throw new Error(error);
    }
  },

  createAttendance: async (attendanceData) => {
    try {
      const result = await axiosInstance.post('/attendances', attendanceData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Attendance data added successfully");
      return result.data;
    } catch (error) {
      toast.error("Error adding attendance data.");
      throw new Error(error);
    }
  },

  getAllAttendances: async (params) => {
    try {
      const result = await axiosInstance.get('/attendances', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getAttendanceById: async (attendanceId) => {
    try {
      const result = await axiosInstance.get(`/attendances/${attendanceId}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateAttendance: async (attendanceId, attendanceData) => {
    try {
      const result = await axiosInstance.put(`/attendances/${attendanceId}`, attendanceData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Attendance data updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error updating attendance data.");
      throw new Error(error);
    }
  },

  deleteAttendance: async (attendanceId) => {
    try {
      const result = await axiosInstance.delete(`/attendances/${attendanceId}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Attendance data deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error deleting attendance data.");
      throw new Error(error);
    }
  },

  createOvertimeRequest: async (overtimeRequestData) => {
    try {
      const result = await axiosInstance.post('/overtime_requests', overtimeRequestData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Overtime Request data added successfully");
      return result.data;
    } catch (error) {
      toast.error("Error adding Overtime Request data.");
      throw new Error(error);
    }
  },

  getAllOvertimeRequests: async (params) => {
    try {
      const result = await axiosInstance.get('/overtime_requests', {
        params,
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getOvertimeRequestById: async (overtimeRequestId) => {
    try {
      const result = await axiosInstance.get(`/overtime_requests/${overtimeRequestId}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  updateOvertimeRequest: async (overtimeRequestId, overtimeRequestData) => {
    try {
      const result = await axiosInstance.put(`/overtime_requests/${overtimeRequestId}`, overtimeRequestData, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Overtime Request data updated successfully");
      return result.data;
    } catch (error) {
      toast.error("Error updating Overtime Request data.");
      throw new Error(error);
    }
  },

  deleteOvertimeRequest: async (overtimeRequestId) => {
    try {
      const result = await axiosInstance.delete(`/overtime_requests/${overtimeRequestId}`, {
        headers: {
          'Authorization': `Bearer YOUR_TOKEN_HERE`
        }
      });
      toast.success("Overtime Request data deleted successfully");
      return result.data;
    } catch (error) {
      toast.error("Error deleting Overtime Request data.");
      throw new Error(error);
    }
  },
};