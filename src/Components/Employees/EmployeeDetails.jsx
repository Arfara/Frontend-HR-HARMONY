import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { APIEmployees } from '@/Apis/APIEmployees';
import { APICoreHR } from '@/Apis/APICoreHR';
import Header from '../Header/Header';

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employeeDetails } = location.state || {};
  const [selectedMenu, setSelectedMenu] = useState("");
  const [activeTab, setActiveTab] = useState('Bio');
  const [updatedData, setUpdatedData] = useState({});
  const [roles, setRoles] = useState([]);
  const [shift, setShift] = useState([]);
  const [department, setDepartment] = useState([]);
  const [designation, setDesignation] = useState([]);

  useEffect(() => {
    if (employeeDetails) {
        setUpdatedData({
            ...employeeDetails.employee,
            status: employeeDetails.employee.is_active ? 'Active' : 'Inactive'
        });
    }
    fetchRoles();
    fetchShift();
    fetchDepartment();
    fetchDesignation();
  }, [employeeDetails]);

  const fetchRoles = async () => {
      try {
          const rolesData = await APIEmployees.getRoles();
          setRoles(rolesData.roles || []);
      } catch (error) {
        throw error;
      }
  };

  const fetchShift = async () => {
    try {
        const shiftData = await APIEmployees.getOfficeShiftsNonPagination();
        setShift(shiftData.shifts || []);
    } catch (error) {
        throw error;
    }
  };

  const fetchDepartment = async () => {
    try {
        const departmentData = await APICoreHR.getAllDepartmentsNonPagination();
        setDepartment(departmentData.departments || []);
    } catch (error) {
        throw error;
    }
  };

  const fetchDesignation = async () => {
    try {
        const designationData = await APICoreHR.getAllDesignationsNonPagination();
        setDesignation(designationData.designations || []);
    } catch (error) {
        throw error;
    }
  };

  const handleMenuClick = (menu) => {
      setSelectedMenu(menu);
  };

  const handleTabClick = (tab) => {
      setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData(prev => ({
        ...prev,
        [name]: value
    }));
  };

  const handleSaveBasicInfo = async (e) => {
    e.preventDefault();
    const dataToUpdate = {
        first_name: updatedData.first_name,
        last_name: updatedData.last_name,
        is_active: updatedData.status === 'Active',
        contact_number: updatedData.contact_number,
        gender: updatedData.gender,
        marital_status: updatedData.marital_status,
        role_id: parseInt(updatedData.role_id, 10),
        shift_id: parseInt(updatedData.shift_id, 10),
        department_id: parseInt(updatedData.department_id, 10),
        designation_id: parseInt(updatedData.designation_id, 10),
        religion: updatedData.religion,
        blood_group: updatedData.blood_group,
        nationality: updatedData.nationality,
        citizenship: updatedData.citizenship,
        bpjs_kesehatan: updatedData.bpjs_kesehatan,
        basic_salary: parseInt(updatedData.basic_salary, 10),
        address1: updatedData.address1,
        address2: updatedData.address2,
        city: updatedData.city,
        state_province: updatedData.state_province,
        zip_postal_code: updatedData.zip_postal_code,
    };

    try {
        const response = await APIEmployees.updateEmployee(employeeDetails.employee.id, dataToUpdate);
        navigate("/employees/staff-list");
    } catch (error) {
        throw error;
    }
  };

  const handleSaveBio = async (e) => {
      e.preventDefault();
      const dataToUpdate = { bio: updatedData.bio };
      try {
          const response = await APIEmployees.updateEmployee(employeeDetails.employee.id, dataToUpdate);
          navigate("/employees/staff-list");
      } catch (error) {
        throw error;
      }
  };

  const handleSaveSocialProfile = async (e) => {
      e.preventDefault();
      const dataToUpdate = {
          facebook_url: updatedData.facebook_url,
          instagram_url: updatedData.instagram_url,
          twitter_url: updatedData.twitter_url,
          linkedin_url: updatedData.linkedin_url,
      };

      try {
          const response = await APIEmployees.updateEmployee(employeeDetails.employee.id, dataToUpdate);
          navigate("/employees/staff-list");
      } catch (error) {
        throw error;
      }
  };

  const handleSaveBankInfo = async (e) => {
      e.preventDefault();
      const dataToUpdate = {
          account_title: updatedData.account_title,
          account_number: updatedData.account_number,
          bank_name: updatedData.bank_name,
          iban: updatedData.iban,
          swift_code: updatedData.swift_code,
          bank_branch: updatedData.bank_branch,
      };

      try {
          const response = await APIEmployees.updateEmployee(employeeDetails.employee.id, dataToUpdate);
          navigate("/employees/staff-list");
      } catch (error) {
        throw error;
      }
  };

  const handleSaveEmergencyContact = async (e) => {
      e.preventDefault();
      const dataToUpdate = {
          emergency_contact_full_name: updatedData.emergency_contact_full_name,
          emergency_contact_number: updatedData.emergency_contact_number,
          emergency_contact_email: updatedData.emergency_contact_email,
          emergency_contact_address: updatedData.emergency_contact_address,
      };

      try {
          const response = await APIEmployees.updateEmployee(employeeDetails.employee.id, dataToUpdate);
          navigate("/employees/staff-list");
      } catch (error) {
        throw error;
      }
  };

  const handleSaveAccountInfo = async (e) => {
      e.preventDefault();
      const dataToUpdate = {
          username: updatedData.username,
          email: updatedData.email,
      };

      try {
          const response = await APIEmployees.updateEmployee(employeeDetails.employee.id, dataToUpdate);
          navigate("/employees/staff-list");
      } catch (error) {
        throw error;
      }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    const dataToUpdate = {
      new_password: updatedData.new_password,
      repeat_password: updatedData.repeat_password,
    };
    try {
      const response = await APIEmployees.changePassword(employeeDetails.employee.id, dataToUpdate, 'YOUR_TOKEN_HERE');
      navigate("/employees/staff-list");
    } catch (error) {
      throw error;
    }
  };

  const renderChangePasswordTab = (updatedData, handleChange, handleSavePassword) => (
      <div>
          <div className="px-4 py-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-8">Change Password</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderFormField("New Password", "curent_password", "password", updatedData, handleChange)}
                  {renderFormField("Repeat Password", "new_password", "password", updatedData, handleChange)}
              </div>
              <div className="flex justify-end bg-white-200 px-4 py-3">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleSavePassword}>Change Password</button>
              </div>
          </div>
      </div>
  );

  const renderAccountInformationTab = (updatedData, handleChange, handleSaveAccountInfo) => (
      <div>
          <div className="px-4 py-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-8">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderFormField("Username", "username", "text", updatedData, handleChange)}
                  {renderFormField("Email", "email", "email", updatedData, handleChange)}
              </div>
              <div className="flex justify-end bg-white-200 px-4 py-3">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleSaveAccountInfo}>Update Account Info</button>
              </div>
          </div>
      </div>
  );

  const renderContent = () => {
      switch (selectedMenu) {
          default:
              return (
                  <div>
                      <div className="bg-white shadow-md rounded-lg mb-4">
                          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                              <h2 className="text-xl font-bold text-gray-700">Basic Information</h2>
                          </div>
                          <div className="px-4 py-2">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {renderFormField("First Name", "first_name", "text", updatedData, handleChange)}
                                  {renderFormField("Last Name", "last_name", "text", updatedData, handleChange)}
                                  {renderFormField("Employee ID", "id", "text", updatedData, handleChange, true)}
                                  {renderFormField("Date of Birth", "date_of_birth", "date", updatedData, handleChange)}
                                  {renderSelectField("Status", "status", ["Active", "Inactive"], updatedData, handleChange)}
                                  {renderFormField("Contact Number", "contact_number", "number", updatedData, handleChange)}
                                  {renderSelectField("Gender", "gender", ["Male", "Female"], updatedData, handleChange)}
                                  {renderSelectField("Marital Status", "marital_status", ["Married", "Single"], updatedData, handleChange)}
                                  {renderRoleSelectField("Role", "role_id", roles, updatedData, handleChange)}
                                  {renderShiftSelectField("Shift", "shift_id", shift, updatedData, handleChange)}
                                  {renderDepartmentSelectField("Department", "department_id", department, updatedData, handleChange)}
                                  {renderDesignationSelectField("Designation", "designation_id", designation, updatedData, handleChange)}
                                  {renderSelectField("Religion", "religion", ["Islam", "Katholik", "Protestan", "Konghucu", "Buddha"], updatedData, handleChange)}
                                  {renderSelectField("Blood Group", "blood_group", ["A", "B", "AB", "O"], updatedData, handleChange)}
                                  {renderSelectField("Nationality", "nationality", ["Warga Negara Indonesia", "Warga Negara Asing"], updatedData, handleChange)}
                                  {renderSelectField("Citizenship", "citizenship", ["Indonesia", "Malaysia"], updatedData, handleChange)}
                                  {renderFormField("BPJS Kesehatan", "bpjs_kesehatan", "text", updatedData, handleChange)}
                                  {renderFormField("Basic Salary", "basic_salary", "text", updatedData, handleChange)}
                                  {renderTextArea("Address 1", "address1", updatedData, handleChange)}
                                  {renderTextArea("Address 2", "address2", updatedData, handleChange)}
                                  {renderFormField("City", "city", "text", updatedData, handleChange)}
                                  {renderFormField("State/Province", "state_province", "text", updatedData, handleChange)}
                                  {renderFormField("Zip Code / Postal Code", "zip_postal_code", "text", updatedData, handleChange)}
                              </div>

                              <div className="flex justify-end bg-gray-200 px-4 py-3">
                                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none mr-2">Reset</button>
                                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleSaveBasicInfo}>Save</button>
                              </div>
                          </div>
                      </div>
                  </div>
              );
          case "personalInformation":
              return (
                  <div className="w-full lg:w-3/4">
                      <div className="bg-white p-6 rounded shadow">
                          <div className="mb-6">
                              <h2 className="text-xl font-semibold text-gray-800 mb-8">Personal Information</h2>
                              <ul className="flex border-b">
                                  {renderTab("Bio", activeTab, handleTabClick)}
                                  {renderTab("Social Profile", activeTab, handleTabClick)}
                                  {renderTab("Bank Account", activeTab, handleTabClick)}
                                  {renderTab("Emergency Contact", activeTab, handleTabClick)}
                              </ul>
                          </div>
                          {activeTab === 'Bio' && renderBioTab(updatedData, handleChange, handleSaveBio)}
                          {activeTab === 'Social Profile' && renderSocialProfileTab(updatedData, handleChange, handleSaveSocialProfile)}
                          {activeTab === 'Bank Account' && renderBankAccountTab(updatedData, handleChange, handleSaveBankInfo)}
                          {activeTab === 'Emergency Contact' && renderEmergencyContactTab(updatedData, handleChange, handleSaveEmergencyContact)}
                      </div>
                  </div>
              );
          case "accountInformation":
              return renderAccountInformationTab(updatedData, handleChange, handleSaveAccountInfo);
          case "changePassword":
              return renderChangePasswordTab(updatedData, handleChange, handleSavePassword);
      }
  };

  const renderFormField = (label, name, type, updatedData, handleChange, readOnly = false) => (
      <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
          <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={name}
              name={name}
              type={type}
              placeholder={label}
              value={updatedData[name] !== undefined ? updatedData[name] : ''}
              onChange={handleChange}
              readOnly={readOnly}
          />
      </div>
  );

  const renderSelectField = (label, name, options, updatedData, handleChange) => (
      <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
          <div className="relative">
              <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={name}
                  name={name}
                  value={updatedData[name] !== undefined ? updatedData[name] : ''}
                  onChange={handleChange}
              >
                  {options.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
          </div>
      </div>
  );

  const renderRoleSelectField = (label, name, roles, updatedData, handleChange) => (
      <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
          <div className="relative">
              <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={name}
                  name={name}
                  value={updatedData[name] !== undefined ? updatedData[name] : employeeDetails?.employee?.role_id || ''}
                  onChange={handleChange}
              >
                  {roles.map(role => <option key={role.id} value={role.id}>{role.role_name}</option>)}
              </select>
          </div>
      </div>
  );

  const renderDepartmentSelectField = (label, name, department, updatedData, handleChange) => (
      <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
          <div className="relative">
              <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-7000 leading-tight focus:outline-none focus:shadow-outline"
                  id={name}
                  name={name}
                  value={updatedData[name] !== undefined ? updatedData[name] : ''}
                  onChange={handleChange}
              >
                  {department.map(department => <option key={department.id} value={department.id}>{department.department_name}</option>)}
              </select>
          </div>
      </div>
  );

  const renderShiftSelectField = (label, name, shift, updatedData, handleChange) => (
      <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
          <div className="relative">
              <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-7000 leading-tight focus:outline-none focus:shadow-outline"
                  id={name}
                  name={name}
                  value={updatedData[name] !== undefined ? updatedData[name] : ''}
                  onChange={handleChange}
              >
                  {shift.map(shift => <option key={shift.id} value={shift.id}>{shift.shift_name}</option>)}
              </select>
          </div>
      </div>
  );

  const renderDesignationSelectField = (label, name, designation, updatedData, handleChange) => (
      <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
          <div className="relative">
              <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-7000 leading-tight focus:outline-none focus:shadow-outline"
                  id={name}
                  name={name}
                  value={updatedData[name] !== undefined ? updatedData[name] : ''}
                  onChange={handleChange}
              >
                  {designation.map(designation => <option key={designation.id} value={designation.id}>{designation.designation_name}</option>)}
              </select>
          </div>
      </div>
  );

  const renderTextArea = (label, name, updatedData, handleChange) => (
      <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>
          <textarea
              name={name}
              id={name}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={label}
              value={updatedData[name] !== undefined ? updatedData[name] : ''}
              onChange={handleChange}
          ></textarea>
      </div>
  );

  const renderTab = (tabName, activeTab, handleTabClick) => (
      <li className={`mr-1 ${activeTab === tabName ? '-mb-px' : ''}`}>
          <a
              className={`inline-block py-2 px-4 font-semibold ${activeTab === tabName ? 'text-blue-500 border-b-2 border-blue-500 cursor-pointer' : 'text-gray-500 hover:text-gray-800 cursor-pointer'}`}
              onClick={() => handleTabClick(tabName)}
          >
              {tabName}
          </a>
      </li>
  );

  const renderBioTab = (updatedData, handleChange, handleSaveBio) => (
      <div>
          <div className="mb-4 md:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">Bio</label>
              <textarea
                  name="bio"
                  id="bio"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Staff Bio Here"
                  value={updatedData.bio !== undefined ? updatedData.bio : ''}
                  onChange={handleChange}
              ></textarea>
          </div>
          <div className="flex justify-end bg-white-200 px-4 py-3">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleSaveBio}>Update Bio</button>
          </div>
      </div>
  );

  const renderSocialProfileTab = (updatedData, handleChange, handleSaveSocialProfile) => (
      <div>
          {renderFormField("Facebook", "facebook_url", "link", updatedData, handleChange)}
          {renderFormField("Instagram", "instagram_url", "link", updatedData, handleChange)}
          {renderFormField("Twitter", "twitter_url", "link", updatedData, handleChange)}
          {renderFormField("LinkedIn", "linkedin_url", "link", updatedData, handleChange)}
          <div className="flex justify-end bg-white-200 px-4 py-3">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleSaveSocialProfile}>Update Social</button>
          </div>
      </div>
  );

  const renderBankAccountTab = (updatedData, handleChange, handleSaveBankInfo) => (
      <div>
          <div className="px-4 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderFormField("Account Title", "account_title", "text", updatedData, handleChange)}
                  {renderFormField("Account Number", "account_number", "number", updatedData, handleChange)}
                  {renderFormField("Bank Name", "bank_name", "text", updatedData, handleChange)}
                  {renderFormField("IBAN", "iban", "number", updatedData, handleChange)}
                  {renderFormField("Swift Code", "swift_code", "text", updatedData, handleChange)}
                  {renderFormField("Bank Branch", "bank_branch", "text", updatedData, handleChange)}
              </div>
              <div className="flex justify-end bg-white-200 px-4 py-3">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleSaveBankInfo}>Update Bank Info</button>
              </div>
          </div>
      </div>
  );

  const renderEmergencyContactTab = (updatedData, handleChange, handleSaveEmergencyContact) => (
      <div>
          <div className="px-4 py-2">
              <div className="mb-4 md:col-span-1">
                  {renderFormField("Full Name", "emergency_contact_full_name", "text", updatedData, handleChange)}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {renderFormField("Contact Number", "emergency_contact_number", "number", updatedData, handleChange)}
                      {renderFormField("Email", "emergency_contact_email", "email", updatedData, handleChange)}
                  </div>
                  {renderTextArea("Address", "emergency_contact_address", updatedData, handleChange)}
              </div>
              <div className="flex justify-end bg-white-200 px-4 py-3">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleSaveEmergencyContact}>Update Contact</button>
              </div>
          </div>
      </div>
  );

  return (
      <div>
          <Header />
          <div className="w-full mx-auto p-10 bg-white-50">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/4">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="flex items-center mb-6">
                          <div>
                              <p className="text-gray-900 font-semibold text-2xl">{employeeDetails?.employee?.first_name || ""} {employeeDetails?.employee?.last_name || ""}</p>
                              <p className="text-gray-500 text-sm">{employeeDetails?.employee?.role || ""}</p>
                          </div>
                      </div>
                      <div className="mb-4">
                          <p className="text-gray-600 text-sm">Email:</p>
                          <p className="text-gray-800 text-sm font-medium">{employeeDetails?.employee?.email || ""}</p>
                      </div>
                      <nav className="flex flex-col space-y-2">
                          <button className="py-3 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onClick={() => handleMenuClick("default")}>Basic Information</button>
                          <button className="py-3 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onClick={() => handleMenuClick("personalInformation")}>Personal Information</button>
                          <button className="py-3 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onClick={() => handleMenuClick("accountInformation")}>Account Information</button>
                          <button className="py-3 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onClick={() => handleMenuClick("changePassword")}>Change Password</button>
                      </nav>
                  </div>
                </div>

                <div className="w-full lg:w-3/4">
                    <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
                        {renderContent()}
                    </div>
                </div>
              </div>
          </div>
      </div>
  );
};

export default EmployeeDetails;

