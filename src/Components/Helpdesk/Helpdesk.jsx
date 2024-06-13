import React, { useState, useEffect, Fragment } from 'react';
import Header from '../Header/Header';
import { ArrowCircleRightIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { APIHelpdesk } from '@/Apis/APIHelpdesk';
import { APIEmployees } from '@/Apis/APIEmployees';
import { APICoreHR } from '@/Apis/APICoreHR';
import { Transition, Dialog } from '@headlessui/react';

const Helpdesk = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [ticketStatusData, setTicketStatusData] = useState({});
  const [ticketPriorityData, setTicketPriorityData] = useState({});
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteTicketId, setDeleteTicketId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [description, setDescription] = useState('');

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const response = await APIHelpdesk.viewAllHelpdesks();
      setTickets(response.helpdesks || []);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchHelpdeskProgress = async () => {
    try {
      const response = await APIHelpdesk.fetchHelpdeskProgress();
      if (response.code === 200 && !response.error) {
        setTicketStatusData(response.ticket_status);
        setTicketPriorityData(response.ticket_priority);
      }
    } catch (error) {
      console.error('Failed to fetch helpdesk progress:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const employeesData = await APIEmployees.getAllEmployeesNonPagination();
      setEmployees(employeesData.employees || []);
    } catch (error) {

    }
  };

  const fetchDepartments = async () => {
    try {
      const departmentsData = await APICoreHR.getAllDepartmentsNonPagination();
      setDepartments(departmentsData.departments || []);
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchTickets();
    fetchHelpdeskProgress();
    fetchEmployees();
    fetchDepartments();
  }, []);

  const handleAddTicketClick = () => {
    setShowAddForm(true);
  };

  const handleCancelClick = () => {
    setShowAddForm(false);
    setSelectedPriority('');
    setSelectedDepartment('');
    setSelectedEmployee('');
    setDescription('');
  };

  const handleViewDetailsClick = (id) => {
    navigate(`/helpdesk/ticket-details/${id}`);
  };

  
  const handleEditTicketClick = (ticketId) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      setSelectedTicketId(ticketId);
      setDescription(ticket.subject);
      setSelectedPriority(ticket.priority);
      setShowEditPopup(true);
    }
  };

  const handleCancelEditClick = () => {
    setSelectedTicketId(null);
    setShowEditPopup(false);
  };

  const handleUpdateTicketClick = async (e) => {
    e.preventDefault();
    const updatedData = {
      subject: description,
      priority: selectedPriority,
      status: selectedStatus
    };

    try {
      const response = await APIHelpdesk.updateHelpdeskById(selectedTicketId, updatedData);
      fetchTickets();
      setShowEditPopup(false);
    } catch (error) {

    }
  };

  const handleSaveTicket = async (e) => {
    e.preventDefault();
    const ticketData = {
      subject: e.target.title.value,
      priority: selectedPriority,
      department_id: parseInt(selectedDepartment),
      employee_id: parseInt(selectedEmployee),
      description: description
    };

    try {
      const response = await APIHelpdesk.createHelpdesk(ticketData);
      fetchTickets();
      handleCancelClick();
    } catch (error) {

    }
  };
  
  useEffect(() => {
    const calculateChartData = () => {
      const statusData = {};
      tickets.forEach(ticket => {
        statusData[ticket.status] = statusData[ticket.status] ? statusData[ticket.status] + 1 : 1;
      });
      setTicketStatusData(statusData);

      const priorityData = {};
      tickets.forEach(ticket => {
        priorityData[ticket.priority] = priorityData[ticket.priority] ? priorityData[ticket.priority] + 1 : 1;
      });
      setTicketPriorityData(priorityData);
    };
    
    calculateChartData();
  }, [tickets]);

  const statusChartOptions = {
    labels: Object.keys(ticketStatusData),
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
    legend: {
      show: true,
      position: 'right',
    },
  };

  const priorityChartOptions = {
    labels: Object.keys(ticketPriorityData),
    colors: ['#FF4560', '#FEB019', '#00E396', '#008FFB'],
    legend: {
      show: true,
      position: 'right',
    },
  };

  const handleConfirmDelete = async () => {
    try {
      await APIHelpdesk.deleteHelpdeskById(deleteTicketId);
      setShowDeleteConfirmation(false);
      fetchTickets();
    } catch (error) {

    }
  };

  const handleDeleteClick = (ticketId) => {
    setDeleteTicketId(ticketId);
    setShowDeleteConfirmation(true);
  }

  const handleHideDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  }

  return (
    <div>
      <Header/>
      <div className='w-full mx-auto p-5 bg-white'>
        <div className='shadow-md rounded-md p-5 flex justify-between items-center bg-white mb-7'>
          <h2 className='text-2xl'>Ticket List</h2>
          <button className='text-white bg-blue-600 border-blue-600 py-2 px-4 rounded text-lg leading-6 cursor-pointer hover:bg-blue-700 hover:border-blue-700' onClick={handleAddTicketClick}>+ Create Ticket</button>
        </div>

        {/* Add New Ticket */}
        {showAddForm && (
          <div className="bg-white shadow-md rounded-lg mb-4 w-full max-w-5xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-700">Create Ticket</h2>
            </div>

            <form className="px-4 py-2" onSubmit={handleSaveTicket}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Subject*
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                  Priority *
                  </label>
                  <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="priority"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  >
                  <option value="" disabled>Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                  Department *
                  </label>
                  <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="department"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                  <option value="" disabled> Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>{department.department_name}</option>
                  ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employee">
                  Employee *
                  </label>
                  <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="employee"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  >
                  <option value="" disabled>Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>
                  ))}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <ReactQuill theme="snow" value={description} onChange={setDescription} />
              </div>
              <div className="flex justify-end bg-gray-200 px-4 py-3">
                <button className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2 focus:outline-none" onClick={handleCancelClick}>Cancel</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Create</button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Ticket Popup */}
        {showEditPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Ticket Information</h2>
              <p className="mb-4">We need below required information to update this record.</p>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Subject</label>
                <input type="text" id="subject" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter subject" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="mb-4">
                <label htmlFor="priority" className="block text-gray-700 font-bold mb-2">Priority</label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="priority"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  >
                  <option value="" disabled>Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                  </select>
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                  <option value="" disabled>Status</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  </select>
              </div>
              <div className="flex justify-end">
                <button className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2 focus:outline-none" onClick={handleCancelEditClick}>Cancel</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleUpdateTicketClick}>Update</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Popup */}
        {showDeleteConfirmation && (
        <Transition appear show={showDeleteConfirmation} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={handleHideDeleteConfirmation}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>
            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Delete Job
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this job? This action cannot be undone.
                  </p>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={handleHideDeleteConfirmation}
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
        )}

        {/* Ticket list cards and charts */}
        <div className='flex flex-col-reverse md:flex-row justify-between'>
            <div className='w-full md:w-3/4 mb-4 md:mb-0 md:ml-4'>
                <div className=''>
                    {isLoading ? (
                      <span>Loading ticket data...</span>
                    ) : tickets.length > 0 ? (
                      tickets.map((ticket) => (
                        <div key={ticket.id} className='relative bg-white rounded-lg shadow-lg p-4 mb-4'>
                          <div className='flex justify-between items-center mb-4'>
                            <h3 className='text-lg font-bold text-gray-700'>{ticket.subject}</h3>
                            <span className='text-sm text-gray-500'>{new Date(ticket.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className='mb-4'>
                            <span className='text-sm font-bold text-gray-700'>Assigned to : </span>
                            <span className='text-sm text-gray-500'>{ticket.employee_full_name}</span>
                          </div>
                          <div className='mb-4'>
                            <span className='text-sm font-bold text-gray-700'>Priority : </span>
                            <span className={`text-sm font-bold ${ticket.priority === 'High' ? 'text-green-500' : 'text-red-500'}`}>{ticket.priority}</span>
                          </div>
                          <div className='mb-4'>
                            <span className='text-sm font-bold text-gray-700'>Status: </span>
                            <span className={`text-sm font-bold ${ticket.status == 'Open' ? 'text-green-500' : 'text-red-500'}`}>{ticket.status}</span>
                          </div>
                          <div className='absolute bottom-2 right-2 flex items-center space-x-2'>
                            <button className='text-blue-600 hover:text-blue-700' onClick={() => handleViewDetailsClick(ticket.id)}>
                              <ArrowCircleRightIcon className='h-5 w-5' />
                            </button>
                            <button className='text-blue-600 hover:text-blue-700' onClick={() => handleEditTicketClick(ticket.id)}>
                              <PencilAltIcon className='h-5 w-5' />
                            </button>
                            <button className='text-blue-600 hover:text-blue-700' onClick={() => handleDeleteClick(ticket.id)}>
                              <TrashIcon className='h-5 w-5' />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span>No request ticket data available.</span>
                    )}
                </div>
            </div>

            {/* Circular Charts */}
            <div className="w-full md:w-1/4 mb-4 md:mb-0 md:ml-4">
                {/* Ticket Status Chart */}
                <div className="bg-white rounded-md shadow-md p-4 mb-4">
                    <h3 className="text-lg font-bold mb-4">Ticket Status</h3>
                    <Chart options={statusChartOptions} series={Object.values(ticketStatusData)} type="donut" width="100%" />
                </div>
            
                {/* Ticket Priority Chart */}
                <div className="bg-white rounded-md shadow-md p-4 mb-4">
                    <h3 className="text-lg font-bold mb-4">Ticket Priority</h3>
                    <Chart options={priorityChartOptions} series={Object.values(ticketPriorityData)} type="donut" width="100%" />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Helpdesk;

