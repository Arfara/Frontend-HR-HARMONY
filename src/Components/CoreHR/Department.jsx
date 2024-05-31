import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { APICoreHR } from '@/Apis/APICoreHR';
import { APIEmployees } from '@/Apis/APIEmployees';
import Pagination from '../Pagination';
import { getPaginatedData } from '@/Models/PaginationModel';

const Department = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [departmentName, setDepartmentName] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const totalPages = Math.ceil(departments.length / perPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedDepartments = getPaginatedData(departments, currentPage, perPage);

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading(true);
      try {
        const data = await APICoreHR.getAllDepartments();
        setDepartments(data.departments || []);
      } catch (error) {

      }
      setIsLoading(false);
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesData = await APIEmployees.getAllEmployees();
        setEmployees(employeesData.employees || []);
      } catch (error) {

      }
    };
    fetchEmployees();
  }, []);

  const handleAddDepartment = async (event) => {
    event.preventDefault();
    const departmentData = { department_name: departmentName, employee_id: parseInt(selectedEmployeeId, 10) };
    setIsLoading(true);
    try {
      await APICoreHR.createDepartment(departmentData);
      const updatedDepartments = await APICoreHR.getAllDepartments();
      setDepartments(updatedDepartments.departments || []);
      setDepartmentName('');
      setSelectedEmployeeId('');
    } catch (error) {

    }
    setIsLoading(false);
  };

  const handleEditClick = (department) => {
    setCurrentEdit({
      id: department.id,
      name: department.department_name,
      head: department.employee_id
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (departmentId) => {
    setSelectedDepartmentId(departmentId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedDepartmentId) {
      try {
        await APICoreHR.deleteDepartment(selectedDepartmentId);
        const updatedDepartments = await APICoreHR.getAllDepartments();
        setDepartments(updatedDepartments.departments || []);
        setShowDeleteConfirmation(false);
      } catch (error) {

      }
    }
  };

  const handleUpdateDepartment = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await APICoreHR.updateDepartment(currentEdit.id, { department_name: currentEdit.name, employee_id: parseInt(currentEdit.head, 10) });
      const updatedDepartments = await APICoreHR.getAllDepartments();
      setDepartments(updatedDepartments.departments || []);
      setIsEditModalOpen(false);
    } catch (error) {

    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-6xl ml-auto mr-auto">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-1/3 px-3 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
              <h5 className="text-lg font-semibold text-gray-700">Add New Department</h5>
            </div>
            <form className="p-4" onSubmit={handleAddDepartment}>
              <div>
                <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700">Name *</label>
                <input type="text" name="departmentName" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Name" required />
              </div>
              <div className="mt-3 mb-3">
                <label htmlFor="departmentHead" className="block text-sm font-medium text-gray-700">Department Head</label>
                <select id="departmentHead" value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Select head</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="bg-indigo-600 text-white mb-4 px-4 py-2 rounded-md hover:bg-indigo-700">Save</button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-2/3 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
              <h5 className="text-lg font-semibold text-gray-700">List All Departments</h5>
            </div>
            <div className="flex justify-between px-3 mt-3">
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
            <div className="overflow-x-auto mb-4 px-3">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DEPARTMENT NAME</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DEPARTMENT HEAD</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CREATED AT</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-sm text-gray-500">Loading departments data...</td>
                    </tr>
                  ) : paginatedDepartments && paginatedDepartments.length > 0 ? (
                    paginatedDepartments.map((department, index) => {
                      const employee = employees.find(emp => emp.id === department.employee_id);
                      return (
                        <tr 
                          key={index} 
                          onMouseEnter={() => setHoveredRow(index)}
                          onMouseLeave={() => setHoveredRow(null)}
                          className={`relative ${hoveredRow === index ? 'bg-gray-100' : 'bg-white'}`}
                        >
                          <td className="border px-4 py-2 relative text-sm text-gray-900">
                            {department.department_name}
                            {hoveredRow === index && (
                              <div className="absolute right-0 top-0 mr-3 mt-1 flex items-center">
                                <button className="p-1 mr-2 text-blue-600 hover:text-blue-800" onClick={() => handleEditClick(department)}>
                                  <PencilAltIcon className="h-5 w-5" />
                                </button>
                                <button className="p-1 text-red-600 hover:text-red-800" onClick={() => handleDeleteClick(department.id)}>
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="border px-4 py-2 text-sm text-gray-900">{employee ? `${employee.first_name} ${employee.last_name}` : 'N/A'}</td>
                          <td className="border px-4 py-2 text-sm text-gray-900">{department.created_at.split('T')[0]}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-sm text-gray-500">
                        No departments data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="text-gray-500 text-sm my-4 flex justify-between items-center">
                <span>Showing {((currentPage - 1) * perPage) + 1} to {Math.min(currentPage * perPage, departments.length)} of {departments.length} records</span>
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
        </div>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="edit-department-modal">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg font-semibold">Edit Department Information</h4>
              <button onClick={() => setIsEditModalOpen(false)} className="text-black">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <p className="mb-5">We need below required information to update this record.</p>
            <form onSubmit={handleUpdateDepartment}>
              <div className="mb-5">
                <label htmlFor="editDepartmentName" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input type="text" value={currentEdit.name} onChange={(e) => setCurrentEdit({ ...currentEdit, name: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" id="editDepartmentName" required />
              </div>
              <div className="mb-5">
                <label htmlFor="editDepartmentHead" className="block text-sm font-medium text-gray-700 mb-2">Department Head</label>
                <select value={currentEdit.head} onChange={(e) => setCurrentEdit({ ...currentEdit, head: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" id="editDepartmentHead">
                  <option>Select head</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-end space-x-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                  Close
                </button>
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="delete-department-modal">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg font-semibold">Confirm Delete</h4>
              <button onClick={() => setShowDeleteConfirmation(false)} className="text-black">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <p className="mb-5">Are you sure you want to delete this department?</p>
            <div className="flex items-center justify-end space-x-3">
              <button type="button" onClick={() => setShowDeleteConfirmation(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                Cancel
              </button>
              <button type="button" onClick={handleConfirmDelete} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Department;

