import React, { useState, useEffect } from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { APIEmployees } from '@/Apis/APIEmployees';
import Pagination from '../Pagination';
import { getPaginatedData } from '@/Models/PaginationModel';

const RolesPrivileges = () => {
  const [showAddRole, setShowAddRole] = useState(false);
  const [selectedRoleData, setSelectedRoleData] = useState(null);
  const [hoveredRoleId, setHoveredRoleId] = useState(null);
  const [popupMode, setPopupMode] = useState(null);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const totalPages = Math.ceil(roles.length / perPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedRoles = getPaginatedData(roles, currentPage, perPage);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const response = await APIEmployees.getRoles();
      setRoles(response.roles.map(role => ({
        ...role,
        roleName: role.role_name,
        createdAt: role.created_at.split('T')[0],
        updatedAt: role.UpdatedAt.split('T')[0],
      })));
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewRoleClick = async () => {
    setPopupMode('add');
    setShowAddRole(true);
    setSelectedRoleData(null);
  };

  const handleEditClick = async (roleData) => {
    setPopupMode('edit');
    setSelectedRoleData(roleData);
    setShowAddRole(true);
  };

  const handleCloseEditPopup = () => {
    setShowAddRole(false);
    setSelectedRoleData(null);
  };

  const handleShowDeleteConfirmation = (roleId) => {
    setSelectedRoleId(roleId);
    setShowDeleteConfirmation(true);
  };

  const handleHideDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDelete = async (roleId) => {
    try {
      await APIEmployees.deleteRole(roleId);
      fetchRoles();
      setShowDeleteConfirmation(false);
    } catch (error) {

    }
  };

  const handleMouseEnter = (roleId) => {
    setHoveredRoleId(roleId);
  };

  const handleMouseLeave = () => {
    setHoveredRoleId(null);
  };

  return (
    <div className="border border-gray-200 rounded overflow-hidden mb-4 max-w-6xl ml-auto mr-auto">
      {showAddRole && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center" id="my-modal">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {popupMode === 'edit' ? 'Edit' : 'Add'} Staff Role Information
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  We need below required information to {popupMode === 'edit' ? 'update' : 'add'} this record.
                </p>
                <form className="w-full max-w-xl pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roleName">
                      Role Name *
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="roleName"
                      type="text"
                      placeholder="Role Name"
                      value={selectedRoleData?.roleName || ''}
                      onChange={(e) => setSelectedRoleData({ ...selectedRoleData, roleName: e.target.value })}
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center justify-end px-4 py-3 border-t border-gray-300">
                <button
                  id="cancel-btn"
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded-l focus:outline-none hover:bg-gray-700 mr-2"
                  onClick={() => setShowAddRole(false)}
                >
                  Close
                </button>
                <button
                  id="ok-btn"
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded-r focus:outline-none hover:bg-green-700"
                  onClick={popupMode === 'edit' ? async () => {
                    try {
                      const payload = {
                        role_name: selectedRoleData.roleName
                      };
                      await APIEmployees.editRole(selectedRoleData.id, payload);
                      fetchRoles();
                      setShowAddRole(false);
                    } catch (error) {

                    }
                  } : async () => {
                    try {
                      const payload = {
                        role_name: selectedRoleData.roleName
                      };
                      await APIEmployees.createRole(payload);
                      fetchRoles(); 
                      setShowAddRole(false); 
                    } catch (error) {

                    }
                  }}
                >
                  {popupMode === 'edit' ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">List All Roles</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleAddNewRoleClick}>Add New</button>
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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROLE NAME</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CREATED DATE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UPDATED DATE</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-sm text-gray-500">Loading roles data...</td>
                </tr>
              ) : paginatedRoles.map((role) => (
                <tr key={role.id}
                    onMouseEnter={() => handleMouseEnter(role.id)}
                    onMouseLeave={handleMouseLeave}
                    className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-900">{role.roleName}</span>
                      <div className="flex-shrink-0 flex items-center">
                        <button className="p-1 text-blue-600 hover:text-blue-800 focus:outline-none mr-3" style={{ visibility: hoveredRoleId === role.id ? 'visible' : 'hidden' }} onClick={() => handleEditClick(role)}>
                          <PencilAltIcon className="h-5 w-5" />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-800 focus:outline-none" style={{ visibility: hoveredRoleId === role.id ? 'visible' : 'hidden' }} onClick={() => handleShowDeleteConfirmation(role.id)}>
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{role.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{role.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-gray-500 text-sm my-4 flex justify-between items-center">
        <span>Showing {((currentPage - 1) * perPage) + 1} to {Math.min(currentPage * perPage, roles.length)} of {roles.length} records</span>
          <div className="flex justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center" id="my-modal">
          <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Are you sure you want to delete this record?</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">You won't be able to revert this!</p>
              </div>
              <div className="items-center px-4 py-3">
                <button id="delete-close" className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-24 mr-2" onClick={handleHideDeleteConfirmation}>Close</button>
                <button id="delete-confirm" className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-24" onClick={() => handleDelete(selectedRoleId)}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPrivileges;
