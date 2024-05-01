import React from 'react';
import './TrainingRouter.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import TrainingSessions from './TrainingSessions';
import Trainers from './Trainers';
import TrainingSkills from './TrainingSkills';
import TrainingDetails from './TrainingDetails';
import { IoBookSharp } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdEngineering } from "react-icons/md";

const TrainingRouter = () => {
    const navigate = useNavigate();
        return (
            <div>
                <Header/>
                <div className='training-navigation'>
                    <div className='feature' onClick={() => navigate ('/training/training-sessions')}>
                        <IoBookSharp className='icon'/>
                        <span>Training Sessions</span>
                    </div>

                    <div className='feature' onClick={() => navigate ('/training/trainers')}>
                        <LiaChalkboardTeacherSolid className='icon'/>
                        <span>Trainers</span>
                    </div>

                    <div className='feature' onClick={() => navigate ('/training/training-skills')}>
                        <MdEngineering className='icon'/>
                        <span>Training Skills</span>
                    </div>

                </div>
                <Routes>
                    <Route path = 'training-sessions' element = { <TrainingSessions/> }/>
                    <Route path = 'trainers' element = { <Trainers/> }/>
                    <Route path = 'training-skills' element = { <TrainingSkills/> }/>
                    <Route path = 'training-details/:id' element = {<TrainingDetails/>}/>
                </Routes>
            </div>
        )
}

export default TrainingRouter