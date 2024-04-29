import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const ClientDetails = () => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState("");
    const [activeTab, setActiveTab] = useState('Bio');

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    const renderContent = () => {
        switch (selectedMenu) {
            default:
                return <div>
                    <div className="bg-white shadow-md rounded-lg mb-4">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-700">Basic Information</h2>
                    </div>
                    <div className="px-4 py-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                First Name
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" name="firstName" type="text" placeholder="First Name"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" name="lastName" type="text" placeholder="Last Name"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeID">
                                Employee ID
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employeeID" name="employeeID" type="employeeID" placeholder="Employee ID"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateofBirth">
                                Date of Birth
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dateofBirth" name="dateofBirth" type="date"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                                Status
                                </label>
                                <div className="relative">
                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="status">
                                    <option>Active</option>
                                    <option>Banned</option>
                                </select>
                                </div>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
                                Contact Number
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contactNumber" name="contactNumber" type="number" placeholder="Contact Number"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                                Gender
                                </label>
                                <div className="relative">
                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gender">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                                </div>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maritalStatus">
                                    Marital Status
                                </label>
                                <div className="relative">
                                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="maritalStatus">
                                        <option value="">Married</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                                Role
                                </label>
                                <div className="relative">
                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role">
                                    <option>Employee</option>
                                    <option>Manager</option>
                                </select>
                                </div>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="religion">
                                Religion
                                </label>
                                <div className="relative">
                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="religion">
                                    <option>Islam</option>
                                    <option>Katholik</option>
                                    <option>Protestan</option>
                                    <option>Konghucu</option>
                                    <option>Buddha</option>
                                </select>
                                </div>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloodGroup">
                                Blood Group
                                </label>
                                <div className="relative">
                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bloodGroup">
                                    <option>A</option>
                                    <option>B</option>
                                    <option>AB</option>
                                    <option>O</option>
                                </select>
                                </div>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nationality">
                                Nationality
                                </label>
                                <div className="relative">
                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nationality">
                                    <option>Warga Negara Indonesia</option>
                                    <option>Warga Negara Asing</option>
                                    <option>Ini harusnya isinya nama negara2 tapi gua gatau cara buat yang bisa langsung list semua negara ri</option>
                                </select>
                                </div>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="citizenship">
                                Citizenship
                                </label>
                                <div className="relative">
                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nationality">
                                    <option>Indonesia</option>
                                    <option>Malaysia</option>
                                    <option>Ini harusnya isinya nama negara2 tapi gua gatau cara buat yang bisa langsung list semua negara ri</option>
                                </select>
                                </div>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bpjs">
                                BPJS Kesehatan
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bpjs" name="bpjs" type="text" placeholder="BPJS"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="basicSalary">
                                Basic Salary
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="basicSalary" name="basicSalary" type="text" placeholder="Basic Salary"/>
                            </div>
                            <div className="mb-4 md:col-span-2 lg:col-span-2">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_picture">
                                  Profile Picture
                              </label>
                              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="profile_picture" type="file" />
                            </div>
                            <div className="mb-4 md:col-span-1"> 
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address1">
                                Address 1
                                </label>
                                <textarea name="address1" id="address1" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder=" Address 1"></textarea>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address2">
                                Address 2
                                </label>
                                <textarea name="address2" id="address2" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder=" Address 2"></textarea>
                            </div>
                            <div className="mb-4 md:col-span-1">
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                                City
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" name="city" type="city" placeholder="City"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                                State/Province
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="state" name="state" type="state" placeholder="State/Province"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">
                                Zip Code / Postal Code
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="postalCode" name="postalCode" type="postalCode" placeholder="ZIP/Postal Code"/>
                            </div>
                        </div>
                        <div className="flex justify-end bg-gray-200 px-4 py-3">
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none mr-2">Reset</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Save</button>
                        </div>
                    </div>
                </div>
                </div>;
            case "personalInformation":
                return <div className="w-full lg:w-3/4">
                    <div className="bg-white p-6 rounded shadow">
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h2>
                        <ul className="flex border-b">
                          <li className="-mb-px mr-1">
                            <a
                              className={`inline-block py-2 px-4 font-semibold ${activeTab === 'Bio' ? 'text-blue-500 border-b-2 border-blue-500 cursor-pointer' : 'text-gray-500 hover:text-gray-800 cursor-pointer'}`}
                              onClick={() => handleTabClick('Bio')}
                            >
                              Bio
                            </a>
                          </li>
                          <li className="mr-1">
                            <a
                              className={`inline-block py-2 px-4 font-semibold ${activeTab === 'SocialProfile' ? 'text-blue-500 border-b-2 border-blue-500 cursor-pointer' : 'text-gray-500 hover:text-gray-800 cursor-pointer'}`}
                              onClick={() => handleTabClick('SocialProfile')}
                            >
                              Social Profile
                            </a>
                          </li>
                          <li className="mr-1">
                            <a
                              className={`inline-block py-2 px-4 font-semibold ${activeTab === 'BankAccount' ? 'text-blue-500 border-b-2 border-blue-500 cursor-pointer' : 'text-gray-500 hover:text-gray-800 cursor-pointer'}`}
                              onClick={() => handleTabClick('BankAccount')}
                            >
                              Bank Account
                            </a>
                          </li>
                          <li className="mr-1">
                            <a
                              className={`inline-block py-2 px-4 font-semibold ${activeTab === 'EmergencyContact' ? 'text-blue-500 border-b-2 border-blue-500 cursor-pointer' : 'text-gray-500 hover:text-gray-800 cursor-pointer'}`}
                              onClick={() => handleTabClick('EmergencyContact')}
                            >
                              Emergency Contact
                            </a>
                          </li>
                        </ul>
                      </div>
                      {activeTab === 'Bio' && (
                        <div>
                          <div className="mb-4 md:col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                            Bio
                            </label>
                            <textarea name="address1" id="address1" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter Staff Bio Here"></textarea>
                          </div>
                          <div className="flex justify-end bg-white-200 px-4 py-3">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Update Bio</button>
                          </div>
                        </div>
                      )}
                      {activeTab === 'SocialProfile' && (
                      <div>  
                        <div>
                          <div className="mb-4 md:col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facebook">
                            Facebook
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="facebook" name="facebook" type="link" placeholder="Profile Url"/>
                          </div>
                        </div>
                        <div>
                          <div className="mb-4 md:col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instagram">
                            Instagram
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="instagram" name="instagram" type="link" placeholder="Profile Url"/>
                          </div>
                        </div>
                        <div>
                          <div className="mb-4 md:col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="twitter">
                            Twitter
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="twitter" name="twitter" type="link" placeholder="Profile Url"/>
                          </div>
                        </div>
                        <div>
                          <div className="mb-4 md:col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="linkedin">
                            LinkedIn
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="linkedin" name="linkedin" type="link" placeholder="Profile Url"/>
                          </div>
                        </div>
                        <div className="flex justify-end bg-white-200 px-4 py-3">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Update Social</button>
                        </div>
                      </div>
                      )}
                      {activeTab === 'BankAccount' && (
                      <div>
                        <div className="px-4 py-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4 md:col-span-1">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountTitle">
                              Account Title
                              </label>
                              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="accountTitle" name="accountTitle" type="text" placeholder="Account Title"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountNumber">
                              Account Number
                              </label>
                              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="accountNumber" name="accountNumber" type="number" placeholder="Account Number"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bankName">
                              Bank Name
                              </label>
                              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bankName" name="bankName" type="text" placeholder="Bank Name"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="iban">
                              IBAN
                              </label>
                              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="iban" name="iban" type="number" placeholder="International Bank Account Number"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="swiftCode">
                              Swift Code
                              </label>
                              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="swiftCode" name="swiftCode" type="text" placeholder="Swift Code"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bankBranch">
                              Bank Branch
                              </label>
                              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bankBranch" name="bankBranch" type="text" placeholder="Bank Branch"/>
                            </div>
                          </div>
                          <div className="flex justify-end bg-white-200 px-4 py-3">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Update Bank Info</button>
                          </div>
                        </div>
                      </div>
                      )}
                      {activeTab === 'EmergencyContact' && (
                        <div>
                          <div className="px-4 py-2">
                            <div className="mb-4 md:col-span-1">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                              Full Name
                              </label>
                              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullName" name="fullName" type="name" placeholder="Full Name"/>
                            </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4 md:col-span-1">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
                              Contact Number
                              </label>
                              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contactNumber" name="contactNumbere" type="number" placeholder="Contact Number"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                              Email
                              </label>
                              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email"/>
                            </div>
                          </div>
                          <div className="mb-4 md:col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Address
                            </label>
                            <textarea name="address" id="address" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Address"></textarea>
                          </div>
                          <div className="flex justify-end bg-white-200 px-4 py-3">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Update Con</button>
                          </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
            case "accountInformation":
                return <div>
                  <div className="bg-white shadow-md rounded-lg mb-4">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-700">Account Information</h2>
                    </div>
                    <div className="px-4 py-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" type="username" placeholder="Username"/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Account Email
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email"/>
                            </div>
                          </div>
                          <div className="flex justify-end bg-white-200 px-4 py-3">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Save</button>
                          </div>
                        </div>  
                  </div> 
                </div>;
            case "document":
                return <div>
                  <div className="bg-white shadow-md rounded-lg mb-4">
                  <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-700">Documents</h2>
                  </div>
                  <div className="overflow-x-auto mb-4">
                  <div className='p-5'>
                      <div className="flex justify-between mb-4">
                          <label className="flex items-center">
                              Show
                              <select className="mx-2 rounded border border-gray-300">
                              <option value="10">10</option>
                              <option value="20">20</option>
                              <option value="50">50</option>
                              </select>
                              entries
                          </label>
                          <div className="flex justify-end">
                              <input type="search" placeholder="Search" className="rounded border border-gray-300 p-2" />
                          </div>
                          </div>
                          <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                              <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document File</th>
                                  <th className="relative px-6 py-3">
                                  <span className="sr-only">Actions</span>
                                  </th>
                              </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                  <tr className="group hover:bg-gray-100">
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      <div className="flex justify-between">
                                          <div className="flex-shrink-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                          </div>
                                      </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                                  </tr>
                              </tbody>
                          </table>
                          <div className="text-gray-500 text-sm my-4 flex justify-between items-center">
                              Showing 1 to of 3 records
                              <div>
                              <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none">
                                  Previous
                              </button>
                              <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none ml-2">
                                  Next
                              </button>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className="px-4 py-2 border-t">
                    <div className="flex justify-between items-center mb-5 mt-5">
                      <h2 className="text-xl font-bold text-gray-700">Add New Document</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4 md:col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="documentName">
                            Document Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="documentName" name="documentName" type="documentName" placeholder="Document Name"/>
                        </div>
                        <div className="mb-4 md:col-span-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="documentType">
                            Document Type
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="documentType" name="documentTypel" type="documentType" placeholder="Document Type"/>
                        </div>
                        <div className="mb-4 md:col-span-2 lg:col-span-2">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="document_file">
                              Document File
                              </label>
                              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="document_file" type="file" />
                        </div>
                      </div>
                      <div className="flex justify-end bg-white-200 px-4 py-3">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Add Document</button>
                      </div>
                    </div> 
              </div>
            </div>;
            case "changePassword":
                return <div>
                    <div className="bg-white shadow-md rounded-lg mb-4">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-700">Change Password</h2>
                        </div>
                        <div className="px-4 py-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4 md:col-span-1">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Current Password
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password"/>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4 md:col-span-1">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    New Password
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password"/>
                                </div>
                                <div className="mb-4 md:col-span-1">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Confirm New Password
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password"/>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end bg-white-200 px-4 py-3">
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Change Password</button>
                        </div>
                    </div>
                </div>;
        }
    };

    return(
        <div>
            <div className="w-full mx-auto p-10 bg-white-50">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-1/4">
                        <div className="bg-white p-4 rounded shadow">
                            <div className="flex items-center mb-6">
                                <img
                                    className="h-16 w-16 rounded-full mr-4"
                                    src=".jpg"
                                    alt="Profile"
                                />
                                <div>
                                    <p className="text-gray-900 font-semibold">coba saja</p>
                                    <p className="text-gray-600 text-sm">interior</p>
                                </div>
                            </div>
                            <nav className="flex flex-col text-gray-800">
                                <a href="#" className="py-2 px-2 hover:bg-gray-100 rounded">Manager</a>
                                <a href="#" className="py-2 px-2 hover:bg-gray-100 rounded">Email</a>
                                <a href="#" className="py-2 px-2 hover:bg-gray-100 rounded" onClick={() => handleMenuClick("default")}>Basic Information</a>
                                <a href="#" className="py-2 px-2 hover:bg-gray-100 rounded" onClick={() => handleMenuClick("personalInformation")}>Personal Information</a>
                                <a href="#" className="py-2 px-2 hover:bg-gray-100 rounded" onClick={() => handleMenuClick("accountInformation")}>Account Information</a>
                                <a href="#" className="py-2 px-2 hover:bg-gray-100 rounded" onClick={() => handleMenuClick("document")}>Documents</a>
                                <a href="#" className="py-2 px-2 hover:bg-gray-100 rounded" onClick={() => handleMenuClick("changePassword")}>Change Password</a>
                            </nav>
                        </div>
                    </div>
                    <div className="w-full lg:w-3/4">
                        <div className="bg-white p-6 rounded shadow">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientDetails;
