import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { FaCalendar, FaUserClock, FaClipboardList, FaClock } from 'react-icons/fa';
import './EmployeesRouter.css';
import Employees from './Employees';
import EmployeesExit from './EmployeesExit';
import RolesPrivileges from './RolesPrivileges';
import ShiftScheduling from './ShiftScheduling';
import ExitType from './ExitType';
import EmployeeDetails from './EmployeeDetails';
import Header from '../Header/Header';

const EmployeesRouter = () => {
  const navigate = useNavigate();
    return (
      <div>
        <Header /> 
        <div className="employees-router-container">
          <div className="feature" onClick={() => navigate('/employees/staff-list')}>
              <FaCalendar className="icon" />
              <span>Employees</span>
            </div>
          
            <div className="feature" onClick={() => navigate('/employees/roles-privileges')}>
              <FaUserClock className="icon" />
              <span>Roles & Privileges</span>
            </div>
            
            <div className="feature" onClick={() => navigate('/employees/shift-scheduling')}>
              <FaClipboardList className="icon" />
              <span>Shift Scheduling</span>
            </div>
          
            <div className="feature" onClick={() => navigate('/employees/employees-exit')}>
              <FaClock className="icon" />
              <span>Employees Exit</span>
            </div>
          </div>

          <Routes>
              <Route path="staff-list" element={< Employees />} />
              <Route path="roles-privileges" element={< RolesPrivileges />} />
              <Route path="shift-scheduling" element={< ShiftScheduling />} />
              <Route path="employees-exit" element={< EmployeesExit />} />
              <Route path="exit-type" element={< ExitType />} />
              <Route path="employee-details/:id" element={< EmployeeDetails />} />
          </Routes>

        </div>
    );
  };

export default EmployeesRouter;