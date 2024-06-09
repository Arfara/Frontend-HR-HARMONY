import React, { useState, useEffect, Fragment } from 'react';
import ReactQuill from 'react-quill';
import { ArrowCircleRightIcon, CheckCircleIcon, RefreshIcon, PlayIcon, PauseIcon, PlusIcon, PencilIcon, PencilAltIcon, TrashIcon, EyeIcon } from '@heroicons/react/solid';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { APIProjects } from '@/Apis/APIProjects';
import { APICoreHR } from '@/Apis/APICoreHR';
import { APIClients } from '@/Apis/APIClients';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [projectProgress, setProjectProgress] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [clients, setClients] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    department_id: '',
    estimated_hour: '',
    priority: '',
    start_date: '',
    end_date: '',
    summary: '',
    description: '',
    client_id: '',
  });

  const fetchProjects = async () => {
    try {
      const response = await APIProjects.getAllProjects();
      setProjects(response.Projects || []);
    } catch (error) {

    }
  };

  const fetchProjectProgress = async () => {
    try {
      const response = await APIProjects.getProjectProgress();
      setProjectProgress(response.project_status || []);
    } catch (error) {

    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await APICoreHR.getAllDepartments();
      setDepartments(response.departments || []);
    } catch (error) {

    }
  };

  const fetchClient = async () => {
    try {
      const response = await APIClients.getAllClients();
      setClients(response.data || []);
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchProjects();
    fetchDepartments();
    fetchClient();
    fetchProjectProgress();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const descriptionValue = formData.description.replace(/<\/?p>/g, ''); 

    const dataToSend = {
      title: formData.title,
      department_id: formData.department_id ? parseInt(formData.department_id, 10) : null,
      estimated_hour: formData.estimated_hour ? parseInt(formData.estimated_hour, 10) : null,
      priority: formData.priority || null,
      start_date: formData.start_date || null,
      end_date: formData.end_date || null,
      summary: formData.summary || null,
      description: descriptionValue || null,
      employee_id: parseInt(formData.client_id, 10),
    };

    try {
      const response = await APIProjects.createProject(dataToSend);
      fetchProjects();
      setShowAddForm(false);
      setFormData({
        title: '',
        department_id: '',
        estimated_hour: '',
        priority: '',
        start_date: '',
        end_date: '',
        summary: '',
        description: '',
        client_id: '',
      });
    } catch (error) {

    }
  };

  const handleAddNewClick = () => {
    setShowAddForm(true);
  };

  const handleHideClick = () => {
    setShowAddForm(false);
    setFormData({
      title: '',
      department_id: '',
      estimated_hour: '',
      priority: '',
      start_date: '',
      end_date: '',
      summary: '',
      description: '',
      client_id: '',
    });
  };

  const handleReset = () => {
    setShowAddForm(false);
    setSelectedProject('');
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleViewDetailsClick = (projectId) => {
    navigate(`/tasks/project-details/${projectId}`);
  };

  const handleEditProjectClick = (projectId) => {
    navigate(`/tasks/project-details/${projectId}`);
  };

  const handleShowDeleteConfirmation = (projectId) => {
    setDeleteProjectId(projectId);
    setShowDeleteConfirmation(true);
  };

  const handleHideDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await APIProjects.deleteProjectById(deleteProjectId);
      setShowDeleteConfirmation(false);
      fetchProjects();
    } catch (error) {

    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-500 bg-green-100';
      case 'In Progress':
        return 'text-blue-500 bg-blue-100';
      case 'On Hold':
        return 'text-yellow-500 bg-yellow-100';
      case 'Cancelled':
        return 'text-red-500 bg-red-100';
      default:
        return 'text-gray-500 bg-gray-100';
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
                <p className="font-bold text-xl">{projectProgress.Completed}</p>
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
                <p className="font-bold text-xl">{projectProgress.In_Progress}</p>
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
                <p className="font-bold text-xl">{projectProgress.Not_Started}</p>
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
                <p className="font-bold text-xl">{projectProgress.Cancelled}</p>
                <p className="text-sm">Total Cancelled</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='shadow-md rounded-md p-5 flex justify-between items-center bg-white mb-7'>
        <h2 className='text-2xl'>Projects</h2>
        <button className='text-white bg-blue-600 border-blue-600 py-2 px-4 rounded text-lg leading-6 cursor-pointer hover:bg-blue-700 hover:border-blue-700' onClick={handleAddNewClick}>+ Add Project</button>
      </div>

      {showAddForm && (
        <div className="bg-white shadow-md rounded-lg mb-4 w-full max-w-5xl">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-700">Add New Project</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleHideClick}>Hide</button>
          </div>
          
          <form className="px-6 py-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title*
                </label> 
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Title" onChange={handleChange} value={formData.title} />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                  Start Date*
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startDate" name="start_date" type="date" onChange={handleChange} value={formData.start_date} />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                  End Date*
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endDate" name="end_date" type="date" onChange={handleChange} value={formData.end_date} />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="summary">
                  Summary*
                </label> 
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="summary" name="summary" type="text" placeholder="Summary" onChange={handleChange} value={formData.summary} />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedHour">
                  Estimated Hour
                </label> 
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="estimatedHour" name="estimated_hour" type="number" placeholder="Estimated Hour" onChange={handleChange} value={formData.estimated_hour} />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="summary">
                  Department*
                </label> 
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="department_id" name="department_id" onChange={handleChange} value={formData.department_id}>
                      <option value="">Select Department</option>
                      {departments.map(department => (
                        <option key={department.id} value={department.id}>{department.department_name}</option>
                      ))}
                    </select>              
              </div>
                <div className="flex justify-between items-center col-span-full">
                  <div className="w-1/2 pr-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                      Priority
                    </label>
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="priority" name="priority" onChange={handleChange} value={formData.priority}>
                      <option value="">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div className="w-1/2 pl-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="client_id">
                      Client*
                    </label>
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="client_id" name="client_id" onChange={handleChange} value={formData.client_id}>
                      <option value="">Select Client</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.first_name} {client.last_name}</option>
                      ))}
                    </select>
                  </div>
                </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <ReactQuill theme="snow" value={formData.description} onChange={(content, delta, source, editor) => setFormData({...formData, description: editor.getHTML()})} />
            </div>

            <div className="flex justify-end bg-gray-200 px-4 py-3">
              <button className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2 focus:outline-none" onClick={handleHideClick}>Reset</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Save</button>
            </div>
          </form>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {projects.map((project) => (
          <div key={project.id} className='bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between'>
            <div>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-bold text-gray-700'>{project.title}</h3>
                <span className='text-sm text-gray-500'>{project.start_date}</span>
              </div>
              <p className='text-gray-600 mb-2'>
                {project.summary}
              </p>
            </div>
            <div>
              <div className='w-full bg-gray-200 rounded-full h-2.5 mb-4'>
                <div className='h-2.5 rounded-full' style={{ width: `${project.project_bar}%`, backgroundColor: getProgressBarColor(project.status) }}></div>
              </div>
              <div className='flex justify-between items-center'>
                <span className={`text-xs font-semibold ${getStatusColor(project.status).split(' ')[0]}`}>{project.status}</span>
                <div className='flex items-center'>
                  <button className='text-blue-600 hover:text-blue-700 mr-2' onClick={() => handleViewDetailsClick(project.id)}>
                    <ArrowCircleRightIcon className='h-5 w-5' />
                  </button>
                  <button className='text-blue-600 hover:text-blue-700 mr-2' onClick={() => handleEditProjectClick(project.id)}>
                    <PencilAltIcon className='h-5 w-5' />
                  </button>
                  <button className='text-red-600 hover:text-red-800' onClick={() => handleShowDeleteConfirmation(project.id)}>
                    <TrashIcon className='h-5 w-5' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
                  Delete Project
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this project? This action cannot be undone.
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
    </div>
  )
}

export default Projects
