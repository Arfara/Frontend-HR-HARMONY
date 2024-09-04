import React, { useState, useEffect, Fragment } from 'react';
import { TrashIcon, PencilAltIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { APILeaveRequest } from '@/Apis/APILeaveRequest';
import Pagination from '../Pagination/Pagination';
import { getPaginatedData } from '../Pagination/Pagination';

const LeaveType = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newLeaveType, setNewLeaveType] = useState('');
  const [daysPerYear, setDaysPerYear] = useState('');
  const [requiresApproval, setRequiresApproval] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [currentEdit, setCurrentEdit] = useState(null);
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

  const paginatedLeaveTypes = getPaginatedData(leaveTypes, currentPage, per_page);
  
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      setIsLoading(true);
      try {
        const params = { page: currentPage, per_page: per_page, searching: searchQuery };
        const response = await APILeaveRequest.getAllLeaveRequestTypes(params);
        setLeaveTypes(response.leave_request_types || []);
        setTotalCount(response.pagination.total_count || 0);
        setCurrentPage(response.pagination.page || 1);
        setPerPage(response.pagination.per_page || 10);
      } catch (error) {
      }
      setIsLoading(false);
    };

    fetchLeaveTypes();
  }, [currentPage, per_page, searchQuery]);

  const handleEditClick = (leaveType) => {
    setCurrentEdit({
      id: leaveType.id,
      leave_type: leaveType.leave_type,
      days_per_years: leaveType.days_per_years,
      is_requires_approval: leaveType.is_requires_approval ? '1' : '0'
    });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'leaveType') setNewLeaveType(value);
    else if (name === 'daysPerYear') setDaysPerYear(value);
    else if (name === 'requiresApproval') setRequiresApproval(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const LeaveTypeData = {
      leave_type: newLeaveType,
      days_per_years: parseInt(daysPerYear),
      is_requires_approval: requiresApproval === '1' ? true : false
    }

    try {
      const response = await APILeaveRequest.createLeaveRequestType(LeaveTypeData);
      setNewLeaveType('');
      setDaysPerYear('');
      setRequiresApproval('');
    } catch (error) {

    }
  };

  const handleDeleteClick = (id) => {
    setSelectedSkillId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await APILeaveRequest.deleteLeaveRequestTypeById(selectedSkillId);
      setShowDeleteConfirmation(false);
    } catch (error) {

    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      leave_type: currentEdit.leave_type,
      days_per_years: parseInt(currentEdit.days_per_years),
      is_requires_approval: currentEdit.is_requires_approval === '1' ? true : false
    };

    try {
      const response = await APILeaveRequest.updateLeaveRequestTypeById(currentEdit.id, updatedData);
      setIsEditModalOpen(false);
    } catch (error) {

    }
  };

  return (
    <div className="flex justify-between mx-10 my-10">
      <div className="w-1/3">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-blue-500 text-lg font-semibold mb-6">Add New Leave Type</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-4 text-gray-700">
              Leave Type
              <input type="text" name="leaveType" placeholder="Leave Type" className="w-full py-2 px-4 mt-2 border border-gray-300 rounded-md" value={newLeaveType} onChange={handleInputChange} />
            </label>
            <label className="block mb-4 text-gray-700">
              Days Per Year
              <input type="number" name="daysPerYear" placeholder="Days Per Year" className="w-full py-2 px-4 mt-2 border border-gray-300 rounded-md" value={daysPerYear} onChange={handleInputChange} />
            </label>
            <label className="block mb-4 text-gray-700">
              Requires Approval
              <select name="requiresApproval" className="w-full py-2 px-4 mt-2 border border-gray-300 rounded-md" value={requiresApproval} onChange={handleInputChange}>
                <option value="" disabled>Select Requires Approval</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </label>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Leave Type</button>
          </form>
        </div>
      </div>
      <div className="w-2/3 ml-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-blue-500 text-lg font-semibold mb-6">List All Leave Types</h2>
          <div className="flex justify-between mb-6">
            <div className="flex items-center">
              <span>Show</span>
              <select value={per_page} onChange={(e) => handlePerPageChange(Number(e.target.value))}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span>entries</span>
            </div>
            <div className="search-box">
            <input type="text" className="px-2 py-1 border border-gray-300 rounded-md" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Per Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requires Approval</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-sm text-gray-500">Loading leave types data...</td>
                </tr>
              ) : paginatedLeaveTypes.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-sm text-gray-500">No leave types data available.</td>
                </tr>
              ) : (
                paginatedLeaveTypes.map((leaveType) => (
                  <tr key={leaveType.id} className="group hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex justify-between">
                        <div>{leaveType.leave_type}</div>
                        <div className="flex-shrink-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="p-1 ml-10 text-blue-600 hover:text-blue-800 focus:outline-none" onClick={() => handleEditClick(leaveType)}>
                            <PencilAltIcon className="h-5 w-5" />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-800 focus:outline-none" onClick={() => handleDeleteClick(leaveType.id)}>
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leaveType.days_per_years}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leaveType.is_requires_approval ? 'Yes' : 'No'}</td>
                  </tr>
                ))
              )}
              </tbody>
            </table>
          </div>
          <div className="text-gray-500 text-sm px-4 my-2 flex justify-between items-center">
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
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="edit-leave-type-modal">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg font-semibold">Edit Leave Type Information</h4>
              <button onClick={() => setIsEditModalOpen(false)} className="text-black">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="block mb-4 text-gray-700">
                  Leave Type
                  <input type="text" name="leaveType" placeholder="Adaptability Skills" className="w-full py-2 px-4 mt-2 border border-gray-300 rounded-md" value={currentEdit?.leave_type} onChange={(e) => setCurrentEdit({ ...currentEdit, leave_type: e.target.value })} />
                </label>
              </div>
              <div className="mb-3">
                <label className="block mb-4 text-gray-700">
                  Days Per Year
                  <input type="number" name="daysPerYear" placeholder="Days Per Year" className="w-full py-2 px-4 mt-2 border border-gray-300 rounded-md" value={currentEdit?.days_per_years} onChange={(e) => setCurrentEdit({ ...currentEdit, days_per_years: e.target.value })} />
                </label>
              </div>
              <div className="mb-3">
                <label className="block mb-4 text-gray-700">
                  Requires Approval
                  <select name="requiresApproval" className="w-full py-2 px-4 mt-2 border border-gray-300 rounded-md" value={currentEdit?.is_requires_approval} onChange={(e) => setCurrentEdit({ ...currentEdit, is_requires_approval: e.target.value })}>
                    <option value="" disabled>Select Requires Approval</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </label>
              </div>
              <div className="flex justify-end mt-4">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-700">Close</button>
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteConfirmation && (
        <Transition appear show={showDeleteConfirmation} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowDeleteConfirmation(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                      <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Delete Leave Type
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this leave type? This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      onClick={handleConfirmDelete}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:col-start-1 sm:text-sm"
                      onClick={() => setShowDeleteConfirmation(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      )}
    </div>
  )
}

export default LeaveType;
