import React, { useState, useEffect, Fragment } from 'react';
import ReactQuill from 'react-quill';
import { ArrowCircleRightIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { APIRecruitment } from '@/Apis/APIRecruitment';
import { APICoreHR } from '@/Apis/APICoreHR';
import { Dialog, Transition } from '@headlessui/react';

const NewOpening = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [joblist, setJoblist] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedNumberOfPosition, setSelectedNumberOfPosition] = useState('');
  const [selectedDateClosing, setSelectedDateClosing] = useState('');
  const [selectedShortDescription, setSelectedShortDescription] = useState('');
  const [selectedLongDescription, setSelectedLongDescription] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await APIRecruitment.getAllJobs();
      setJoblist(response.new_jobs || []);
    } catch (error) {

    }
  };

  const fetchDesignations = async () => {
    try {
      const response = await APICoreHR.getAllDesignations();
      setDesignations(response.designations || []);
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchJobs();
    fetchDesignations();
  }, []);

  const handleAddNewClick = () => {
    setShowAddForm(true);
  };

  const handleReset = () => {
    setShowAddForm(false);
  };

  const handleViewDetailsClick = (jobId) => {
    navigate(`/recruitment/job-details/${jobId}`);
  };

  const handleEditJobClick = (jobId) => {
    navigate(`/recruitment/edit-job/${jobId}`);
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();

    const jobData = {
      title: selectedTitle,
      job_type: selectedType,
      designation_id: parseInt(selectedDesignation, 10),
      number_of_position: parseInt(selectedNumberOfPosition, 10),
      is_publish: selectedStatus === 'Published',
      date_closing: selectedDateClosing,
      gender: selectedGender,
      minimum_experience: selectedExperience,
      short_description: selectedShortDescription,
      long_description: selectedLongDescription
    };

    try {
      await APIRecruitment.createJob(jobData);
      setShowAddForm(false);
      fetchJobs();
    } catch (error) {

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setSelectedTitle(value);
        break;
      case 'numberOfPositions':
        setSelectedNumberOfPosition(value);
        break;
      case 'closingDate':
        setSelectedDateClosing(value);
        break;
      case 'shortDescription':
        setSelectedShortDescription(value);
        break;
      default:
        break;
    }
  };

  const setContent = (content) => {
    setSelectedLongDescription(content);
  };

  const handleShowDeleteConfirmation = (jobId) => {
    setDeleteJobId(jobId);
    setShowDeleteConfirmation(true);
  };

  const handleHideDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await APIRecruitment.deleteJobById(deleteJobId);
      setShowDeleteConfirmation(false);
      fetchJobs();
    } catch (error) {

    }
  };

  const JobCard = ({ job }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 relative flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-700 mb-4">{job.title}</h3>
            <p className="text-sm text-gray-500">Job Type: {job.job_type}</p>
            <p className="text-sm text-gray-500">Posted on: {new Date(job.created_at).toLocaleDateString('en-US')}</p>
          </div>
          <div className="mb-6">
            <span className={`px-2 py-1 rounded-full text-sm font-bold ${job.is_publish ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {job.is_publish ? 'Published' : 'Unpublished'}
            </span>
            <p className="text-sm text-gray-500 mt-4">Positions: {job.number_of_position}</p>
            <p className="text-sm text-gray-500">Gender: {job.gender}</p>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-sm text-gray-500">Closing Date: {new Date(job.date_closing).toLocaleDateString('en-US')}</p>
          <div className="flex space-x-2">
            <button className="text-blue-600 hover:text-blue-700" onClick={() => handleViewDetailsClick(job.id)}>
              <ArrowCircleRightIcon className="h-5 w-5" />
            </button>
            <button className="text-blue-600 hover:text-blue-700" onClick={() => handleEditJobClick(job.id)}>
              <PencilAltIcon className="h-5 w-5" />
            </button>
            <button className="text-red-600 hover:text-red-700" onClick={() => handleShowDeleteConfirmation(job.id)}>
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <div className='w-full mx-auto p-5 bg-white'>
        <div className='shadow-md rounded-md p-5 flex justify-between items-center bg-white mb-7'>
          <h2 className='text-2xl'>Job Listing</h2>
          <button className='text-white bg-blue-600 border-blue-600 py-2 px-4 rounded text-lg leading-6 cursor-pointer hover:bg-blue-700 hover:border-blue-700' onClick={handleAddNewClick}>+ Add New Job</button>
        </div>

        {showAddForm && (
          <div className="bg-white shadow-md rounded-lg mb-4 w-full max-w-5xl">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-700">Add New Job</h2>
          </div>
          
          <form className="px-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title*
                    </label> 
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Title" value={selectedTitle} onChange={handleChange} />
                </div>
            
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobType">
                    Job Type *
                    </label>
                    <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="jobType"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    >
                    <option value="" disabled>Select Job Type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
                    Designation *
                    </label>
                    <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="designation"
                    value={selectedDesignation}
                    onChange={(e) => setSelectedDesignation(e.target.value)}
                    >
                    <option value="" disabled>Select Designation</option>
                    {designations.map((designation) => (
                      <option key={designation.id} value={designation.id}>
                        {designation.designation_name}
                      </option>
                    ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfPositions">
                    Number of Positions*
                    </label> 
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="numberOfPositions" name="numberOfPositions" type="text" placeholder="Number of Positions" value={selectedNumberOfPosition} onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobStatus">
                    Status *
                    </label>
                    <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="designation"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                    <option value="" disabled>Select Status</option>
                    <option value="Published">Published</option>
                    <option value="Unpublished">Unpublished</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                    Closing Date*
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="closingDate" name="closingDate" type="date" value={selectedDateClosing} onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                    Gender *
                    </label>
                    <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="gender"
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
                    Experiences *
                    </label>
                    <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="experiences"
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    >
                    <option value="" disabled>Select Experience</option>
                    <option value="Fresh Graduate">Fresh Graduate</option>
                    <option value="1 Year">1 Year</option>
                    <option value="2 Year">2 Year</option>
                    <option value="3 Year">3 Year</option>
                    <option value="4 Year">4 Year</option>
                    <option value="5 Year">5 Year</option>
                    <option value="5 Year +">5 Year +</option>
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shortDescription">
                Short Description*
                </label> 
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="shortDescription" name="shortDescription" type="text" placeholder="Short Description" value={selectedShortDescription} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Long Description
              </label>
              <ReactQuill theme="snow" value={selectedLongDescription} onChange={setContent} />
            </div>

            <div className="flex justify-end bg-gray-200 px-4 py-3">
              <button className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2 focus:outline-none" onClick={handleReset}>Reset</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleSaveJob}>Save</button>
            </div>
          </form>
        </div>
        )}

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {joblist.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
          </div>
      </div>

      <Transition appear show={showDeleteConfirmation} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={handleHideDeleteConfirmation}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>
            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Delete Job
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this job? This action cannot be undone.
                  </p>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={handleHideDeleteConfirmation}
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  )
}

export default NewOpening;

