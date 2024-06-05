import React, { useState, useEffect } from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { APIEmployees } from '@/Apis/APIEmployees';
import moment from 'moment';
import Pagination from '../Pagination/Pagination';
import { getPaginatedData } from '../Pagination/Pagination';

const ShiftScheduling = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [hoveredShiftId, setHoveredShiftId] = useState(null);
  const [editingShift, setEditingShift] = useState({
    times: {
      monday: { in_time: '', out_time: '' },
      tuesday: { in_time: '', out_time: '' },
      wednesday: { in_time: '', out_time: '' },
      thursday: { in_time: '', out_time: '' },
      friday: { in_time: '', out_time: '' },
      saturday: { in_time: '', out_time: '' },
      sunday: { in_time: '', out_time: '' },
    }
  });
  const [shifts, setShifts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState(null);
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

  const paginatedShifts = getPaginatedData(shifts, currentPage, per_page);

  const fetchShifts = async () => {
    setIsLoading(true);
    try {
      const params = { page: currentPage, per_page: per_page, search: searchQuery };
      const response = await APIEmployees.getOfficeShifts(params);
      setShifts(response.shifts || []);
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
    fetchShifts();
  }, [currentPage, per_page, searchQuery]);

  const handleAddNewClick = () => {
    setShowAddForm(true);
  };

  const handleHideDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleHideClick = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setShowDeleteConfirmation(false);
  };

  const handleReset = () => {
    setEditingShift({
      times: {
        monday: { in_time: '', out_time: '' },
        tuesday: { in_time: '', out_time: '' },
        wednesday: { in_time: '', out_time: '' },
        thursday: { in_time: '', out_time: '' },
        friday: { in_time: '', out_time: '' },
        saturday: { in_time: '', out_time: '' },
        sunday: { in_time: '', out_time: '' },
      }
    });
    setShowAddForm(false);
  };

  const handleMouseEnter = (shiftId) => {
    setHoveredShiftId(shiftId);
  };

  const handleMouseLeave = () => {
    setHoveredShiftId(null);
  };

  const handleEditClick = (shift) => {
    const shiftWithCorrectStructure = {
      ...shift,
      times: {
        monday: { in_time: shift.monday_in_time || '', out_time: shift.monday_out_time || '' },
        tuesday: { in_time: shift.tuesday_in_time || '', out_time: shift.tuesday_out_time || '' },
        wednesday: { in_time: shift.wednesday_in_time || '', out_time: shift.wednesday_out_time || '' },
        thursday: { in_time: shift.thursday_in_time || '', out_time: shift.thursday_out_time || '' },
        friday: { in_time: shift.friday_in_time || '', out_time: shift.friday_out_time || '' },
        saturday: { in_time: shift.saturday_in_time || '', out_time: shift.saturday_out_time || '' },
        sunday: { in_time: shift.sunday_in_time || '', out_time: shift.sunday_out_time || '' },
      }
    };
    setEditingShift(shiftWithCorrectStructure);
    setShowEditForm(true);
  };

  const handleDeleteClick = (shiftId) => {
    setSelectedShiftId(shiftId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteTime = (day, timeType) => {
    setEditingShift(prevState => ({
      ...prevState,
      times: {
        ...prevState.times,
        [day.toLowerCase()]: {
          ...prevState.times[day.toLowerCase()],
          [timeType]: ''
        }
      }
    }));
  };

  const handleUpdate = async () => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    let updatedShift = {
      shift_name: editingShift.shift_name,
      ...days.reduce((acc, day) => {
        const inTime = editingShift.times[day].in_time;
        const outTime = editingShift.times[day].out_time;
        acc[`${day}_in_time`] = inTime && inTime !== '' ? moment(inTime, "HH:mm").format("hh.mm A") : 'Holiday';
        acc[`${day}_out_time`] = outTime && outTime !== '' ? moment(outTime, "HH:mm").format("hh.mm A") : 'Holiday';
        return acc;
      }, {})
    };

    try {
      const response = await APIEmployees.updateOfficeShift(editingShift.id, updatedShift);
      if (response.code === 200) {
        fetchShifts();
        setShowEditForm(false);
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {

    }
  };

  const handleDelete = async (shiftId) => {
    try {
      await APIEmployees.deleteOfficeShift(shiftId);
      fetchShifts();
      setShowDeleteConfirmation(false);
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message || "An unexpected error occurred. Please try again."}`);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const formatTimeWithEnglish = (timeString) => {
    if (!timeString) return '';
    return timeString
      .replace(/pagi/i, 'Morning')
      .replace(/siang/i, 'Afternoon')
      .replace(/sore/i, 'Evening')
      .replace(/malam/i, 'Night');
  };

  const handleCreate = async () => {
    if (!editingShift.shift_name) {
      alert('Please fill in the shift name.');
      return;
    }
  
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    let newShift = {
      shift_name: editingShift.shift_name,
      ...days.reduce((acc, day) => {
        const inTime = editingShift.times[day].in_time;
        const outTime = editingShift.times[day].out_time;
        acc[`${day}_in_time`] = inTime && inTime !== '' ? moment(inTime, "HH:mm").format("HH:mm A") : 'Holiday';
        acc[`${day}_out_time`] = outTime && outTime !== '' ? moment(outTime, "HH:mm").format("HH:mm A") : 'Holiday';
        return acc;
      }, {})
    };
  
    try {
      const response = await APIEmployees.createOfficeShift(newShift);
      if (response.code === 201) {
        fetchShifts();
        setShowAddForm(false);
        setEditingShift({
          times: {
            monday: { in_time: '', out_time: '' },
            tuesday: { in_time: '', out_time: '' },
            wednesday: { in_time: '', out_time: '' },
            thursday: { in_time: '', out_time: '' },
            friday: { in_time: '', out_time: '' },
            saturday: { in_time: '', out_time: '' },
            sunday: { in_time: '', out_time: '' },
          }
        });
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message || "An unexpected error occurred. Please check your input and try again."}`);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="border border-gray-200 rounded overflow-hidden max-w-6xl ml-auto mr-auto">
      {showAddForm && (
        <div className="bg-white shadow-md rounded-lg mb-2">
          <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">Add New Shift</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none" onClick={handleHideClick}>Hide</button>
          </div>
          <form className="p-6" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shiftName">
                Shift Name *
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="shiftName" type="text" placeholder="Shift Name" value={editingShift.shift_name || ''} onChange={(e) => {
                const value = e.target.value;
                setEditingShift(prevState => ({
                  ...prevState,
                  shift_name: value
                }));
              }} />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <React.Fragment key={day}>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`${day.toLowerCase()}InTime`}>
                      {day} In Time *
                    </label>
                    <div className="flex items-center">
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={`${day.toLowerCase()}InTime`} type="time" value={editingShift.times[day.toLowerCase()] ? editingShift.times[day.toLowerCase()].in_time === 'Holiday' ? '' : moment(editingShift.times[day.toLowerCase()].in_time, "HH:mm").format("HH:mm") : ''} onChange={(e) => {
                        const value = e.target.value;
                        setEditingShift(prevState => ({
                          ...prevState,
                          times: {
                            ...prevState.times,
                            [day.toLowerCase()]: {
                              ...prevState.times[day.toLowerCase()],
                              in_time: value
                            }
                          }
                        }));
                      }} />
                      <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none"
                              onClick={() => handleDeleteTime(day, 'in_time')}>
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`${day.toLowerCase()}OutTime`}>
                      {day} Out Time *
                    </label>
                    <div className="flex items-center">
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={`${day.toLowerCase()}OutTime`} type="time" value={editingShift.times[day.toLowerCase()] ? editingShift.times[day.toLowerCase()].out_time === 'Holiday' ? '' : moment(editingShift.times[day.toLowerCase()].out_time, "HH:mm").format("HH:mm") : ''} onChange={(e) => {
                        const value = e.target.value;
                        setEditingShift(prevState => ({
                          ...prevState,
                          times: {
                            ...prevState.times,
                            [day.toLowerCase()]: {
                              ...prevState.times[day.toLowerCase()],
                              out_time: value
                            }
                          }
                        }));
                      }} />
                      <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none"
                              onClick={() => handleDeleteTime(day, 'out_time')}>
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </form>
          <div className="flex justify-end bg-gray-200 px-4 py-3 rounded-b">
            <button className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2 focus:outline-none" onClick={handleReset}>Reset</button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleCreate}>Save</button>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">List All Office Shifts</h2>
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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SHIFT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MONDAY</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TUESDAY</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WEDNESDAY</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">THURSDAY</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FRIDAY</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SATURDAY</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SUNDAY</th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-sm text-gray-500">Loading shifts data...</td>
                </tr>
              ) : paginatedShifts.length > 0 ? (
                paginatedShifts.map((shift) => (
                  <tr key={shift.id}
                      onMouseEnter={() => handleMouseEnter(shift.id)}
                      onMouseLeave={handleMouseLeave}
                      className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex justify-between">
                        <span>{shift.shift_name}</span>
                        <div className="flex-shrink-0 flex items-center">
                          <button
                            className="p-1 text-blue-600 hover:text-blue-800 focus:outline-none ml-8"
                            onClick={() => handleEditClick(shift)}
                            style={{ visibility: hoveredShiftId === shift.id ? 'visible' : 'hidden' }}
                          >
                            <PencilAltIcon className="h-5 w-5" />
                          </button>
                          <button
                            className="p-1 text-red-600 hover:text-red-900 focus:outline-none"
                            onClick={() => handleDeleteClick(shift.id)}
                            style={{ visibility: hoveredShiftId === shift.id ? 'visible' : 'hidden' }}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimeWithEnglish(shift.monday_in_time)} - {formatTimeWithEnglish(shift.monday_out_time)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimeWithEnglish(shift.tuesday_in_time)} - {formatTimeWithEnglish(shift.tuesday_out_time)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimeWithEnglish(shift.wednesday_in_time)} - {formatTimeWithEnglish(shift.wednesday_out_time)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimeWithEnglish(shift.thursday_in_time)} - {formatTimeWithEnglish(shift.thursday_out_time)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimeWithEnglish(shift.friday_in_time)} - {formatTimeWithEnglish(shift.friday_out_time)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimeWithEnglish(shift.saturday_in_time)} - {formatTimeWithEnglish(shift.saturday_out_time)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimeWithEnglish(shift.sunday_in_time)} - {formatTimeWithEnglish(shift.sunday_out_time)}</td>
                    <td className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-sm text-gray-500">
                    No shifts data available.
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
      {showEditForm && editingShift && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-start">
          <div className="bg-white p-5 rounded-lg w-full max-w-xl mx-3">
            <h2 className="text-xl font-bold text-gray-700 mb-1">Edit Office Shift Information</h2>
            <p className="mb-1">We need below required information to update this record.</p>
            <form className="p-6" onSubmit={(e) => e.preventDefault()}>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shiftName">
                  Shift Name *
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                       id="shiftName" 
                       type="text" 
                       placeholder="Shift Name" 
                       value={editingShift.shift_name || ''} 
                       onChange={(e) => {
                         const value = e.target.value;
                         setEditingShift(prevState => ({
                           ...prevState,
                           shift_name: value
                         }));
                       }} />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <React.Fragment key={day}>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`${day.toLowerCase()}InTime`}>
                        {day} In Time *
                      </label>
                      <div className="flex items-center">
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                               id={`${day.toLowerCase()}InTime`} 
                               type="time" 
                               value={editingShift.times[day.toLowerCase()] ? editingShift.times[day.toLowerCase()].in_time === 'Holiday' ? '' : moment(editingShift.times[day.toLowerCase()].in_time, "HH:mm").format("HH:mm") : ''}
                               onChange={(e) => {
                                 const value = e.target.value;
                                 setEditingShift(prevState => ({
                                   ...prevState,
                                   times: {
                                     ...prevState.times,
                                     [day.toLowerCase()]: {
                                       ...prevState.times[day.toLowerCase()],
                                       in_time: value
                                     }
                                   }
                                 }));
                               }} />
                        <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none"
                                onClick={() => handleDeleteTime(day, 'in_time')}>
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`${day.toLowerCase()}OutTime`}>
                        {day} Out Time *
                      </label>
                      <div className="flex items-center">
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                               id={`${day.toLowerCase()}OutTime`} 
                               type="time" 
                               value={editingShift.times[day.toLowerCase()] ? editingShift.times[day.toLowerCase()].out_time === 'Holiday' ? '' : moment(editingShift.times[day.toLowerCase()].out_time, "HH:mm").format("HH:mm") : ''}
                               onChange={(e) => {
                                 const value = e.target.value;
                                 setEditingShift(prevState => ({
                                   ...prevState,
                                   times: {
                                     ...prevState.times,
                                     [day.toLowerCase()]: {
                                       ...prevState.times[day.toLowerCase()],
                                       out_time: value
                                     }
                                   }
                                 }));
                               }} />
                        <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none"
                                onClick={() => handleDeleteTime(day, 'out_time')}>
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2 focus:outline-none"
                        onClick={handleHideClick}>Close</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                        onClick={handleUpdate}>Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
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
                <button id="delete-confirm" className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-24" onClick={() => handleDelete(selectedShiftId)}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftScheduling;