import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/solid';
import { APIEmployees } from '@/Apis/APIEmployees';

const EmployeesExit = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [hoveredExitId, setHoveredExitId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [exitTypes, setExitTypes] = useState([]);
  const [exitEmployees, setExitEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedExitEmployeeId, setSelectedExitEmployeeId] = useState(null);
  const navigate = useNavigate();

  const maxSize = 5 * 1024 * 1024;

  const fetchExitEmployees = async () => {
    try {
      const response = await APIEmployees.getAllEmployeeExits();
      setExitEmployees(response.ExitEmployees || []);
      console.log(response.ExitEmployees);
    } catch (error) {


    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await APIEmployees.getAllEmployees();
        setEmployees(response.employees || []);
      } catch (error) {

      }
    };

    const fetchExitTypes = async () => {
      try {
        const response = await APIEmployees.getAllExitTypes();
        setExitTypes(response.exits || []);
      } catch (error) {

      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      await fetchEmployees();
      await fetchExitTypes();
      await fetchExitEmployees();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleExitTypeClick = () => {
    navigate('/employees/exit-type');
  };
  
  const handleAddNewClick = () => {
    setShowAddForm(true);
  };

  const handleMouseEnter = (exitEmployeeId) => {
    setHoveredExitId(exitEmployeeId);
  };

  const handleMouseLeave = () => {
    setHoveredExitId(null);
  };

  const handleDeleteClick = (exitEmployeeId) => {
    setSelectedExitEmployeeId(exitEmployeeId);
    setShowDeleteConfirmation(true);
  };

  const handleHideDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await APIEmployees.deleteExitById(selectedExitEmployeeId);
      fetchExitEmployees(); 
      setShowDeleteConfirmation(false);
    } catch (error) {

    }
    setIsLoading(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > maxSize) {
      alert('File is too large. Max size is 5MB.');
      event.target.value = ''; 
    } else {

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const exitEmployeesId = exitEmployees.length + 1;
    const exitData = {
      employee_id: parseInt(document.getElementById('employee-to-exit').value),
      exit_id: parseInt(document.getElementById('exit-type').value),
      exit_date: document.getElementById('exit-date').value,
      disable_account: document.getElementById('disable-account').value === 'Yes',
      exit_interview: document.getElementById('exit-interview').value,
      description: document.getElementById('description').value,
    };

    try {
      await APIEmployees.createEmployeeExit(exitEmployeesId, exitData);
      setShowAddForm(false);
      fetchExitEmployees(); 
    } catch (error) {

    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="mx-5 max-w-6xl ml-auto mr-auto">
        {showAddForm && (
          <div className="flex flex-wrap -mx-3 my-2">
            <div className="w-full lg:w-2/3 px-3 lg:mb-0">
              <div className="bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-700">Add New Employee Exit</h2>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none" onClick={() => setShowAddForm(false)}>Hide</button>
                </div>
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-2 mt-3 ml-3">
                    <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="employee-to-exit">
                        Employee to Exit *
                      </label>
                      <div className="relative">
                        <select className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="employee-to-exit">
                          <option>Select Employee</option>
                          {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="exit-type" onClick={handleExitTypeClick}>
                        Exit Type *
                      </label>
                      <div className="relative">
                        <select className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="exit-type">
                          <option>Select Exit Type</option>
                          {exitTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.exit_name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 py-2 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="exit-date">
                        Exit Date *
                      </label>
                      <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="exit-date" type="date" />
                    </div>
                    <div className="w-full md:w-1/2 px-3 py-2">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="exit-interview">
                        Exit Interview *
                      </label>
                      <div className="relative">
                        <select className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="exit-interview">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 py-2">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="disable-account">
                        Disable Account *
                      </label>
                      <div className="relative">
                        <select className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="disable-account">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full px-3 py-2">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                        Description
                      </label>
                      <textarea className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" placeholder="Description" rows="3"></textarea>
                    </div>
                  </div>
                </form>
                <div className="border-t border-gray-300 mx-3 my-4"></div>
                <div className="pb-5 pr-4 flex justify-end">
                    <button className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2" type="reset" onClick={() => setShowAddForm(false)}>Reset</button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmit}>Save</button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 px-3 lg:mb-0">
              <div className="bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-700">Exit Contract</h2>
                </div>
                <div className="p-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="attachment">
                    Attachment
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-1" id="attachment" type="file" accept=".gif,.png,.jpg,.jpeg" onChange={handleFileChange} />
                  <span className="block text-xs text-gray-500 mt-2">(Upload files only: gif,png,jpg,jpeg)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border border-gray-200 rounded overflow-hidden mb-4 max-w-6xl ml-auto mr-auto">
        <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">List All Employee Exit</h2>
          <div>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2" onClick={handleExitTypeClick}>
              Exit Type
            </button>
            <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddNewClick}>
              Add New
            </button>
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-between mb-4">
            <label className="flex items-center">
              Show
              <select className="mx-2 rounded border border-gray-300">
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
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EMPLOYEE TO EXIT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EXIT TYPE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EXIT DATE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EXIT INTERVIEW
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DISABLE ACCOUNT
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-sm text-gray-500">Loading exits data...</td>
                  </tr>
                ) : (
                  exitEmployees.map((exitEmployee) => {
                    const exitTypeName = exitTypes.find(type => type.id === exitEmployee.exit_id)?.exit_name || 'Tipe tidak ditemukan';

                    return (
                      <tr key={exitEmployee.id} onMouseEnter={() => handleMouseEnter(exitEmployee.id)} onMouseLeave={handleMouseLeave} className="hover:bg-gray-100">
                        <td className="px-6 py-4 text-sm text-gray-900 flex justify-between items-center">
                          <span>{exitEmployee.full_name_employee}</span>
                          {hoveredExitId === exitEmployee.id && (
                            <button onClick={() => handleDeleteClick(exitEmployee.id)} className="text-red-600 hover:text-red-900 ml-4 mr-2">
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exitTypeName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exitEmployee.exit_date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exitEmployee.exit_interview}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exitEmployee.disable_account ? 'Yes' : 'No'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <span className="sr-only">Actions</span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="text-gray-500 text-sm my-4 flex justify-between items-center">
            Showing 1 to {exitEmployees.length} of {exitEmployees.length} records
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
    </>
  );
};

export default EmployeesExit;
