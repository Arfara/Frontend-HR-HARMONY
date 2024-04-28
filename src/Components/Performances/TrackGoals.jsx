import React, { useState, useEffect, Fragment } from 'react';
import ReactQuill from 'react-quill';
import { TrashIcon, ArrowCircleRightIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { APIPerformance } from '@/Apis/APIPerformance';
import ReactStars from 'react-stars';
import { Dialog, Transition } from '@headlessui/react';

const TrackGoals = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [deleteRequestLoanId, setDeleteRequestLoanId] = useState(null);
  const [hoveredShiftId, setHoveredShiftId] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editData, setEditData] = useState(null);
  const [goalTypes, setGoalTypes] = useState([]);
  const [goalTypeId, setGoalTypeId] = useState('');
  const [subject, setSubject] = useState('');
  const [targetAchievement, setTargetAchievement] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchGoalTypes();
    fetchGoals();
  }, []);

  const fetchGoalTypes = async () => {
    try {
      const response = await APIPerformance.viewAllGoalTypes();
      setGoalTypes(response.goalTypes || []);
    } catch (error) {

    }
  };

  const fetchGoals = async () => {
    setIsLoading(true);
    try {
      const response = await APIPerformance.viewAllGoals();
      setGoals(response.goals);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleAddNewClick = () => {
    setShowAddForm(true);
  };

  const handleReset = () => {
    setGoalTypeId('');
    setSubject('');
    setTargetAchievement('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setShowAddForm(false);
  };

  const handleViewDetailsClick = (goal) => {
    navigate(`../goals-details/${goal.id}`);
};

  const handleDeleteClick = (id) => {
    setSelectedGoalId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedGoalId) {
      setIsLoading(true);
      try {
        await APIPerformance.deleteGoalById(selectedGoalId);
        fetchGoals();
        setShowDeleteConfirmation(false);
      } catch (error) {

      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleMouseEnter = (shiftId) => {
    setHoveredShiftId(shiftId);
  };

  const handleMouseLeave = () => {
    setHoveredShiftId(null);
  };

  const getProgressBarColor = (progress) => {
    if (progress <= 25) {
      return '#F87171'; // Red
    } else if (progress <= 50) {
      return '#FBBF24'; // Yellow
    } else if (progress <= 75) {
      return '#818CF8'; // Blue
    } else {
      return '#10B981'; // Green
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const goalData = {
      goal_type_id: goalTypeId,
      subject: subject,
      target_achievement: targetAchievement,
      start_date: startDate,
      end_date: endDate,
      description: description
    };
  
    try {
      await APIPerformance.createGoals(goalData);
      handleReset();
      fetchGoals();
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded overflow-hidden max-w-6xl ml-auto mr-auto">
      <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">List All Track Goals</h2>
        <div className="flex items-center">
          <button className='text-white bg-blue-500 border-blue-600 py-2 px-4 rounded text-lg leading-6 cursor-pointer hover:bg-blue-700 hover:border-blue-700' onClick={handleAddNewClick}>+ Add New</button>
        </div>
      </div>
      {showAddForm && (
        <div className="bg-white shadow-md rounded-lg mb-4">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-700">Add New Goal</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={() => setShowAddForm(false)}>Hide</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="px-4 py-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="mb-4 md:col-span-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goalType">
                    Goal Type
                  </label>
                  <div className="relative">
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="goalType" required onChange={e => setGoalTypeId(parseInt(e.target.value, 10))} value={goalTypeId}>
                      <option value="" disabled>Select Goal Type</option>
                      {goalTypes?.map((type) => (
                        <option key={type.id} value={type.id}>{type.goal_type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4 md:col-span-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subject" name="subject" type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
                </div>
                <div className="mb-4 md:col-span-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetAchievement">
                    Target Achievement
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="targetAchievement" name="targetAchievement" type="text" placeholder="Target Achievement" value={targetAchievement} onChange={e => setTargetAchievement(e.target.value)} />
                </div>
                <div className="mb-4 md:col-span-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                    Start Date
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startDate" name="start_date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className="mb-4 md:col-span-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                    End Date
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endDate" name="end_date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
                <div className="mb-4 md:col-span-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <ReactQuill theme="snow" value={description} onChange={setDescription} />
                </div>
              </div>
              <div className="flex justify-end bg-gray-200 px-4 py-3">
                <button type="button" onClick={handleReset} className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2 focus:outline-none">Reset</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Save</button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="flex justify-between items-center mb-5 p-5">
        <div className="flex items-center">
          <span>Show</span>
          <select name="entries" className="mx-2 px-2 py-1 border border-gray-300 rounded-md">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>entries</span>
        </div>
        <div className="flex">
          <input type="text" className="px-2 py-1 border border-gray-300 rounded-md" placeholder="Search" />
        </div>
      </div>
      <div className="overflow-x-auto mb-4 p-5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goal Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goal Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-sm text-gray-500">Loading request loan data...</td>
                </tr>
              ) : goals.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-sm text-gray-500">No request loan data available.</td>
                </tr>
              ) : (
                goals.map((goal) => (
                  <tr key={goal.id}
                      onMouseEnter={() => handleMouseEnter(goal.id)}
                      onMouseLeave={handleMouseLeave}
                      className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 relative flex items-center">
                      {goal.goal_type_name}
                      <button
                        className="ml-6 text-blue-600 hover:text-blue-900 focus:outline-none"
                        style={{ visibility: hoveredShiftId === goal.id ? 'visible' : 'hidden' }}
                        onClick={() => handleViewDetailsClick(goal)}
                      >
                        <ArrowCircleRightIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="ml-2 text-red-600 hover:text-red-900 focus:outline-none"
                        style={{ visibility: hoveredShiftId === goal.id ? 'visible' : 'hidden' }}
                        onClick={() => handleDeleteClick(goal.id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{goal.subject || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{goal.start_date ? new Date(goal.start_date).toLocaleDateString('id-ID') : 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{goal.end_date ? new Date(goal.end_date).toLocaleDateString('id-ID') : 'N/A'}</td>
                    <td className="py-4 whitespace-nowrap text-sm text-gray-500">
                      <ReactStars count={5} value={goal.goal_rating} size={24} color2={'#ffd700'} edit={false} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className='w-full bg-gray-200 rounded-full h-2.5'>
                        <div className='h-2.5 rounded-full' style={{ width: `${goal.progress_bar}%`, backgroundColor: getProgressBarColor(goal.progress_bar) }}></div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      <div className="flex justify-between items-center mt-5 p-5">
        <div className="text-sm">Showing 1 to {goals.length} of {goals.length} records</div>
        <div className="flex items-center">
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2">Previous</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">1</button>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2">Next</button>
        </div>
      </div>
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
                        Delete Track Goal
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this track goal? This action cannot be undone.
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
    </div>
  );
};

export default TrackGoals;
