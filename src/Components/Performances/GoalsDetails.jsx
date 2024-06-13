import React, { useState, useEffect } from 'react';
import ReactStars from 'react-stars';
import ReactQuill from 'react-quill';
import { useLocation, useParams } from 'react-router-dom';
import { APIPerformance } from '@/Apis/APIPerformance';
import { APIProjects } from '@/Apis/APIProjects';
import { APITasks } from '@/Apis/APITasks';
import { APITraining } from '@/Apis/APITraining';

const GoalsDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const [data, setData] = useState(location.state?.data || {});
    const [initialData, setInitialData] = useState({});
    const [activeTab, setActiveTab] = useState('Overview');
    const [progress, setProgress] = useState(data?.progress_bar || 0);
    const [goalRating, setGoalRating] = useState(data?.goal_rating || 0);
    const [subject, setSubject] = useState(data?.subject || '');
    const [targetAchievement, setTargetAchievement] = useState(data?.target_achievement || '');
    const [startDate, setStartDate] = useState(data?.start_date || '');
    const [endDate, setEndDate] = useState(data?.end_date || '');
    const [status, setStatus] = useState(data?.status || '');
    const [description, setDescription] = useState(data?.description || '');

    const [goalTypes, setGoalTypes] = useState([]);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [trainings, setTrainings] = useState([]);

    const [selectedGoalType, setSelectedGoalType] = useState(data?.goal_type_id || '');
    const [selectedProjectId, setSelectedProjectId] = useState(data?.project_id || '');
    const [selectedTaskId, setSelectedTaskId] = useState(data?.task_id || '');
    const [selectedTrainingId, setSelectedTrainingId] = useState(data?.training_id || '');
    
    useEffect(() => {
        fetchGoal();
    }, [id]); 
    
    useEffect(() => {
        fetchGoalTypes();
        fetchProjects();
        fetchTasks();
        fetchTrainings();
    }, []); 

    const fetchGoal = async () => {
        try {
            const response = await APIPerformance.viewGoalById(id);
            if (response && response.data) {
                const { data } = response;
                setData(data || {});
                setInitialData(data || {});
                setSelectedGoalType(data.goal_type_id || '');
                setProgress(data.progress_bar || 0);
                setGoalRating(data.goal_rating || 0);
                setSubject(data.subject || '');
                setTargetAchievement(data.target_achievement || '');
                setStartDate(data.start_date || '');
                setEndDate(data.end_date || '');
                setStatus(data.status || '');
                setDescription(data.description || '');
                setSelectedProjectId(data.project_id || '');
                setSelectedTaskId(data.task_id || '');
                setSelectedTrainingId(data.training_id || '');
            } 
        } catch (error) {

        }
    };

    const fetchGoalTypes = async () => {
        const response = await APIPerformance.viewAllGoalTypesNonPagination();
        setGoalTypes(response.goalTypes || []);
    };

    const fetchProjects = async () => {
        const response = await APIProjects.getAllProjectsNonPagination();
        setProjects(response.Projects || []);
    };

    const fetchTasks = async () => {
        const response = await APITasks.getAllTasks();
        setTasks(response.tasks || []);
    };

    const fetchTrainings = async () => {
        const response = await APITraining.viewAllTrainingsNonPagination();
        setTrainings(response.data || []);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleRatingChange = (newRating) => {
        setGoalRating(newRating);
    };

    const handleUpdateRating = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { goal_rating: goalRating };
            const response = await APIPerformance.updateGoalById(id, updatedData);
        } catch (error) {
        
        }
    };

    const handleUpdateGoal = async (e) => {
        e.preventDefault();
        const updatedGoalData = {
            goal_type_id: selectedGoalType,
            subject: subject,
            target_achievement: targetAchievement,
            start_date: startDate,
            end_date: endDate,
            status: status,
            description: description,
            progress_bar: progress,
            goal_rating: goalRating
        };

        try {
            const response = await APIPerformance.updateGoalById(id, updatedGoalData);
            fetchGoal();
            setActiveTab('Overview');
        } catch (error) {

        }
    };

    const handleAddWork = async () => {
        const updatedGoalData = {
            project_id: selectedProjectId,
            task_id: selectedTaskId,
            training_id: selectedTrainingId
        };

        try {
            const response = await APIPerformance.updateGoalById(id, updatedGoalData);
            fetchGoal();
            setActiveTab('Overview');
        } catch (error) {

        }
    };

    const goalTypeName = goalTypes.find(type => type.id === selectedGoalType)?.goal_type || '';

    return(
        <div className="flex flex-col lg:flex-row lg:space-x-8 p-10">
            <div className="lg:w-1/4 bg-white p-6 rounded-md shadow-lg"  style={{ alignSelf: 'flex-start' }}>
                <h2 className="text-xl font-bold mb-4">Goals Details</h2>
                <ul>
                    {Object.entries({
                        'Goal Type': initialData.goal_type_name || '',
                        'progress': initialData.progress_bar !== undefined && initialData.progress_bar !== null ? `${initialData.progress_bar}%` : '',
                    }).map(([key, value]) => (
                        <li key={key} className="mb-2 border-b">
                            <span className="font-bold">{key}: </span>{value}
                        </li>
                    ))}
                </ul>
                <form>
                    <div className="flex items-center mb-2 border-b font-bold">
                        <label className="mr-2">Goal Rating</label>
                        <div className="rating-stars flex ml-auto">
                            <ReactStars
                                count={5}
                                value={goalRating || 0}
                                size={24}
                                color2={'#ffd700'}
                                edit={true}
                                half={false}
                                onChange={handleRatingChange}
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" onClick={handleUpdateRating}>Update Rating</button>
                    </div>
                </form>
            </div>
            <div className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-lg mt-4 lg:mt-0 mr-auto">
                <div className="bg-white p-6 rounded shadow">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Overview and Edit Goals</h2>

                        <ul className="flex border-b">
                            <li className="-mb-px mr-1">
                                <a
                                    className={`inline-block py-2 px-4 font-semibold ${activeTab === 'Overview' ? 'text-blue-500 border-b-2 border-blue-500 cursor-pointer' : 'text-gray-500 hover:text-gray-800 cursor-pointer'}`}
                                    onClick={() => handleTabClick('Overview')}
                                >
                                    Overview
                                </a>
                            </li>
                            <li className="mr-1">
                                <a
                                    className={`inline-block py-2 px-4 font-semibold ${activeTab === 'Edit' ? 'text-blue-500 border-b-2 border-blue-500 cursor-pointer' : 'text-gray-500 hover:text-gray-800 cursor-pointer'}`}
                                    onClick={() => handleTabClick('Edit')}
                                >
                                    Edit
                                </a>
                            </li>
                            <li className="mr-1">
                                <a
                                    className={`inline-block py-2 px-4 font-semibold ${activeTab === 'Addwork' ? 'text-blue-500 border-b-2 border-blue-500 cursor-pointer' : 'text-gray-500 hover:text-gray-800 cursor-pointer'}`}
                                    onClick={() => handleTabClick('Addwork')}
                                >
                                    Add Work
                                </a>
                            </li>
                        </ul>
                    </div>
                    {activeTab === 'Overview' && (
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Goal Details: {goalTypeName}</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <span className="w-1/3 font-bold">Goal Type:</span>
                                    <span className="w-2/3">{goalTypeName}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-1/3 font-bold">Subject:</span>
                                    <span className="w-2/3">{subject}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-1/3 font-bold">Target:</span>
                                    <span className="w-2/3">{targetAchievement}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-1/3 font-bold">Progress:</span>
                                    <span className="w-2/3">{initialData.progress_bar !== undefined && initialData.progress_bar !== null ? `${initialData.progress_bar}%` : ''}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-1/3 font-bold">Start Date:</span>
                                    <span className="w-2/3">{startDate}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-1/3 font-bold">End Date:</span>
                                    <span className="w-2/3">{endDate}</span>
                                </div>
                            </div>
                            <h2 className="text-lg font-semibold mt-6 mb-4">Related Work</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <span className="w-1/3 font-bold">Project:</span>
                                    <span className="w-2/3">{projects.find(p => p.id === data?.project_id)?.title || '-'}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-1/3 font-bold">Task:</span>
                                    <span className="w-2/3">{tasks.find(t => t.id === data?.task_id)?.title || '-'}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-1/3 font-bold">Training Sessions:</span>
                                    <span className="w-2/3">{trainings.find(t => t.id === data?.training_id)?.training_skill || '-'}</span>
                                </div>
                            </div>
                            <h2 className="text-lg font-semibold mt-6 mb-4">Description</h2>
                            <p>{description}</p>
                        </div>
                    )}
                    {activeTab === 'Edit' && (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="mb-4 md:col-span-1">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goalType">
                                    Goal Type
                                    </label>
                                    <div className="relative">
                                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="goalType" value={selectedGoalType} onChange={(e) => setSelectedGoalType(parseInt(e.target.value))}>
                                        {goalTypes?.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.goal_type}
                                            </option>
                                        ))}
                                    </select>
                                    </div>
                                </div>
                                <div className="mb-4 md:col-span-1">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                                    Subject
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subject" name="subject" type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}/>
                                </div>
                                <div className="mb-4 md:col-span-1">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetAchievement">
                                    Target Achievement
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="targetAchievement" name="targetAchievement" type="text" placeholder="Target Achievement" value={targetAchievement} onChange={(e) => setTargetAchievement(e.target.value)}/>
                                </div>
                                <div className="mb-4 md:col-span-1">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                                    Start Date
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startDate" name="start_date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                </div>
                                <div className="mb-4 md:col-span-1">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                                    End Date
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endDate" name="end_date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                </div>
                                <div className="mb-4 md:col-span-1">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                                    Status
                                    </label>
                                    <div className="relative">
                                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option>Started</option>
                                        <option>Not Started</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="mb-4 md:col-span-1">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="progress">
                                        Progress
                                    </label>
                                    <input
                                        className="w-full"
                                        type="range"
                                        id="progress"
                                        name="progress"
                                        min="0"
                                        max="100"
                                        value={progress}
                                        onChange={(e) => setProgress(parseInt(e.target.value))}
                                    />
                                    <output htmlFor="progress">{progress}%</output>
                                </div>
                                <div className="mb-4 md:col-span-3">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description
                                    </label>
                                    <ReactQuill theme="snow" value={description} onChange={(value) => setDescription(value)} />
                                </div>
                            </div>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 ml-auto" onClick={handleUpdateGoal}>Update Goal</button>
                        </div>
                    )}
                    {activeTab === 'Addwork' && (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="mb-4 md:col-span-1">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="project">
                                    Project
                                    </label>
                                    <div className="relative">
                                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="project" value={selectedProjectId} onChange={(e) => setSelectedProjectId(parseInt(e.target.value))}>
                                        <option value="" disabled>Select Project</option>
                                        {projects.map((project) => (
                                            <option key={project.id} value={project.id}>
                                                {project.title}
                                            </option>
                                        ))}
                                    </select>
                                    </div>
                                </div>
                                <div className="mb-4 md:col-span-1">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task">
                                    Task
                                    </label>
                                    <div className="relative">
                                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="task" value={selectedTaskId} onChange={(e) => setSelectedTaskId(parseInt(e.target.value))}>
                                        <option value="" disabled>Select Task</option>
                                        {tasks.map((task) => (
                                            <option key={task.id} value={task.id}>
                                                {task.title}
                                            </option>
                                        ))}
                                    </select>
                                    </div>
                                </div>
                                <div className="mb-4 md:col-span-1">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trainingSession">
                                    Training Session
                                    </label>
                                    <div className="relative">
                                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="trainingSession" value={selectedTrainingId} onChange={(e) => setSelectedTrainingId(parseInt(e.target.value))}>
                                        <option value="" disabled>Select Training</option>
                                        {trainings.map((training) => (
                                            <option key={training.id} value={training.id}>
                                                {training.training_skill}
                                            </option>
                                        ))}
                                    </select>
                                    </div>
                                </div>
                            </div>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 ml-auto" onClick={handleAddWork}>Add Work</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GoalsDetails;

