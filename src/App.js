import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginSignup from './Components/LoginSignup/LoginSignup'
import LandingPage from './Components/LandingPage/LandingPage';
import SideBar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import PayrollRouter from './Components/Payroll/PayrollRouter';
import TasksRouter from './Components/Tasks/TasksRouter';
import AttendancesRouter from './Components/Attendances/AttendancesRouter';
import CoreHRRouter from './Components/CoreHR/CoreHRRouter';
import EmployeesRouter from './Components/Employees/EmployeesRouter';
import PerformanceRouter from './Components/Performances/PerformanceRouter';
import RecruitmentRouter from './Components/Recruitment/RecruitmentRouter';
import TrainingRouter from './Components/Training/TrainingRouter';
import Helpdesk from './Components/Helpdesk/Helpdesk';
import TicketDetails from './Components/Helpdesk/TicketDetails';
import ClientList from './Components/ManageClient/ClientList';
import ClientDetails from './Components/ManageClient/ClientDetails';

// eslint-disable-next-line
function App() {
    return ( 
        <Router>
            <Routes >
            <Route path = "/" element = { < LandingPage / > }/>  
            <Route path = "/loginsignup" element = { < LoginSignup / > }/>  
            <Route path = "/*" element = { < DashboardLayout / > }/>  
            </Routes > 
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Router>
    );
}

function DashboardLayout() {
    return (
        <div style = {{ display: "flex" } } >
        <SideBar / >
            <Routes >
            <Route path = "/dashboard" element = { < Dashboard / > }/>   
            <Route path = "/employees/*" element = { < EmployeesRouter / > }/>   
            <Route path = "/payroll/*" element = { < PayrollRouter / > }/>  
            <Route path = "/attendances/*" element = { < AttendancesRouter / > }/>  
            <Route path = "/tasks/*" element = { < TasksRouter / > }/>    
            <Route path = "/performance/*" element = { < PerformanceRouter / > }/> 
            <Route path = "/corehr/*" element = { < CoreHRRouter /> }/>  
            <Route path = "/recruitment/*" element = { < RecruitmentRouter/> } />
            <Route path = "/training/*" element = { < TrainingRouter /> } />
            <Route path = "/helpdesk" element = { < Helpdesk/> } />
            <Route path="/helpdesk/ticket-details/:ticketId" element={<TicketDetails />} />
            <Route path = "/client-list" element = { < ClientList/> } />
            <Route path = "/client-list/client-details/:id" element = { < ClientDetails/> } />
            </Routes > 
        </div>
    );
}
export default App;