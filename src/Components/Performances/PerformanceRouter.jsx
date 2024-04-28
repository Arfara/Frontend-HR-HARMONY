import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { FaCalendar, FaUserClock, FaClipboardList, FaClock } from 'react-icons/fa';
import './PerformanceRouter.css';
import PerformanceIndicator from './PerformanceIndicator';
import PerformanceAppraisal from './PerformanceAppraisal'
import TrackGoals from './TrackGoals';
import GoalType from './GoalType';
import IndicatorDetails from './IndicatorDetails';
import AppraisalDetails from './AppraisalDetails';
import GoalsDetails from './GoalsDetails';
import Header from '../Header/Header';

const PerformanceRouter = () => {
  const navigate = useNavigate();
    return (
      <div>
        <Header /> 
        <div className="performance-container">
          <div className="feature" onClick={() => navigate('/performance/performance-indicator')}>
              <FaCalendar className="icon" />
              <span>KPI (Indicator)</span>
            </div>
          
            <div className="feature" onClick={() => navigate('/performance/performance-appraisal')}>
              <FaUserClock className="icon" />
              <span>KPA (Appraisal)</span>
            </div>
            
            <div className="feature" onClick={() => navigate('/performance/track-goals')}>
              <FaClipboardList className="icon" />
              <span>Track Goals (OKRs)</span>
            </div>

            <div className="feature" onClick={() => navigate('/performance/goal-type')}>
              <FaClock className="icon" />
              <span>Goal Type</span>
            </div>
          </div>

          <Routes>
              <Route path="performance-indicator" element={< PerformanceIndicator />} />
              <Route path="performance-appraisal" element={< PerformanceAppraisal />} />
              <Route path="track-goals" element={< TrackGoals />} />
              <Route path="goal-type" element={< GoalType />} />
              <Route path='indicator-details/:id' element = {<IndicatorDetails/>}/>
              <Route path='appraisal-details/:id' element = {<AppraisalDetails/>}/>
              <Route path='goals-details/:id' element = {<GoalsDetails/>}/>
          </Routes>

        </div>
    );
  };

export default PerformanceRouter;