import React from 'react';
import './TasksRouter.css';
import Header from '../Header/Header';
import TasksList from './TasksList';
import Projects from './Projects';
import TaskDetails from './TaskDetails';
import ProjectDetails from './ProjectDetails';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { GrTasks } from 'react-icons/gr';
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

const TasksRouter = () => {
  const navigate = useNavigate();
    return (
        <div>
            <Header/>
            <div className='tasks-navigation'>
                <div className='feature' onClick={() => navigate('/tasks/tasks-list')}>
                    <GrTasks className='icon'/>
                    <span>Tasks</span>
                </div>

                <div className='feature' onClick={() => navigate('/tasks/project-list')}>
                    <AiOutlineFundProjectionScreen className='icon'/>
                    <span>Projects</span>
                </div>
            </div>

            <Routes>
                <Route path='tasks-list' element = {<TasksList/>}/>
                <Route path='project-list' element = {<Projects/>}/>
                <Route path='/task-details/:taskId' element={<TaskDetails/>}/>
                <Route path='/project-details/:projectId' element={<ProjectDetails/>}/>
            </Routes>
        </div>
  )
}

export default TasksRouter