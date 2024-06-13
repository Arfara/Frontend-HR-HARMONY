import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import { APIRecruitment } from '@/Apis/APIRecruitment';
import { APICoreHR } from '@/Apis/APICoreHR';
import { toast } from 'react-toastify';

const EditJobs = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [jobDetails, setJobDetails] = useState({});
    const [designations, setDesignations] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedDesignation, setSelectedDesignation] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedExperience, setSelectedExperience] = useState('');

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await APIRecruitment.getJobById(id);
                setJobDetails(response.new_job);
                setSelectedType(response.new_job.job_type);
                setSelectedDesignation(response.new_job.designation_id.toString());
                setSelectedGender(response.new_job.gender);
                setSelectedStatus(response.new_job.is_publish ? "Published" : "Unpublished");
                setSelectedExperience(response.new_job.minimum_experience);
            } catch (error) {
                toast.error("Failed to fetch job details.");
            }
        };

        const fetchDesignations = async () => {
            try {
                const response = await APICoreHR.getAllDesignationsNonPagination();
                setDesignations(response.designations || []);
            } catch (error) {
                toast.error("Failed to fetch designations.");
            }
        };

        fetchDesignations();
        fetchJobDetails();
    }, [id]);

    const handleBackClick = () => {
        navigate(`/recruitment/new-opening`);
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();
        const jobData = {
            title: jobDetails.title,
            job_type: selectedType,
            designation_id: parseInt(selectedDesignation, 10),
            gender: selectedGender,
            is_publish: selectedStatus === "Published" ? true : false,
            minimum_experience: selectedExperience,
            number_of_position: parseInt(jobDetails.number_of_position, 10),
            date_closing: jobDetails.date_closing,
            short_description: jobDetails.short_description,
            long_description: jobDetails.long_description,
        };

        try {
            await APIRecruitment.updateJobById(id, jobData);
            toast.success("Job updated successfully.");
            navigate(`/recruitment/job-details/${id}`);
        } catch (error) {
            toast.error("Failed to update job.");
        }
    };

    return(
    <div className='w-full mx-auto p-5 bg-white'>
        <div className="bg-white shadow-md rounded-lg mb-4 w-full max-w-5xl">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-700">Edit Job</h2>
          </div>
          
          <form className="px-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title*
                    </label> 
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" value={jobDetails.title} onChange={(e) => setJobDetails({...jobDetails, title: e.target.value})} />
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
                        <option key={designation.id} value={designation.id}>{designation.designation_name}</option>
                    ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfPositions">
                    Number of Positions*
                    </label> 
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="numberOfPositions" type="text" placeholder="Number of Positions" value={jobDetails.number_of_position} onChange={(e) => setJobDetails({...jobDetails, number_of_position: e.target.value})} />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobStatus">
                    Status *
                    </label>
                    <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="jobStatus"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                    <option value="" disabled>Status</option>
                    <option value="Published">Published</option>
                    <option value="Unpublished">Unpublished</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                    Closing Date*
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="closingDate" type="date" value={jobDetails.date_closing} onChange={(e) => setJobDetails({...jobDetails, date_closing: e.target.value})} />
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
                    <option value="" disabled>Gender</option>
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
                    <option value="" disabled>Experience</option>
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
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="shortDescription" type="text" placeholder="Short Description" value={jobDetails.short_description} onChange={(e) => setJobDetails({...jobDetails, short_description: e.target.value})} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Long Description
              </label>
              <ReactQuill theme="snow" value={jobDetails.long_description} onChange={(value) => setJobDetails({...jobDetails, long_description: value})} />
            </div>
            <div className="flex justify-end bg-gray-200 px-4 py-3">
              <button className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mr-2 focus:outline-none" onClick={handleBackClick}>Back</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleSaveClick}>Save</button>
            </div>
          </form>
        </div>
    </div>
    )
}
export default EditJobs;