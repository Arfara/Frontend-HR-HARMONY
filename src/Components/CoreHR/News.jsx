import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PencilAltIcon, TrashIcon, ArrowCircleRightIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { APICoreHR } from '@/Apis/APICoreHR';
import Pagination from '../Pagination/Pagination';
import { getPaginatedData } from '../Pagination/Pagination';

const News = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    department_id: '',
    start_date: '',
    end_date: '',
    summary: '',
    description: '',
  });
  const [addData, setAddData] = useState({
    title: '',
    department_id: '',
    start_date: '',
    end_date: '',
    summary: '',
    description: '',
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [newsData, setNewsData] = useState([]);
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

  const paginatedNewsData = getPaginatedData(newsData, currentPage, per_page);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const params = { page: currentPage, per_page: per_page, search: searchQuery };
      const response = await APICoreHR.getAllAnnouncements(params);
      setNewsData(response.announcements || []);
      setTotalCount(response.pagination.total_count || 0);
      setCurrentPage(response.pagination.page || 1);
      setPerPage(response.pagination.per_page || 10);
      setIsLoading(false);
    } catch (error) {
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, per_page, searchQuery]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await APICoreHR.getAllDepartments();
        setDepartments(response.departments || []);
      } catch (error) {

      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditModalOpen) {
      setEditData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setAddData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddNewClick = () => {
    setShowAddForm(true);
  };

  const handleViewDetails = (item) => {
    navigate(`/corehr/announcement-view/${item.identifier}`);
  };

  const handleEdit = (item) => {
    setSelectedAnnouncementId(item.id);
    setEditData(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedAnnouncementId(item.id);
    setShowDeleteConfirmation(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditData({
      title: '',
      department_id: '',
      start_date: '',
      end_date: '',
      summary: '',
      description: '',
    });
  };

  const handleReset = () => {
    setAddData({
      title: '',
      department_id: '',
      start_date: '',
      end_date: '',
      summary: '',
      description: '',
    });
  };

  const handleSaveAnnouncement = async () => {
    const announcementData = {
      title: addData.title,
      department_id: parseInt(addData.department_id),
      start_date: addData.start_date,
      end_date: addData.end_date,
      summary: addData.summary,
      description: addData.description,
    };
    try {
      await APICoreHR.createAnnouncement(announcementData);
      setShowAddForm(false);
      setAddData({
        title: '',
        department_id: '',
        start_date: '',
        end_date: '',
        summary: '',
        description: '',
      });
      fetchData();
    } catch (error) {

    }
  };

  const handleConfirmDelete = async () => {
    if (selectedAnnouncementId) {
      try {
        await APICoreHR.deleteAnnouncement(selectedAnnouncementId);
        setShowDeleteConfirmation(false);
        fetchData();
      } catch (error) {

      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!selectedAnnouncementId) {
      return;
    }

    const updatedData = {
      ...editData,
      department_id: parseInt(editData.department_id, 10)
    };

    try {
      const response = await APICoreHR.updateAnnouncement(selectedAnnouncementId, updatedData);
      setIsEditModalOpen(false);
      fetchData();
    } catch (error) {

    }
  };

  return (
    <div className="border border-gray-200 rounded overflow-hidden max-w-6xl ml-auto mr-auto">
      {showAddForm && (
        <div className="bg-white shadow-md rounded-lg mb-4">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-700">Add New Announcement</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={() => setShowAddForm(false)}>Hide</button>
          </div>
          <div className="px-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="mb-4 md:col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title *
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Title" value={addData.title} onChange={handleChange} />
              </div>
              <div className="mb-4 md:col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                  Start Date *
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startDate" name="start_date" type="date" value={addData.start_date} onChange={handleChange} />
              </div>
              <div className="mb-4 md:col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                  End Date *
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endDate" name="end_date" type="date" value={addData.end_date} onChange={handleChange} />
              </div>
              <div className="mb-4 md:col-span-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                  Department
                </label>
                <div className="relative">
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="department" name="department_id" value={addData.department_id} onChange={handleChange}>
                    <option value="">Select Department</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.department_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="summary">
                  Summary *
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="summary" name="summary" type="text" placeholder="Summary" value={addData.summary} onChange={handleChange} />
              </div>
              <div className="mb-4 md:col-span-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <ReactQuill theme="snow" value={addData.description} onChange={(content) => setAddData({ ...addData, description: content })} />
              </div>
            </div>
            <div className="flex justify-end bg-gray-200 px-4 py-3">
              <button type="button" onClick={handleReset} className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2 focus:outline-none">Reset</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleSaveAnnouncement}>Save</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200 max-w-6xl ml-auto mr-auto">
        <h2 className="text-lg font-semibold text-gray-700">List All Announcements</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleAddNewClick}>Add New</button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-sm text-gray-500">
                    Loading news data...
                  </td>
                </tr>
              ) : paginatedNewsData.length > 0 ? (
                paginatedNewsData.map((item, index) => (
                  <tr key={item.id} 
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`relative ${hoveredRow === index ? 'bg-gray-100' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex justify-between items-center">
                      {item.title}
                      <div className={`flex items-center transition-opacity duration-300 ${hoveredRow === index ? 'opacity-100' : 'opacity-0'}`}>
                        <button className="p-1 mr-2 text-blue-600 hover:text-blue-800" onClick={() => handleViewDetails(item)}>
                          <ArrowCircleRightIcon className="h-5 w-5" />
                        </button>
                        <button className="p-1 mr-2 text-blue-600 hover:text-blue-800" onClick={() => handleEdit(item)}>
                          <PencilAltIcon className="h-5 w-5" />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-800" onClick={() => handleDelete(item)}>
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.department_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.start_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.end_date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-sm text-gray-500">
                    No news data available.
                  </td>
                </tr>
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
      {isEditModalOpen && editData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg font-semibold">Edit Announcement Information</h4>
              <button onClick={handleCloseModal} className="text-black">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <p className="mb-5">We need below required information to update this record.</p>
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title *
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Title" value={editData.title} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                      Start Date *
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startDate" name="start_date" type="date" value={editData.start_date} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                      End Date *
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endDate" name="end_date" type="date" value={editData.end_date} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                  Department
                </label>
                <select 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="department" 
                  name="department_id"
                  value={editData.department_id} 
                  onChange={handleChange}
                >
                  <option value="" disabled selected>Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.department_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="summary">
                  Summary *
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="summary" name="summary" type="text" placeholder="Summary" value={editData.summary} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <ReactQuill theme="snow" value={editData.description} onChange={(content) => setEditData({ ...editData, description: content })} />
              </div>
              <div className="flex items-center justify-end space-x-3 mt-4">
                <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                  Close
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg font-semibold">Confirm Delete</h4>
              <button onClick={() => setShowDeleteConfirmation(false)} className="text-black">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <p>Are you sure you want to delete this announcement?</p>
            <div className="flex items-center justify-end space-x-3 mt-4">
              <button type="button" onClick={() => setShowDeleteConfirmation(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                Cancel
              </button>
              <button type="button" onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;

