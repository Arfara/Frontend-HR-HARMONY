import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { APITraining } from '@/Apis/APITraining';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Pagination from '../Pagination/Pagination';
import { getPaginatedData } from '../Pagination/Pagination';

const Trainers = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [expertise, setExpertise] = useState('');
  const [address, setAddress] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteTrainerId, setDeleteTrainerId] = useState(null);
  const [editingTrainerId, setEditingTrainerId] = useState(null);
  const [editingTrainerData, setEditingTrainerData] = useState({});
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

  const paginatedTrainers = getPaginatedData(trainers, currentPage, per_page);

  const fetchTrainers = async () => {
    setIsLoading(true);
    try {
      const params = { page: currentPage, per_page: per_page, search: searchQuery };
      const response = await APITraining.viewAllTrainers(params);
      setTrainers(response.data || []);
      setTotalCount(response.pagination.total_count || 0);
      setCurrentPage(response.pagination.page || 1);
      setPerPage(response.pagination.per_page || 10);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, [currentPage, per_page, searchQuery]);

  const handleEditClick = (trainer) => {
    setEditingTrainerId(trainer.id);
    setEditingTrainerData({
      firstName: trainer.first_name,
      lastName: trainer.last_name,
      contactNumber: trainer.contact_number,
      email: trainer.email,
      expertise: trainer.expertise,
      address: trainer.address
    });
    setIsEditModalOpen(true);
  };

  const handleAddNewClick = () => {
    setShowAddForm(true);
  };

  const handleReset = () => {
    setShowAddForm(false);
    setFirstName('');
    setLastName('');
    setContactNumber('');
    setEmail('');
    setExpertise('');
    setAddress('');
  };

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleContactNumberChange = (e) => setContactNumber(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleExpertiseChange = (e) => setExpertise(e.target.value);
  const handleAddressChange = (value) => setAddress(value);

  const handleSubmit = async () => {
    setIsLoading(true);
    const trainerData = {
      first_name: firstName,
      last_name: lastName,
      contact_number: contactNumber,
      email: email,
      expertise: expertise,
      address: address
    };

    try {
      const response = await APITraining.createTrainer(trainerData);
      handleReset();
    } catch (error) {

    }
    setIsLoading(false);
    fetchTrainers();
  };

  const handleDeleteClick = (id) => {
    setShowDeleteConfirmation(true);
    setDeleteTrainerId(id);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      await APITraining.deleteTrainerById(deleteTrainerId);
      fetchTrainers();
      setShowDeleteConfirmation(false);
    } catch (error) {

    }
    setIsLoading(false);
  };

  const handleUpdateTrainer = async (e) => {
    e.preventDefault();
    const updatedTrainerData = {
      first_name: editingTrainerData.firstName,
      last_name: editingTrainerData.lastName,
      contact_number: editingTrainerData.contactNumber,
      email: editingTrainerData.email,
      expertise: editingTrainerData.expertise,
      address: editingTrainerData.address
    };

    try {
      const response = await APITraining.updateTrainerById(editingTrainerId, updatedTrainerData);
      setIsEditModalOpen(false);
      fetchTrainers();
    } catch (error) {

    }
  };

  return (
    <div className="border border-gray-200 rounded overflow-hidden mb-4 max-w-6xl ml-auto mr-auto">
        {showAddForm && (
        <div className="bg-white shadow-md rounded-lg mb-4">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-700">Add New Trainer</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={() => setShowAddForm(false)}>Hide</button>
          </div>
          <div className="px-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="mb-4 md:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstname" name="firstname" type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange}/>
                </div>
                <div className="mb-4 md:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" name="lastname" type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange}/>
                </div>
                <div className="mb-4 md:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expertise">
                    Expertise
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="expertise" name="expertise" type="text" placeholder="Expertise" value={expertise} onChange={handleExpertiseChange}/>
                </div>
                <div className="mb-4 md:col-span-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
                    Contact Number
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contactnumber" name="contactnumber" type="text" placeholder="Contact Number" value={contactNumber} onChange={handleContactNumberChange}/>
                </div>
                <div className="mb-4 md:col-span-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="text" placeholder="email" value={email} onChange={handleEmailChange}/>
                </div>
              <div className="mb-4 md:col-span-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <ReactQuill theme="snow" value={address} onChange={handleAddressChange} />
              </div>
            </div>
            <div className="flex justify-end bg-gray-200 px-4 py-3">
              <button type="button" onClick={handleReset} className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2 focus:outline-none">Reset</button>
              <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Save</button>
            </div>
          </div>
        </div>
        )}
        <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">List All Trainers</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"onClick={handleAddNewClick}>Add New</button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added by</th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-sm text-gray-500">Loading trainers data...</td>
                </tr>
              ) : paginatedTrainers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-sm text-gray-500">No trainers data available.</td>
                </tr>
              ) : (
                paginatedTrainers.map(trainer => (
                  <tr className="group hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex justify-between">
                        <span>{trainer.full_name}</span>
                        <div className="flex-shrink-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="p-1 text-blue-600 hover:text-red-800 focus:outline-none" onClick={() => handleEditClick(trainer)}>
                            <PencilAltIcon className="h-5 w-5" />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-800 focus:outline-none" onClick={() => handleDeleteClick(trainer.id)}>
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.contact_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainer.expertise}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(trainer.created_at).toLocaleDateString()}</td>
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
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="edit-training-session-modal">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-4xl">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg font-semibold">Edit Trainer Information</h4>
              <button onClick={() => setIsEditModalOpen(false)} className="text-black">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleUpdateTrainer} className="grid grid-cols-3 gap-4">
              <div className="mb-4 md:col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" name="firstName" type="text" placeholder="First Name" value={editingTrainerData.firstName} onChange={(e) => setEditingTrainerData({...editingTrainerData, firstName: e.target.value})}/>
              </div>
              <div className="mb-4 md:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" name="lastname" type="text" placeholder="Last Name" value={editingTrainerData.lastName} onChange={(e) => setEditingTrainerData({...editingTrainerData, lastName: e.target.value})}/>
              </div>
              <div className="mb-4 md:col-span-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expertise">
                  Expertise
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="expertise" name="expertise" type="text" placeholder="Expertise" value={editingTrainerData.expertise} onChange={(e) => setEditingTrainerData({...editingTrainerData, expertise: e.target.value})}/>
              </div>
              <div className="mb-4 md:col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
                  Contact Number
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contactnumber" name="contactnumber" type="text" placeholder="Contact Number" value={editingTrainerData.contactNumber} onChange={(e) => setEditingTrainerData({...editingTrainerData, contactNumber: e.target.value})}/>
              </div>
              <div className="mb-4 md:col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="text" placeholder="email" value={editingTrainerData.email} onChange={(e) => setEditingTrainerData({...editingTrainerData, email: e.target.value})}/>
              </div>
              <div className="mb-4 md:col-span-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <ReactQuill theme="snow" value={editingTrainerData.address} onChange={(value) => setEditingTrainerData({...editingTrainerData, address: value})} />
              </div>
              <div className="flex justify-end mt-4 md:col-span-3">
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
                                            Delete Trainer
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this trainer? This action cannot be undone.
                                            </p>
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

export default Trainers