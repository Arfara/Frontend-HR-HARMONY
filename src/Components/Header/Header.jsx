import React, { useState } from 'react';
import './Header.css';
import headerData from './HeaderData';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  

  const handleLogout = () => {
    AuthService.clearCredentialsFromCookie();
    navigate('/loginsignup');
  };

  return (
    <div className="main-header">
      <div className="nav-buttons">
        {headerData.map((item) => (
          <button key={item.id} className="nav-button">
            {item.icon}
          </button>
        ))}
      </div>
      <div className="profile-icon" onClick={toggleDropdown}>
        <FaUserCircle size={30} color="#fff" />
        {showDropdown && (
          <div className="dropdown">
            <ul>
              <li>
                <FaCog className="dropdown-icon" />
                Profile
              </li>
              <li onClick={handleLogout}>
                <FaSignOutAlt className="dropdown-icon" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
