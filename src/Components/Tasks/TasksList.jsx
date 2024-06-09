import React, { useState, useEffect, Fragment } from 'react';
import ReactQuill from 'react-quill';
import { ArrowCircleRightIcon, CheckCircleIcon, RefreshIcon, PlayIcon, PauseIcon, PlusIcon, PencilIcon, PencilAltIcon, TrashIcon, EyeIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { APITasks } from '@/Apis/APITasks';
import { APIProjects } from '@/Apis/APIProjects';

const TasksList = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task_status, setTaskStatus] = useState({});
  const [projects, setProjects] = useState([]);
  const [description, setDescription] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const handleAddNewClick = () => {
    setShowAddForm(true);
  };

  const handleHideClick = () => {
    setShowAddForm(false);
  };

  const handleReset = () => {
    setShowAddForm(false);
    setSelectedProject('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 10);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [progress]);

  const fetchTasks = async () => {
    try {
      const response = await APITasks.getAllTasks();
      setTasks(response.tasks || []);
    } catch (error) {
    }
  };

  const fetchTaskProject = async () => {
    try {
      const response = await APITasks.getTaskProgress();
      setTaskStatus(response.task_status);
  } catch (error) {
  }
};

  useEffect(() => {
    fetchTasks();
    fetchTaskProject();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await APIProjects.getAllProjects();
        setProjects(response.projects || []);
      } catch (error) {

      }
    };
  
    fetchProjects();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskData = {
      title: formData.get('title'),
      start_date: formData.get('start_date'),
      end_date: formData.get('end_date'),
      estimated_hour: parseInt(formData.get('estimated_hour'), 10) || 0,
      project_id: parseInt(selectedProject, 10),
      summary: formData.get('summary'),
      description: description
    };
    
    try {
      await APITasks.createTask(taskData);
      setShowAddForm(false);
      setSelectedProject('');
      setDescription('');
      await fetchTasks();
    } catch (error) {

    }
  };

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
  };
  
  const handleViewDetailsClick = (taskId) => {
    navigate(`/tasks/task-details/${taskId}`);
  };

  const handleEditTaskClick = (taskId) => {
    navigate(`/tasks/task-details/${taskId}`);
  };

  const handleDeleteClick = (taskId) => {
    setDeleteTaskId(taskId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteTaskId) {
      try {
        await APITasks.deleteTaskById(deleteTaskId);
        setShowDeleteConfirmation(false);
        const updatedTasks = tasks.filter(task => task.id !== deleteTaskId);
        setTasks(updatedTasks);
      } catch (error) {

      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-400 bg-green-100';
      case 'In Progress':
        return 'text-blue-400 bg-blue-100';
      case 'On Hold':
        return 'text-gray-400 bg-gray-100';
      case 'Not Started':
        return 'text-yellow-400 bg-yellow-100';
      case 'Cancelled':
        return 'text-red-400 bg-red-100';
      default:
        return 'text-gray-400 bg-gray-100';
    }
  };

  const getProgressBarColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#10B981';
      case 'In Progress':
        return '#818CF8';
      case 'On Hold':
        return '#E5E7EB';
      case 'Not Started':
        return '#FBBF24';
      case 'Cancelled':
        return '#F87171';
      default:
        return '#E5E7EB';
    }
  };

  return (
    <div className='max-w-full mx-auto p-5 bg-white'>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
          <div className="bg-green-500 text-white rounded-lg shadow-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-white mr-3" />
              <div>
                <p className="font-bold text-xl">{task_status.Completed}</p>
                <p className="text-sm">Total Completed</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
          <div className="bg-blue-500 text-white rounded-lg shadow-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <RefreshIcon className="h-8 w-8 text-white mr-3" />
              <div>
                <p className="font-bold text-xl">{task_status.In_Progress}</p>
                <p className="text-sm">Total In Progress</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
          <div className="bg-teal-500 text-white rounded-lg shadow-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <PlayIcon className="h-8 w-8 text-white mr-3" />
              <div>
                <p className="font-bold text-xl">{task_status.Not_Started}</p>
                <p className="text-sm">Total Not Started</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
          <div className="bg-red-500 text-white rounded-lg shadow-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <PauseIcon className="h-8 w-8 text-white mr-3" />
              <div>
                <p className="font-bold text-xl">{task_status.Cancelled}</p>
                <p className="text-sm">Total Cancelled</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='shadow-md rounded-md p-5 flex justify-between items-center bg-white mb-7'>
        <h2 className='text-2xl'>List All Tasks</h2>
        <button className='text-white bg-blue-600 border-blue-600 py-2 px-4 rounded text-lg leading-6 cursor-pointer hover:bg-blue-700 hover:border-blue-700' onClick={handleAddNewClick}>+ Add Task</button>
      </div>

      {showAddForm && (
        <div className="bg-white shadow-md rounded-lg mb-4 w-full max-w-5xl">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-700">Add New Task</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleHideClick}>Hide</button>
          </div>
          
          <form className="px-4 py-2" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title*
                </label> 
                <input name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                  Start Date*
                </label>
                <input name="start_date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startDate" type="date" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                  End Date*
                </label>
                <input name="end_date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endDate" type="date" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedHour">
                  Estimated Hour
                </label> 
                <input name="estimated_hour" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="estimatedHour" type="number" placeholder="Estimated Hour" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="project">
                  Project *
                </label>
                <select
                  name="project_id"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="project"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  <option value="" disabled>Select Project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>{project.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="summary">
                  Summary*
                </label> 
                <input name="summary" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="summary" type="text" placeholder="Summary" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <ReactQuill theme="snow" value={description} onChange={setDescription} />
            </div>
            <div className="flex justify-end bg-gray-200 px-4 py-3">
              <button className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2 focus:outline-none" onClick={handleHideClick}>Reset</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Save</button>
            </div>
          </form>
        </div>
      )}

      <div className='grid md:grid-cols-3 gap-4 max-w-7xl mx-auto'>
        {tasks.map((task) => (
          <div key={task.id} className='bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between'>
            <div>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-bold text-gray-700'>{task.title}</h3>
                <span className='text-sm text-gray-500'>{task.start_date}</span>
              </div>
              <p className='text-gray-600 mb-2'>
                {task.summary}
              </p>
            </div>
            <div>
              <div className='w-full bg-gray-200 rounded-full h-2.5 mb-4'>
                <div className='h-2.5 rounded-full' style={{ width: `${task.progress_bar}%`, backgroundColor: getProgressBarColor(task.status) }}></div>
              </div>
              <div className='flex justify-between items-center'>
                <span className={`text-xs font-semibold ${getStatusColor(task.status).split(' ')[0]}`}>{task.status}</span>
                <div className='flex items-center'>
                  <button className='text-blue-600 hover:text-blue-700 mr-2' onClick={() => handleViewDetailsClick(task.id)}>
                    <ArrowCircleRightIcon className='h-5 w-5' />
                  </button>
                  <button className='text-blue-600 hover:text-blue-700 mr-2' onClick={() => handleEditTaskClick(task.id)}>
                    <PencilAltIcon className='h-5 w-5' />
                  </button>
                  <button className='text-red-600 hover:text-red-800' onClick={() => handleDeleteClick(task.id)}>
                    <TrashIcon className='h-5 w-5' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Transition appear show={showDeleteConfirmation} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setShowDeleteConfirmation(false)}>
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
                  Confirm Delete
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this task? This action cannot be undone.
                  </p>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirmation(false)}
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
    </div>
  )
}

export default TasksList
