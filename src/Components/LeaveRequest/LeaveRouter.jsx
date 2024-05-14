import React from 'react';
import './LeaveRouter.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import ManageLeaves from './ManageLeaves';
import LeaveType from './LeaveType';
import { IoBookSharp } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

const LeaveRouter = () => {
    const navigate = useNavigate();
        return (
            <div>
                <Header/>
                <div className='leave-navigation'>
                    <div className='feature' onClick={() => navigate ('/leave/manage-leave')}>
                        <IoBookSharp className='icon'/>
                        <span>Manage Leaves</span>
                    </div>

                    <div className='feature' onClick={() => navigate ('/leave/leave-type')}>
                        <LiaChalkboardTeacherSolid className='icon'/>
                        <span>Leave Type</span>
                    </div>
                </div>
                <Routes>
                    <Route path = 'manage-leave' element = { <ManageLeaves/> }/>
                    <Route path = 'leave-type' element = { <LeaveType/> }/>
                </Routes>
            </div>
        )
}

export default LeaveRouter

