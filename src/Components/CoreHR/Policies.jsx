import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { APICoreHR } from '@/Apis/APICoreHR';

const Policies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});
  const [policies, setPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);
  const [policyTitle, setPolicyTitle] = useState('');
  const [policyDescription, setPolicyDescription] = useState('');

  useEffect(() => {
    const fetchPolicies = async () => {
      setIsLoading(true);
      try {
        const data = await APICoreHR.getAllPolicies();
        setPolicies(data.policies || []);
      } catch (error) {

      }
      setIsLoading(false);
    };
    fetchPolicies();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const policyData = {
      title: event.target.policyTitle.value,
      description: event.target.designationDescription.value,
    };
    try {
      await APICoreHR.createPolicy(policyData);
      setPolicyTitle('');
      setPolicyDescription('');
      const updatedPolicies = await APICoreHR.getAllPolicies();
      setPolicies(updatedPolicies.policies || []);
    } catch (error) {

    }
    setIsLoading(false);
  };

  const handleEditClick = (policy) => {
    setCurrentEdit(policy);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (policy) => {
    setSelectedPolicyId(policy.id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    if (selectedPolicyId) {
      try {
        await APICoreHR.deletePolicyById(selectedPolicyId);
        const updatedPolicies = await APICoreHR.getAllPolicies();
        setPolicies(updatedPolicies.policies || []);
        setShowDeleteConfirmation(false);
      } catch (error) {

      }
    }
    setIsLoading(false);
  };

  const handleUpdatePolicy = async (event) => {
    event.preventDefault();
    const updatedPolicyData = {
      title: currentEdit.title,
      description: currentEdit.description,
    };
    try {
      await APICoreHR.updatePolicyById(currentEdit.id, updatedPolicyData);
      setIsEditModalOpen(false);
      const updatedPolicies = await APICoreHR.getAllPolicies();
      setPolicies(updatedPolicies.policies || []);
    } catch (error) {

    }
  };

  return (
    <div className="max-w-6xl ml-auto mr-auto">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-1/4 px-3 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
              <h5 className="text-lg font-semibold text-gray-700">Add New Policy</h5>
            </div>
            <form className="p-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="policyTitle" className="block text-sm font-medium text-gray-700">Title *</label>
                <input type="text" name="policyTitle" id="policyTitle" value={policyTitle} onChange={(e) => setPolicyTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Title" required />
              </div>
              <div className="mb-3">
                <label htmlFor="designationDescription" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="designationDescription" id="designationDescription" value={policyDescription} onChange={(e) => setPolicyDescription(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Description"></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="policyAttachment" className="block text-sm font-medium text-gray-700">Attachment *</label>
                <input type="file" id="policyAttachment" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" disabled />
                <p className="text-xs text-gray-500 mt-1">Upload files only: gif, png, jpg, jpeg</p>
              </div>
              <button type="submit" className="bg-indigo-600 text-white mb-4 px-4 py-2 rounded-md hover:bg-indigo-700">Save</button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-2/3 px-3 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
              <h5 className="text-lg font-semibold text-gray-700">List All Policies</h5>
            </div>
            <div className="flex justify-between px-3 mt-3">
              <label className="flex items-center">
                Show
                <select className="mx-2 rounded border border-gray-300">
                  <option value="10">10</option>
                </select>
                entries
              </label>
              <div className="flex justify-end">
                <input 
                  type="search" 
                  placeholder="Search" 
                  className="rounded border border-gray-300 p-2" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto mb-4 px-3">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TITLE</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CREATED AT</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ADDED BY</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-sm text-gray-500">Loading policies data...</td>
                    </tr>
                  ) : policies.length > 0 ? (
                    policies.map((policy) => (
                      <tr 
                        key={policy.id} 
                        onMouseEnter={() => setHoveredRow(policy.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`relative ${hoveredRow === policy.id ? 'bg-gray-100' : 'bg-white'}`}
                      >
                        <td className="border px-4 py-2 flex justify-between items-center">
                          {policy.title}
                          <div className={`flex items-center transition-opacity duration-300 ${hoveredRow === policy.id ? 'opacity-100' : 'opacity-0'}`}>
                            <button className="p-1 mr-2 text-blue-600 hover:text-blue-800" onClick={() => handleEditClick(policy)}>
                              <PencilAltIcon className="h-5 w-5" />
                            </button>
                            <button className="p-1 text-red-600 hover:text-red-800" onClick={() => handleDeleteClick(policy)}>
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                        <td className="border px-4 py-2">{policy.created_at.split('T')[0]}</td>
                        <td className="border px-4 py-2">{policy.created_by_admin_username}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-sm text-gray-500">
                        No policies data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="text-gray-500 text-sm p-3 flex justify-between items-center">
              Showing 1 to {policies.length} of {policies.length} records
              <div>
                <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none">
                  Previous
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none ml-2">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="edit-policy-modal">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg font-semibold">Edit Policy Information</h4>
              <button onClick={() => setIsEditModalOpen(false)} className="text-black">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleUpdatePolicy}>
              <div className="mb-3">
                <label htmlFor="editPolicyTitle" className="block text-sm font-medium text-gray-700">Title *</label>
                <input type="text" id="editPolicyTitle" value={currentEdit.title} onChange={(e) => setCurrentEdit({ ...currentEdit, title: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
              </div>
              <div className="mb-3">
                <label htmlFor="editPolicyDescription" className="block text-sm font-medium text-gray-700">Description *</label>
                <textarea id="editPolicyDescription" value={currentEdit.description || 'no comment'} onChange={(e) => setCurrentEdit({ ...currentEdit, description: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="policyAttachment" className="block text-sm font-medium text-gray-700">Attachment</label>
                <input type="file" id="policyAttachment" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" disabled />
                <p className="text-xs text-gray-500 mt-1">Upload files only: gif, png, jpg, jpeg</p>
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

export default Policies;
