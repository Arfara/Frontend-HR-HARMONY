import React, { Fragment, useState, useEffect } from 'react';
import { ArrowCircleRightIcon, TrashIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header";
import { APIClients } from '@/Apis/APIClients';
import { Dialog, Transition } from '@headlessui/react';

const ClientList = () => {
    const navigate = useNavigate();
    const [showAddForm, setShowAddForm] = useState(false);
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [country, setCountry] = useState('');

    const fetchClients = async () => {
        setIsLoading(true);
        try {
            const response = await APIClients.getAllClients();
            setClients(response.data || []);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleAddNewClick = () => {
        setShowAddForm(true);
    };

    const handleReset = () => {
        setFirstName('');
        setLastName('');
        setContactNumber('');
        setGender('');
        setEmail('');
        setPassword('');
        setUsername('');
        setCountry('');
        setShowAddForm(false);
    };
    
    const handleViewDetailsClick = (id) => {
        navigate(`./client-details/${id}`);
    };

    const handleDeleteClick = (id) => {
        setSelectedClientId(id);
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await APIClients.deleteClientById(selectedClientId);
            setShowDeleteConfirmation(false);
            fetchClients();
        } catch (error) {

        }
    };

    const handleSaveClient = async () => {
        const clientData = {
            first_name: firstName,
            last_name: lastName,
            contact_number: contactNumber,
            gender: gender,
            email: email,
            password: password,
            username: username,
            country: country
        };

        try {
            const response = await APIClients.createClient(clientData);
            handleReset();
            setShowAddForm(false);
            fetchClients();
        } catch (error) {

        }
    };

    return (
        <Fragment>
            <div>
                <Header/>
                <div className="border border-gray-200 rounded overflow-hidden mb-4 max-w-6xl ml-auto mr-auto mt-20">
                    {showAddForm && (
                    <div className="bg-white shadow-md rounded-lg mb-4">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-700">Add New Client</h2>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={() => setShowAddForm(false)}>Hide</button>
                    </div>
                    <div className="px-4 py-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                First Name
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" name="firstName" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" name="lastName" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
                                Contact Number
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contactNumber" name="contactNumber" type="number" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                                Gender
                                </label>
                                <div className="relative">
                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                </div>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="mb-4 md:col-span-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                                Country
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="country" name="country" type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)}/>
                            </div>
                            <div className="mb-4 md:col-span-2 lg:col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_picture">
                                    Profile Picture
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-blue-300 group">
                                        <div className="flex flex-col items-center justify-center pt-7">
                                            <svg className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                            <p className="lowercase text-sm text-gray-400 group-hover:text-blue-600 pt-1 tracking-wider">Select a photo</p>
                                            <input type="file" id="profile_picture" name="profile_picture" className="hidden" />
                                        </div>
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className="flex justify-end bg-gray-200 px-4 py-3">
                        <button type="button" onClick={handleReset} className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2 focus:outline-none">Reset</button>
                        <button onClick={handleSaveClient} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Save</button>
                        </div>
                    </div>
                    </div>
                    )}
                    <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700">List All Clients</h2>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"onClick={handleAddNewClick}>Add New</button>
                </div>
                <div className="p-5">
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
                    <div className="overflow-x-auto mb-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {isLoading ? (
                                <tr>
                                <td colSpan="8" className="text-center py-4 text-sm text-gray-500">Loading client data...</td>
                                </tr>
                            ) : clients.length === 0 ? (
                                <tr>
                                <td colSpan="8" className="text-center py-4 text-sm text-gray-500">No client data available.</td>
                                </tr>
                            ) : (
                            clients.map((client) => (
                                <tr key={client.id} className="group hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div className="flex justify-between">
                                            <span>{client.full_name}</span>
                                            <div className="flex-shrink-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button className="p-1 ml-10 text-blue-600 hover:text-blue-800 focus:outline-none" onClick={() => handleViewDetailsClick(client.id)}>
                                                    <ArrowCircleRightIcon className="h-5 w-5" />
                                                </button>
                                                <button className="p-1 text-red-600 hover:text-red-800 focus:outline-none" onClick={() => handleDeleteClick(client.id)}>
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.contact_number}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.gender}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.country}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            client.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {client.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                    </div>
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
            </div>
            <Transition appear show={showDeleteConfirmation} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setShowDeleteConfirmation(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div>
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                Delete Client
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                Are you sure you want to delete this client? This action cannot be undone.
                                </p>
                            </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                            <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                            onClick={handleConfirmDelete}
                            >
                            Confirm
                            </button>
                            <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:col-start-1 sm:text-sm"
                            onClick={() => setShowDeleteConfirmation(false)}
                            >
                            Cancel
                            </button>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </Fragment>
    )
}

export default ClientList
