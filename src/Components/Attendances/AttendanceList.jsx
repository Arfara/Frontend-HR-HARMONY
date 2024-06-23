import React, { useEffect, useState } from 'react';
import { APIAttendance } from '@/Apis/APIAttendance';
import Pagination from '../Pagination/Pagination';
import { getPaginatedData } from '../Pagination/Pagination';

const AttendanceList = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [total_count, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(10);

  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(total_count / per_page)) {
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const paginatedAttendanceData = getPaginatedData(attendanceData, currentPage, per_page);

  const fetchData = async () => {
    try {
      const params = { page: currentPage, per_page: per_page, searching: searchQuery };
      const response = await APIAttendance.getAllAttendances(params);
      setAttendanceData(response.data);
      setTotalCount(response.pagination.total_count || 0);
      setCurrentPage(response.pagination.page || 1);
      setPerPage(response.pagination.per_page || 10);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, per_page, searchQuery]);

  return (
    <div className="border border-gray-200 rounded overflow-hidden max-w-6xl ml-auto mr-auto">
      <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">Daily Attendance Report</h2>
      </div>
      <div className="p-5">
        <div className="flex justify-between mb-4">
          <label className="flex items-center">
            Show
            <select value={per_page} onChange={(e) => handlePerPageChange(Number(e.target.value))}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            entries
          </label>
          <div className="flex justify-end">
            <input type="text" className="px-2 py-1 border border-gray-300 rounded-md" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Out Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Early Leaving</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Work</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-sm text-gray-500">Loading attendance data...</td>
                  </tr>
                ) : paginatedAttendanceData.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-sm text-gray-500">No attendance data available.</td>
                  </tr>
                ) : (
                  paginatedAttendanceData.map((data) => (
                    <tr key={data.id} className="group hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex justify-between">
                          <div>{data.full_name_employee}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.attendance_date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.in_time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.out_time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.total_work}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.early_leaving}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.late}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-5000">
                        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${data.status === 'Absent' ? 'bg-red-200 text-red-800' : data.status === 'Present' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                          {data.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
        <div className="text-gray-500 text-sm my-4 flex justify-between items-center">
          <span>Showing {((currentPage - 1) * per_page) + 1} to {Math.min(currentPage * per_page, total_count)} of {total_count} records</span>
          <div className="flex justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(total_count / per_page)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;

