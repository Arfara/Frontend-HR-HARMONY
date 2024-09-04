import React, { useState, useEffect, Fragment } from 'react';
import { TrashIcon, ArrowCircleRightIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { APIEmployees } from '@/Apis/APIEmployees';
import { APICoreHR } from '@/Apis/APICoreHR';
import Pagination from '../Pagination/Pagination';
import { getPaginatedData } from '../Pagination/Pagination';
import { toast } from 'react-toastify';

const Employees = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [officeShifts, setOfficeShifts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [contactNumberError, setContactNumberError] = useState('');
  const [basicSalaryError, setBasicSalaryError] = useState('');
  const [hourlyRateError, setHourlyRateError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [addError, setAddError] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [total_count, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(total_count / per_page)) {
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleOpenUploadModal = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => setIsUploadModalOpen(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading...");

    try {
      await APIEmployees.uploadMultipleEmployees(selectedFile);
      toast.update(toastId, { render: "Upload successful!", type: "success", isLoading: false, autoClose: 5000 });
      handleCloseUploadModal();
      fetchEmployees();
    } catch (error) {
      toast.update(toastId, { render: "Failed to upload file.", type: "error", isLoading: false, autoClose: 5000 });
    } finally {
      setIsUploading(false);
    }
  };

  const paginatedEmployees = getPaginatedData(employees, currentPage, per_page);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const params = { page: currentPage, per_page: per_page, searching: searchQuery };
      const response = await APIEmployees.getAllEmployees(params);
      setEmployees(response.employees || []);
      setTotalCount(response.pagination.total_count || 0);
      setCurrentPage(response.pagination.page || 1);
      setPerPage(response.pagination.per_page || 10);
      setIsLoading(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, per_page, searchQuery]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await APIEmployees.getRolesNonPagination();
        setRoles(response.roles || []);
      } catch (error) {
      }
    };

    const fetchOfficeShifts = async () => {
      try {
        const response = await APIEmployees.getOfficeShiftsNonPagination();
        setOfficeShifts(response.shifts || []);
      } catch (error) {
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await APICoreHR.getAllDepartmentsNonPagination();
        setDepartments(response.departments || []);
      } catch (error) {
      }
    };

    const fetchDesignations = async () => {
      try {
        const response = await APICoreHR.getAllDesignationsNonPagination();
        setDesignations(response.designations || []);
      } catch (error) {
      }
    };  

    fetchRoles();
    fetchOfficeShifts();
    fetchDepartments();
    fetchDesignations();
  }, []);

  const handleAddNewClick = () => {
    setShowAddForm(true);
  };  

  const handleHideClick = () => {
    setShowAddForm(false);
  };

  const handleReset = () => {
    setShowAddForm(false);
  };

  const handleShowDeleteConfirmation = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setShowDeleteConfirmation(true);
  };

  const handleHideDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDelete = async () => {
    if (selectedEmployeeId) {
      try {
        await APIEmployees.deleteEmployee(selectedEmployeeId);
        fetchEmployees();
        handleHideDeleteConfirmation();
      } catch (error) {
      }
    }
  };

  const handleCreateEmployee = async () => {
    const employeeDetails = {
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value,
      contact_number: document.getElementById('contact_number').value,
      gender: document.getElementById('gender').value,
      email: document.getElementById('email').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      shift_id: parseInt(document.getElementById('office_shift').value, 10),
      role_id: parseInt(document.getElementById('role').value, 10),
      department_id: parseInt(document.getElementById('department').value, 10),
      designation_id: parseInt(document.getElementById('designation').value, 10),
      basic_salary: parseInt(document.getElementById('basic_salary').value, 10),
      hourly_rate: parseInt(document.getElementById('hourly_rate').value, 10),
      pay_slip_type: document.getElementById('payslip_type').value,
    };

    const isDuplicate = employees.some(employee => 
      employee.contact_number === employeeDetails.contact_number || 
      employee.email === employeeDetails.email || 
      employee.username === employeeDetails.username
    );

    if (isDuplicate) {
      setAddError('Contact Number, Email, or Username already exists. Please use a different one.');
      return;
    }

    try {
      const response = await APIEmployees.createEmployee(employeeDetails);
      fetchEmployees();
      setShowAddForm(false);
      setAddError('');
    } catch (error) {
      setAddError('Failed to add an employee. Please try again.');
    }
  };

  const handleViewDetails = async (employee) => {
    try {
      const employeeDetails = await APIEmployees.getEmployeeById(employee.id);
      navigate(`/employee-details/${employee.id}`, { state: { employeeDetails } });
    } catch (error) {
    }
  };

  const validateContactNumber = (value) => {
    if (isNaN(value)) {
      setContactNumberError('Contact Number must be a number');
    } else {
      setContactNumberError('');
    }
  };

  const validateBasicSalary = (value) => {
    if (isNaN(value)) {
      setBasicSalaryError('Basic Salary must be a number');
    } else {
      setBasicSalaryError('');
    }
  };

  const validateHourlyRate = (value) => {
    if (isNaN(value)) {
      setHourlyRateError('Hourly Rate must be a number');
    } else {
      setHourlyRateError('');
    }
  };

  const validateEmail = (value) => {
    if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validateUsername = (value) => {
    if (value.length <= 5) {
      setUsernameError('Username must be more than 5 characters');
    } else {
      setUsernameError('');
    }
  };

  const validatePassword = (value) => {
    if (value.length <= 5) {
      setPasswordError('Password must be more than 5 characters');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className="border border-gray-200 rounded overflow-hidden mb-4 max-w-6xl ml-auto mr-auto">
      {showAddForm && (
        <div className="bg-white shadow-md rounded-lg mb-4 w-full">
          <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">Add New Employee</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none" onClick={handleHideClick}>Hide</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-4 py-2">
            <div className="mb-4 md:col-span-1 lg:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                First Name *
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="first_name" type="text" placeholder="First Name" />
            </div>
            <div className="mb-4 md:col-span-1 lg:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                Last Name *
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last_name" type="text" placeholder="Last Name" />
            </div>
            <div className="mb-4 md:col-span-2 lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_number">
                    Contact Number *
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contact_number" type="text" placeholder="Contact Number" onChange={(e) => validateContactNumber(e.target.value)} />
                  {contactNumberError && <p className="text-red-500 text-xs italic">{contactNumberError}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                    Gender
                  </label>
                  <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gender">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>                
                </div>
              </div>
            </div>
            <div className="mb-4 md:col-span-2 lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email *
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" onChange={(e) => validateEmail(e.target.value)} />
                  {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username *
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={(e) => validateUsername(e.target.value)} />
                  {usernameError && <p className="text-red-500 text-xs italic">{usernameError}</p>}
                </div>
              </div>
            </div>
            <div className="mb-4 md:col-span-1 lg:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password *
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" onChange={(e) => validatePassword(e.target.value)} />
              {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
            </div>
            <div className="mb-4 md:col-span-2 lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="office_shift">
                    Office Shift *
                  </label>
                  <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="office_shift">
                    {officeShifts && officeShifts.map((shift) => (
                      <option key={shift.id} value={shift.id}>{shift.shift_name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                    Position *
                  </label>
                  <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role">
                    {roles && roles.map((role) => (
                      <option key={role.id} value={role.id}>{role.role_name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-4 md:col-span-2 lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                    Department *
                  </label>
                  <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="department">
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>{department.department_name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
                    Designation *
                  </label>
                  <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="designation">
                    {designations.map((designation) => (
                      <option key={designation.id} value={designation.id}>{designation.designation_name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-4 md:col-span-2 lg:col-span-2">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="basic_salary">
                    Basic Salary *
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="basic_salary" type="text" placeholder="Basic Salary" onChange={(e) => validateBasicSalary(e.target.value)} />
                  {basicSalaryError && <p className="text-red-500 text-xs italic">{basicSalaryError}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hourly_rate">
                    Hourly Rate
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hourly_rate" type="text" placeholder="Hourly Rate" onChange={(e) => validateHourlyRate(e.target.value)} />
                  {hourlyRateError && <p className="text-red-500 text-xs italic">{hourlyRateError}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="payslip_type">
                    Payslip Type
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="payslip_type" type="text" placeholder="Payslip Type"/>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end bg-gray-200 px-4 py-3">
            <button className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2 focus:outline-none" onClick={handleReset}>Reset</button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleCreateEmployee}>Save</button>
          </div>
          {addError && <div className="text-red-500 text-center p-2">{addError}</div>}
        </div>
      )}
      <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">List All Employees</h2>
        <div>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mr-2" onClick={handleOpenUploadModal}>Add Multiple</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleAddNewClick}>Add New</button>
        </div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-sm text-gray-500">Loading employees data...</td>
                </tr>
              ) : paginatedEmployees.length > 0 ? (
                paginatedEmployees.map((employee) => (
                  <tr key={employee.id}
                      className="group hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex justify-between">
                        <span>{employee.first_name} {employee.last_name}</span>
                        <div className="flex-shrink-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="p-1 ml-10 text-blue-600 hover:text-blue-800 focus:outline-none" onClick={() => handleViewDetails(employee)}>
                            <ArrowCircleRightIcon className="h-5 w-5" />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-800 focus:outline-none" onClick={() => handleShowDeleteConfirmation(employee.id)}>
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.designation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.contact_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${employee.is_active ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {employee.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-sm text-gray-500">
                    No employees data available.
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
                <button id="delete-confirm" className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-24" onClick={handleDelete}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Transition appear show={isUploadModalOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={handleCloseUploadModal}>
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
                <div className="flex justify-between items-center mb-5">
                  <h4 className="text-lg font-semibold">Upload Employee Data</h4>
                  <button onClick={handleCloseUploadModal} className="text-black">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <p className="mb-5">Please upload the employee data in Excel format.</p>
                <input type="file" accept=".xlsx" onChange={handleFileChange} />
                <p className="text-red-500 text-xs mt-2">
                  If you don't have an employee data upload template, you can download it <a href="https://docs.google.com/spreadsheets/d/1NH_ls7u8g_x32WczLsRiAWSfEKrgv9xd/export?format=xlsx" className="underline text-blue-500 hover:text-blue-700">here</a>.
                </p>
                <div className="mt-4 flex justify-end">
                  <button type="button" onClick={handleCloseUploadModal} className="bg-gray-500 text-white px-4 py-2 mr-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-50">
                    Cancel
                  </button>
                  <button type="button" onClick={handleUpload} className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Employees;
