import React, { useState, useEffect } from 'react';
import { EyeIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { APIPayroll } from '@/Apis/APIPayroll';
import { APIEmployees } from '@/Apis/APIEmployees';
import Pagination from '../Pagination';
import { getPaginatedData } from '@/Models/PaginationModel';

const PayslipHistory = () => {
  const navigate = useNavigate();
  const [visibleDelete, setVisibleDelete] = useState(null);
  const [payrollHistory, setPayrollHistory] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const totalPages = Math.ceil(payrollHistory.length / perPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedPayrollHistory = getPaginatedData(payrollHistory, currentPage, perPage);

  useEffect(() => {
    const fetchPayrollHistory = async () => {
      try {
        const payrollData = await APIPayroll.getPayrollHistory();
        setPayrollHistory(payrollData.payroll_info_list);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    const fetchEmployees = async () => {
      try {
        const employeesData = await APIEmployees.getAllEmployees();
        setEmployees(employeesData.employees);
      } catch (error) {

      }
    };

    fetchPayrollHistory();
    fetchEmployees();
  }, []);

  const handleViewDetails = (employeeId) => {
    navigate(`/payroll/payroll-view/${employeeId}`);
  };

  return (
    <div className="border border-gray-200 rounded overflow-hidden max-w-6xl ml-auto mr-auto">
      <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">Payslip History</h2>
      </div>
      <div className="p-5">
        <div className="flex justify-between mb-4">
          <label className="flex items-center">
            Show
              <select className="mx-2 rounded border border-gray-300" onChange={(e) => setPerPage(Number(e.target.value))}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            entries
          </label>
          <div className="flex justify-end">
            <input type="search" placeholder="Search" className="rounded border border-gray-300 p-2" />
          </div>
        </div>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Payable</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan="4" className="text-center py-4 text-sm text-gray-500">Loading payslip history data...</td></tr>
              ) : paginatedPayrollHistory.length > 0 ? (
                paginatedPayrollHistory.map((record) => {
                  const employee = employees.find(e => e.id === record.employee_id);
                  const salaryMonth = new Date(record.created_at).toLocaleString('default', { month: 'long', year: 'numeric' });
                  const payDate = new Date(record.updated_at).toISOString().split('T')[0];

                  return (
                    <tr key={record.id}
                        onMouseEnter={() => setVisibleDelete(record.id)}
                        onMouseLeave={() => setVisibleDelete(null)}
                        className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 relative">
                        {employee ? `${employee.first_name} ${employee.last_name}` : 'Tidak Ditemukan'}
                        {visibleDelete === record.id && (
                          <button className="absolute right-0 top-0 bottom-0 mr-4" onClick={() => handleViewDetails(record.id)}>
                            <EyeIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.basic_salary}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{salaryMonth}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {record.paid_status ? (
                            <span className="bg-green-200 text-green-700 py-1 px-3 rounded-full text-xs">Paid</span>
                          ) : (
                            <span className="bg-red-200 text-red-700 py-1 px-3 rounded-full text-xs">Unpaid</span>
                          )}
                        </td>
                    </tr>
                  );
                })
              ) : (
                <tr><td colSpan="4" className="text-center py-4 text-sm text-gray-500">No payslip history data available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="text-gray-500 text-sm my-4 flex justify-between items-center">
          <span>Showing {((currentPage - 1) * perPage) + 1} to {Math.min(currentPage * perPage, payrollHistory.length)} of {payrollHistory.length} records</span>
          <div className="flex justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipHistory;
