import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { APITasks } from '@/Apis/APITasks';
import { APIProjects } from '@/Apis/APIProjects';
import { APIEmployees } from '@/Apis/APIEmployees';

const TaskDetails = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Not Started');
  const [activeTab, setActiveTab] = useState('overview');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [task, setTask] = useState(null);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();
  const { taskId } = useParams();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await APIProjects.getAllProjects();
        setProjects(response.Projects || []);
      } catch (error) {

      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await APIEmployees.getAllEmployeesNonPagination();
        setEmployees(response.employees || []);
      } catch (error) {

      }
    };

    fetchProjects();
    fetchEmployees();
  }, []);

  useEffect(() => {
  }, [projects, employees]);

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
  };

  const handleAddTaskClick = () => {
    navigate('/tasks/tasks-list');
  };

  const handleConfirmDelete = async () => {
    if (deleteTaskId) {
      try {
        await APITasks.deleteTaskById(deleteTaskId);
        setShowDeleteConfirmation(false);
        navigate('/tasks/tasks-list');
      } catch (error) {

      }
    }
  };

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await APITasks.getTaskById(taskId);
        if (response) {
          setTask(response);
        }
      } catch (error) {

      }
    };
  
    if (taskId && (activeTab === 'overview' || activeTab === 'edit')) {
      fetchTaskDetails();
    }
  }, [taskId, activeTab]);

  const handleUpdateStatusAndProgress = async () => {
    try {
      const updateData = {
        status: status,
        progress_bar: progress
      };
      await APITasks.updateTaskById(taskId, updateData);
    } catch (error) {

    }
  };

  const OverviewTab = ({ task }) => {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        {task && (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Task : {task?.title}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <p className="mt-1 text-sm text-gray-600">{task?.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <p className="mt-1 text-sm text-gray-600">{task?.start_date}</p>
                </div>
              </div>
              <div className="py-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <p className="mt-1 text-sm text-gray-600">{task?.end_date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estimated Hour</label>
                  <p className="mt-1 text-sm text-gray-600">{task?.estimated_hour}</p>
                </div>
              </div>
              <div className="py-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project</label>
                  <p className="mt-1 text-sm text-gray-600">{task?.project_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Team</label>
                  <p className="mt-1 text-sm text-gray-600">{task?.team}</p>
                </div>
              </div>
              <div className="py-4">
                <label className="block text-sm font-medium text-gray-700">Summary</label>
                <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{task?.summary}</p>
              </div>
              <div className="py-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{task?.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const EditTab = React.memo(({ task, setTask }) => {
    const [localTask, setLocalTask] = useState(task);

    useEffect(() => {
      setLocalTask(task);
    }, [task]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setLocalTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    const handleSubmitEditTab = async (e) => {
      e.preventDefault();
      const updatedTask = {
        ...localTask,
        estimated_hour: parseInt(localTask.estimated_hour, 10)
      };

      try {
        await APITasks.updateTaskById(taskId, updatedTask);
      } catch (error) {

      }
    };

    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        {task && (
          <form onSubmit={handleSubmitEditTab} className="divide-y divide-gray-200">
            <div className="py-4 grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title *</label>
                <input name="title" type="text" value={localTask?.title} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                <input name="start_date" type="date" value={localTask?.start_date} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date *</label>
                <input name="end_date" type="date" value={localTask?.end_date} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3" />
              </div>
            </div>
            <div className="py-4 grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Hour</label>
                <input name="estimated_hour" type="number" value={localTask?.estimated_hour} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Project *</label>
                <select name="project_name" value={localTask?.project_name} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3">
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Team</label>
                <select name="team" value={localTask?.team} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3">
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Summary *</label>
                <textarea name="summary" onChange={handleInputChange} value={localTask?.summary} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" onChange={handleInputChange} value={localTask?.description} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3" />
              </div>
            </div>
            <div className="flex justify-end py-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update Task
              </button>
            </div>
          </form>
        )}
      </div>
    );
  });

  const handleDeleteNote = (noteId) => {
    const updatedNotes = task.notes.filter(note => note.id !== noteId);
    setTask({ ...task, notes: updatedNotes });
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-1/3 px-3 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
              <h5 className="text-lg font-semibold text-gray-700">Task Details</h5>
              <button
                onClick={handleAddTaskClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded inline-flex items-center"
              >
                <span>Add Task</span>
              </button>
            </div>
            <div className="p-4">
              <div className="mb-1">
                <label htmlFor="progress" className="block text-sm font-medium text-gray-700">Progress</label>
                <Slider
                  min={0}
                  max={100}
                  value={progress}
                  onChange={setProgress}
                  handle={({ style, ...props }) => (
                    <div
                      {...props}
                      style={{
                        ...style,
                        borderColor: '#f87171',
                        height: '14px',
                        width: '14px',
                        marginLeft: '-7px',
                        marginTop: '-5px',
                        backgroundColor: '#f87171',
                        boxShadow: 'none'
                      }}
                    />
                  )}
                  dotStyle={{
                    borderColor: '#f87171',
                    borderWidth: 2,
                    bottom: -2,
                  }}
                  activeDotStyle={{
                    borderColor: '#f87171',
                    backgroundColor: '#f87171',
                  }}
                />
                <div className="text-center text-sm mt-2">{progress}%</div>
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status *</label>
                <div className="flex items-center mt-1 h-4">
                  <div className="h-6 w-16 border-r cursor-pointer" style={{ backgroundColor: '#FBBF24', borderColor: '#ffffff' }} onClick={() => updateStatus('Not Started')}></div>
                  <div className="h-6 w-16 border-r cursor-pointer" style={{ backgroundColor: '#818CF8', borderColor: '#ffffff' }} onClick={() => updateStatus('In Progress')}></div>
                  <div className="h-6 w-16 border-r cursor-pointer" style={{ backgroundColor: '#F87171', borderColor: '#ffffff' }} onClick={() => updateStatus('Cancelled')}></div>
                  <div className="h-6 w-16 border-r cursor-pointer" style={{ backgroundColor: '#E5E7EB', borderColor: '#ffffff' }} onClick={() => updateStatus('On Hold')}></div>
                  <div className="h-6 w-16 cursor-pointer" style={{ backgroundColor: '#10B981', borderColor: '#ffffff' }} onClick={() => updateStatus('Completed')}></div>
                </div>
                <div className="text-center mt-2">{status}</div>
              </div>
              <button type="button" onClick={handleUpdateStatusAndProgress} className="bg-indigo-600 text-white mb-4 px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full">
                Update Status
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
              <div className="flex space-x-2 mb-4">
                <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 ${activeTab === 'overview' ? 'bg-gray-200' : ''}`}>OVERVIEW</button>
                <button onClick={() => setActiveTab('edit')} className={`px-4 py-2 ${activeTab === 'edit' ? 'bg-gray-200' : ''}`}>EDIT</button>
              </div>
            </div>
            <div className="p-4">
              {activeTab === 'overview' && task && <OverviewTab task={task} />}
              {activeTab === 'edit' && task && <EditTab task={task} setTask={setTask} />}
            </div>
          </div>
        </div>
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
                    Are you sure you want to delete this item? This action cannot be undone.
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
  );
};

export default TaskDetails
