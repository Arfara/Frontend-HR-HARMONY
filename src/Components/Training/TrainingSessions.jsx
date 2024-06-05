import React, { useState, useEffect, Fragment } from 'react';
import ReactQuill from 'react-quill';
import { PencilAltIcon, ArrowCircleRightIcon, TrashIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { APITraining } from '@/Apis/APITraining';
import { APIEmployees } from '@/Apis/APIEmployees';
import Pagination from '../Pagination/Pagination';
import { getPaginatedData } from '../Pagination/Pagination';

const TrainingSessions = () => {

    const navigate = useNavigate();
    const [showAddForm, setShowAddForm] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [trainings, setTrainings] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [trainingSkills, setTrainingSkills] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [trainingCost, setTrainingCost] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedTrainingId, setSelectedTrainingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [editingTraining, setEditingTraining] = useState(null);
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
  
    const paginatedTrainings = getPaginatedData(trainings, currentPage, per_page);

    const fetchTrainings = async () => {
        setIsLoading(true);
        try {
          const params = { page: currentPage, per_page: per_page, search: searchQuery };
          const response = await APITraining.viewAllTrainings(params);
          setTrainings(response.data || []);
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
      fetchTrainings();
    }, [currentPage, per_page, searchQuery]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
              const trainersData = await APITraining.viewAllTrainers();
              setTrainers(trainersData.data);
      
              const trainingSkillsData = await APITraining.viewAllTrainingSkills();
              setTrainingSkills(trainingSkillsData.data);
      
              const employeesData = await APIEmployees.getAllEmployees();
              setEmployees(employeesData.employees);
            } catch (error) {
      
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const handleEditClick = (training) => {
        setEditingTraining(training);
        setIsEditModalOpen(true);
    };

    const handleAddNewClick = () => {
        setShowAddForm(true);
    };

    const handleReset = () => {
        setShowAddForm(false);
        setSelectedTrainer('');
        setSelectedSkill('');
        setSelectedEmployee('');
        setTrainingCost('');
        setStartDate('');
        setEndDate('');
        setStatus('');
        setDescription('');
    };
    
    const handleViewDetailsClick = (id) => {
        navigate(`/training/training-details/${id}`);
    };

    const handleSave = async () => {
      setIsLoading(true);
      const trainingData = {
        trainer_id: parseInt(selectedTrainer, 10),
        training_skill_id: parseInt(selectedSkill, 10),
        employee_id: parseInt(selectedEmployee, 10),
        training_cost: parseInt(trainingCost, 10),
        start_date: startDate,
        end_date: endDate,
        description: description
      };

      try {
        const response = await APITraining.createTraining(trainingData);
        handleReset();
      } catch (error) {

    }
      setIsLoading(false);
      fetchTrainings();
    };

    const handleDeleteClick = (id) => {
        setSelectedTrainingId(id);
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        setIsLoading(true);
        try {
            await APITraining.deleteTrainingById(selectedTrainingId);
            fetchTrainings();
            setShowDeleteConfirmation(false);
        } catch (error) {

        }
        setIsLoading(false);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (editingTraining) {
            const updatedTrainingData = {
                ...editingTraining,
                trainer_id: parseInt(editingTraining.trainer_id, 10),
                training_skill_id: parseInt(editingTraining.training_skill_id, 10),
                employee_id: parseInt(editingTraining.employee_id, 10),
                training_cost: parseInt(editingTraining.training_cost, 10)
            };

            try {
                const response = await APITraining.updateTrainingById(editingTraining.id, updatedTrainingData);
                setIsEditModalOpen(false);
                fetchTrainings();
            } catch (error) {

            }
        } else {

        }
    };

    return (
        <div className="border border-gray-200 rounded overflow-hidden mb-4 max-w-6xl ml-auto mr-auto">
            {showAddForm && (
            <div className="bg-white shadow-md rounded-lg mb-4">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-700">Add New Training Sessions</h2>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={() => setShowAddForm(false)}>Hide</button>
                </div>
                <div className="px-4 py-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="mb-4 md:col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trainer">
                            Trainer
                            </label>
                            <div className="relative">
                            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="trainer" value={selectedTrainer} onChange={e => setSelectedTrainer(e.target.value)}>
                                <option value="" disabled>Select Trainer</option>
                                {trainers.map(trainer => (
                                    <option key={trainer.id} value={trainer.id}>{trainer.full_name}</option>
                                ))}
                            </select>
                            </div>
                        </div>
                        <div className="mb-4 md:col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trainingSkill">
                            Training Skill
                            </label>
                            <div className="relative">
                            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="trainingSkill" value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)}>
                                <option value="" disabled>Select Training Skill</option>
                                {trainingSkills.map(skill => (
                                    <option key={skill.id} value={skill.id}>{skill.training_skill}</option>
                                ))}
                            </select>
                            </div>
                        </div>
                        <div className="mb-4 md:col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trainingCost">
                            Training Cost
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="trainingCost" name="trainingCost" type="text" placeholder="Training Cost" value={trainingCost} onChange={e => setTrainingCost(e.target.value)}/>
                        </div>
                        <div className="mb-4 md:col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employee">
                            Employee
                            </label>
                            <div className="relative">
                            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employee" value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)}>
                                <option value="" disabled>Select Employee</option>
                                {employees.map(employee => (
                                    <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>
                                ))}
                            </select>
                            </div>
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
                        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Save</button>
                    </div>
                </div>
            </div>
            )}
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">List All Training Sessions</h2>
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training Skill</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training Cost</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {isLoading ? (
                        <tr>
                          <td colSpan="8" className="text-center py-4 text-sm text-gray-500">Loading training data...</td>
                        </tr>
                      ) : paginatedTrainings.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center py-4 text-sm text-gray-500">No training data available.</td>
                        </tr>
                      ) : (
                        paginatedTrainings.map((training) => (
                            <tr key={training.id} className="group hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex justify-between">
                                        <div>{training.training_skill}</div>
                                        <div className="flex-shrink-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button className="p-1 ml-10 text-blue-600 hover:text-blue-800 focus:outline-none" onClick={() => handleViewDetailsClick(training.id)}>
                                                <ArrowCircleRightIcon className="h-5 w-5" />
                                            </button>
                                            <button className="p-1 text-blue-600 hover:text-red-800 focus:outline-none"onClick={() => handleEditClick(training)}>
                                                <PencilAltIcon className="h-5 w-5" />
                                            </button>
                                            <button className="p-1 text-red-600 hover:text-red-800 focus:outline-none" onClick={() => handleDeleteClick(training.id)}>
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{training.full_name_trainer}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(training.start_date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(training.end_date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{training.full_name_employee}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{training.training_cost}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        training.status === 'Not Started' ? 'bg-red-100 text-red-800' :
                                        training.status === 'Started' ? 'bg-green-100 text-green-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {training.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                            </tr>
                        ))
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
        {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="edit-training-session-modal">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-4xl">
                <div className="flex justify-between items-center mb-5">
                    <h4 className="text-lg font-semibold">Edit Training Information</h4>
                    <button onClick={() => setIsEditModalOpen(false)} className="text-black">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleUpdateSubmit}>
                    <div className="mb-4 md:col-span-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trainingSkill">
                        Training Skill
                        </label>
                        <div className="relative">
                        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="trainingSkill" value={editingTraining ? editingTraining.training_skill_id : ''} onChange={(e) => setEditingTraining({...editingTraining, training_skill_id: e.target.value})}>
                            <option value="" disabled>Select Training Skill</option>
                            {trainingSkills.map(skill => (
                                <option key={skill.id} value={skill.id}>{skill.training_skill || ''}</option>
                            ))}
                        </select>
                        </div>
                    </div>
                    <div className="mb-4 md:col-span-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trainer">
                        Trainer
                        </label>
                        <div className="relative">
                        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="trainer" value={editingTraining ? editingTraining.trainer_id : ''} onChange={(e) => setEditingTraining({...editingTraining, trainer_id: e.target.value})}>
                            <option value="" disabled>Select Trainer</option>
                            {trainers.map(trainer => (
                                <option key={trainer.id} value={trainer.id}>{trainer.full_name}</option>
                            ))}
                        </select>
                        </div>
                    </div>
                    <div className="mb-4 md:col-span-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trainingCost">
                        Training Cost
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="trainingCost" name="trainingCost" type="text" placeholder="Training Cost" value={editingTraining ? editingTraining.training_cost : ''} onChange={(e) => setEditingTraining({...editingTraining, training_cost: e.target.value})}/>
                    </div>
                    <div className="mb-4 md:col-span-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employee">
                        Employee
                        </label>
                        <div className="relative">
                        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employee" value={editingTraining ? editingTraining.employee_id : ''} onChange={(e) => setEditingTraining({...editingTraining, employee_id: e.target.value})}>
                            <option value="" disabled>Select Employee</option>
                            {employees.map(employee => (
                                <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>
                            ))}
                        </select>
                        </div>
                    </div>
                    <div className="mb-4 md:col-span-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                        Start Date
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startDate" name="start_date" type="date" value={editingTraining ? editingTraining.start_date : ''} onChange={(e) => setEditingTraining({...editingTraining, start_date: e.target.value})} />
                    </div>
                    <div className="mb-4 md:col-span-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                        End Date
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endDate" name="end_date" type="date" value={editingTraining ? editingTraining.end_date : ''} onChange={(e) => setEditingTraining({...editingTraining, end_date: e.target.value})} />
                    </div>
                    <div className="mb-4 md:col-span-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                        </label>
                        <ReactQuill theme="snow" value={editingTraining ? editingTraining.description : ''} onChange={(value) => setEditingTraining({...editingTraining, description: value})} />
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
                                                Delete Training
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to delete this training? This action cannot be undone.
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

export default TrainingSessions
