import React from 'react';
import "./RecruitmentRouter.css";
import Header from '../Header/Header';
import NewOpening from './NewOpening';
import EditJobs from './EditJobs';
import JobDetails from './JobDetails';
import { Route, Routes, useNavigate } from 'react-router-dom';

const RecruitmentRouter = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="new-opening" element = {< NewOpening />}/>
                <Route path="edit-job/:id" element = {<EditJobs/>}/>
                <Route path="job-details/:id" element = {<JobDetails/>}/>
            </Routes>
        </div>
        )
}

export default RecruitmentRouter