import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { APIEmployees } from '@/Apis/APIEmployees';
import Pagination from '../Pagination/Pagination';
import { getPaginatedData } from '../Pagination/Pagination';

const ExitType = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [exitTypes, setExitTypes] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedExitTypeId, setSelectedExitTypeId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const paginatedExitTypes = getPaginatedData(exitTypes, currentPage, per_page);

  const fetchExitTypes = async () => {
    setIsLoading(true);
    try {
      const params = { page: currentPage, per_page: per_page, searching: searchQuery };
      const response = await APIEmployees.getAllExitTypes(params);
      const formattedData = response.exits.map(exit => ({
        ...exit,
        created_at: exit.created_at.split('T')[0],
        UpdatedAt: exit.UpdatedAt.split('T')[0]
      }));
      setExitTypes(formattedData || []);
      setTotalCount(response.pagination.total_count || 0);
      setCurrentPage(response.pagination.page || 1);
      setPerPage(response.pagination.per_page || 10);
      setIsLoading(false);
    } catch (error) {
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchExitTypes();
  }, [currentPage, per_page, searchQuery]);

  const handleEditClick = (exitType) => {
    setCurrentEdit(exitType);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (currentEdit && currentEdit.id) {
      try {
        await APIEmployees.updateExitType(currentEdit.id, { exit_name: currentEdit.exit_name });
        const updatedExitTypes = exitTypes.map(et => et.id === currentEdit.id ? { ...et, exit_name: currentEdit.exit_name, created_at: et.created_at.split('T')[0], UpdatedAt: et.UpdatedAt.split('T')[0] } : et);
        setExitTypes(updatedExitTypes || []);
        setIsEditModalOpen(false);
      } catch (error) {
      }
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedExitTypeId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await APIEmployees.deleteExitType(selectedExitTypeId);
      setExitTypes(exitTypes.filter(et => et.id !== selectedExitTypeId) || []);
      setShowDeleteConfirmation(false);
    } catch (error) {

    }
  };

  const handleSubmit = async () => {
    const exitData = {
      exit_name: document.getElementById('exitType').value
    };

    try {
      const newExit = await APIEmployees.createExitType(exitData);
      const formattedExit = { ...newExit.exit, created_at: newExit.exit.created_at.split('T')[0], UpdatedAt: newExit.exit.UpdatedAt.split('T')[0] };
      setExitTypes([...exitTypes, formattedExit] || []);
      document.getElementById('exitType').value = '';
    } catch (error) {

    }
  };

  return (
    <div className="mx-5 max-w-6xl ml-auto mr-auto">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-1/3 px-3 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
              <h5 className="text-lg font-semibold text-gray-700">Add New Exit Type</h5>
            </div>
            <form>
              <div className="p-4">
                <label htmlFor="exitType" className="block text-sm font-medium text-gray-700">Exit Type *</label>
                <input type="text" className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" id="exitType" placeholder="Exit Type" />
              </div>
            </form>
            <button type="button" onClick={handleSubmit} className="bg-indigo-600 text-white ml-4 mb-4 px-4 py-2 rounded-md hover:bg-indigo-700">Save</button>
          </div>
        </div>

        <div className="w-full lg:w-2/3 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
              <h5 className="text-lg font-semibold text-gray-700">List All Exit Types</h5>
            </div>
            <div className="flex justify-between px-3 mt-3">
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
            <div className="overflow-x-auto mb-4 px-3">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EXIT TYPE</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CREATED AT</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-sm text-gray-500">Loading exit types data...</td>
                    </tr>
                  ) : paginatedExitTypes.length > 0 ? (
                    paginatedExitTypes.map((exitType, index) => (
                      <tr 
                        key={exitType.id} 
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className="relative"
                      >
                        <td className="border px-4 py-2 relative text-sm text-gray-900">
                          {exitType.exit_name}
                          {hoveredRow === index && (
                            <div className="absolute right-0 top-0 mr-3 mt-1 flex items-center">
                              <button className="p-1 mr-2 text-blue-600 hover:text-blue-800" onClick={() => handleEditClick(exitType)}>
                                <PencilAltIcon className="h-5 w-5" />
                              </button>
                              <button className="p-1 text-red-600 hover:text-red-800" onClick={() => handleDeleteClick(exitType.id)}>
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="border px-4 py-2 text-sm text-gray-900">{exitType.created_at}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-sm text-gray-500">No exit types data available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
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
        </div>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="my-modal">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg font-semibold">Edit Exit Type Information</h4>
              <button onClick={() => setIsEditModalOpen(false)} className="text-black">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <p className="mb-5">We need below required information to update this record.</p>
            <form>
              <div className="mb-5">
                <label htmlFor="editExitType" className="block text-sm font-medium text-gray-700 mb-2">Exit Type *</label>
                <input type="text" value={currentEdit.exit_name} onChange={(e) => setCurrentEdit({...currentEdit, exit_name: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" id="editExitType" />
              </div>
              <div className="flex items-center justify-end space-x-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                  Close
                </button>
                <button type="button" onClick={handleUpdate} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Update
                </button>
              </div>
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
                <button id="delete-close" className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-24 mr-2" onClick={() => setShowDeleteConfirmation(false)}>Close</button>
                <button id="delete-confirm" className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-24" onClick={handleConfirmDelete}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExitType;
