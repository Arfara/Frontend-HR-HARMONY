import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { APICoreHR } from '@/Apis/APICoreHR';
import Pagination from '../Pagination';
import { getPaginatedData } from '@/Models/PaginationModel';

const Designation = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedDesignationId, setSelectedDesignationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const totalPages = Math.ceil(departments.length / perPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedDesignations = getPaginatedData(designations, currentPage, perPage);


  useEffect(() => {
    const fetchDesignations = async () => {
      setIsLoading(true);
      try {
        const data = await APICoreHR.getAllDesignations();
        setDesignations(data.designations || []);
      } catch (error) {

      }
      setIsLoading(false);
    };
    fetchDesignations();
  }, []);

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

  const handleEditClick = (designation) => {
    setCurrentEdit(designation);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (designation) => {
    setSelectedDesignationId(designation.id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedDesignationId) {
      setIsLoading(true);
      try {
        await APICoreHR.deleteDesignation(selectedDesignationId);
        setShowDeleteConfirmation(false);
        const data = await APICoreHR.getAllDesignations();
        setDesignations(data.designations || []);
      } catch (error) {

      }
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const designationData = {
      department_id: parseInt(event.target.designationDepartment.value),
      designation_name: event.target.designationName.value,
      description: event.target.designationDescription.value,
    };
    try {
      await APICoreHR.createDesignation(designationData);
      const data = await APICoreHR.getAllDesignations();
      setDesignations(data.designations || []);
      setIsLoading(false);
      event.target.reset();
      document.getElementById('designationDepartment').value = "";
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (currentEdit && currentEdit.id) {
      setIsLoading(true);
      try {
        await APICoreHR.updateDesignation(currentEdit.id, currentEdit);
        setIsEditModalOpen(false);
        const data = await APICoreHR.getAllDesignations();
        setDesignations(data.designations || []);
      } catch (error) {

      }
      setIsLoading(false);
    } else {
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="max-w-6xl ml-auto mr-auto">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-1/3 px-3 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
              <h5 className="text-lg font-semibold text-gray-700">Add New Designation</h5>
            </div>            
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-3">
                <label htmlFor="designationDepartment" className="block text-sm font-medium text-gray-700">Department *</label>
                <select id="designationDepartment" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>{department.department_name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="designationName" className="block text-sm font-medium text-gray-700">Designation Name *</label>
                <input type="text" id="designationName" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Designation Name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="designationDescription" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="designationDescription" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Description"></textarea>
              </div>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Save</button>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DESIGNATION</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DEPARTMENT</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-sm text-gray-500">Loading designations data...</td>
                    </tr>
                  ) : paginatedDesignations.length > 0 ? (
                    paginatedDesignations.map((designation) => (
                      <tr 
                        key={designation.id} 
                        onMouseEnter={() => setHoveredRow(designation.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`relative ${hoveredRow === designation.id ? 'bg-gray-100' : 'bg-white'}`}
                      >
                        <td className="border px-4 py-2 relative text-sm text-gray-900">
                          {designation.designation_name}
                          {hoveredRow === designation.id && (
                            <div className="absolute right-0 top-0 mr-3 mt-1 flex items-center">
                              <button className="p-1 mr-2 text-blue-600 hover:text-blue-800" onClick={() => handleEditClick(designation)}>
                                <PencilAltIcon className="h-5 w-5" />
                              </button>
                              <button className="p-1 text-red-600 hover:text-red-800" onClick={() => handleDeleteClick(designation)}>
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="border px-4 py-2 text-sm text-gray-900">
                          {departments.find(dept => dept.id === designation.department_id)?.department_name || 'Unknown Department'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-sm text-gray-500">
                        No designations data available.
                      </td>
                    </tr>
                  )}
                  </tbody>
                </table>
            </div>
            <div className="text-gray-500 text-sm p-3 flex justify-between items-center">
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
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="edit-designation-modal">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg font-semibold">Edit Designation</h4>
              <button onClick={() => setIsEditModalOpen(false)} className="text-black">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="editDesignationDepartment" className="block text-sm font-medium text-gray-700">Department *</label>
                <select id="editDesignationDepartment" value={currentEdit.department_id} onChange={(e) => setCurrentEdit({ ...currentEdit, department_id: parseInt(e.target.value) })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>{department.department_name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="editDesignationName" className="block text-sm font-medium text-gray-700">Designation Name *</label>
                <input type="text" id="editDesignationName" value={currentEdit.designation_name} onChange={(e) => setCurrentEdit({ ...currentEdit, designation_name: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
              </div>
              <div className="mb-3">
                <label htmlFor="editDesignationDescription" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="editDesignationDescription" value={currentEdit.description} onChange={(e) => setCurrentEdit({ ...currentEdit, description: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
              </div>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Update</button>
            </form>
          </div>
        </div>
      )}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="delete-confirmation-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Are you sure you want to delete this record?</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">You won't be able to revert this!</p>
              </div>
              <div className="items-center px-4 py-3">
                <button className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-24 mr-2" onClick={() => setShowDeleteConfirmation(false)}>Close</button>
                <button className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-24" onClick={handleConfirmDelete}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Designation;
