import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useNavigate, useParams } from 'react-router-dom';
import { APIProjects } from '@/Apis/APIProjects';
import { APICoreHR } from '@/Apis/APICoreHR';
import { APIEmployees } from '@/Apis/APIEmployees';
import { APIClients } from '@/Apis/APIClients';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProjectDetails = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Not Started');
  const [activeTab, setActiveTab] = useState('overview');
  const [priority, setPriority] = useState('Medium');
  const [projectDetails, setProjectDetails] = useState({});
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [clients, setClients] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

  const navigate = useNavigate();
  const { projectId } = useParams();


  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await APIProjects.getProjectById(projectId);
        if (response) {
          setProjectDetails(response);
          setProgress(response.project_bar);
          setStatus(response.status);
          setPriority(response.priority);
        }
      } catch (error) {

      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await APICoreHR.getAllDepartmentsNonPagination();
        setDepartments(response.departments);
      } catch (error) {

      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await APIEmployees.getAllEmployeesNonPagination();
        setEmployees(response.data);
      } catch (error) {

      }
    };

    fetchDepartments();
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await APIClients.getAllClientsNonPagination();
        setClients(response.data);
      } catch (error) {

      }
    };

    fetchClients();
  }, []);

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
  };

  const handleAddProjectClick = () => {
    navigate('/tasks/project-list');
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleUpdateProject = async () => {
    try {
      const projectData = {
        project_bar: progress,
        status: status,
        priority: priority,
      };
      await APIProjects.editProjectById(projectId, projectData);
    } catch (error) {

    }
  };

  const handleClientChange = (event) => {
    setSelectedEmployeeId(parseInt(event.target.value, 10));
  };

  const OverviewTab = ({ project }) => {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        {project && (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Project : {project?.title}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <p className="mt-1 text-sm text-gray-600">{project?.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <p className="mt-1 text-sm text-gray-600">{project?.start_date}</p>
                </div>
              </div>
              <div className="py-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <p className="mt-1 text-sm text-gray-600">{project?.end_date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estimated Hour</label>
                  <p className="mt-1 text-sm text-gray-600">{project?.estimated_hour}</p>
                </div>
              </div>
              <div className="py-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Client</label>
                  <p className="mt-1 text-sm text-gray-600">{project?.client_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Team</label>
                  <p className="mt-1 text-sm text-gray-600">{project?.department_name}</p>
                </div>
              </div>
              <div className="py-4">
                <label className="block text-sm font-medium text-gray-700">Summary</label>
                <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{project?.summary}</p>
              </div>
              <div className="py-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">{project?.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const EditTab = React.memo(({ project }) => {
    const [localProject, setLocalProject] = useState(project);

    useEffect(() => {
      setLocalProject(project);
    }, [project]);

    useEffect(() => {
      setLocalProject(prevProject => ({ ...prevProject, employee_id: selectedEmployeeId }));
    }, [selectedEmployeeId]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setLocalProject(prevProject => ({ ...prevProject, [name]: value }));
    };

    const handleDepartmentChange = (event) => {
      setLocalProject(prevProject => ({ ...prevProject, department_id: parseInt(event.target.value, 10) }));
    };

    const handleSubmitEditTab = async (e) => {
      e.preventDefault();
      const updatedProject = {
        ...localProject,
        title: localProject.title,
        estimated_hour: parseInt(localProject.estimated_hour, 10),
        priority: localProject.priority,
        start_date: localProject.start_date,
        end_date: localProject.end_date,
        summary: localProject.summary,
        department_id: parseInt(localProject.department_id, 10),
        description: localProject.description,
        employee_id: selectedEmployeeId,
      };

      try {
        const response = await APIProjects.editProjectById(projectId, updatedProject);
      } catch (error) {

      }
    };

    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        {project && (
          <form onSubmit={handleSubmitEditTab} className="divide-y divide-gray-200">
            <div className="py-4 grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input name="title" type="text" value={localProject?.title} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input name="start_date" type="date" value={localProject?.start_date} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input name="end_date" type="date" value={localProject?.end_date} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3" />
              </div>
            </div>
            <div className="py-4 grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Hour</label>
                <input name="estimated_hour" type="number" value={localProject?.estimated_hour} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Client</label>
                <select name="client" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3" onChange={handleClientChange}>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.first_name} {client.last_name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select name="team" value={localProject?.department_id} onChange={handleDepartmentChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3">
                  {departments && departments.map(department => (
                    <option key={department.id} value={department.id}>{department.department_name}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Summary</label>
                <textarea name="summary" onChange={handleInputChange} value={localProject?.summary} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <ReactQuill theme="snow" value={localProject?.description || ''} onChange={(content) => setLocalProject({...localProject, description: content})} className="mt-1 block w-full" />
              </div>
            </div>
            <div className="flex justify-end py-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update Project
              </button>
            </div>
          </form>
        )}
      </div>
    );
  });

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-1/3 px-3 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
              <h5 className="text-lg font-semibold text-gray-700">Project Details</h5>
              <button
                onClick={handleAddProjectClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded inline-flex items-center"
              >
                <span>Add Project</span>
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
              <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority *</label>
                <select
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={handlePriorityChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <button type="button" onClick={handleUpdateProject} className="bg-indigo-600 text-white mb-4 px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full">
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
              {activeTab === 'overview' && <OverviewTab project={projectDetails}/>}
              {activeTab === 'edit' && <EditTab project={projectDetails} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails
