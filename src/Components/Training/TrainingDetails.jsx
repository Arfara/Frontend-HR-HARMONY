import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { APITraining } from '@/Apis/APITraining';
import ReactQuill from 'react-quill';

const TrainingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trainingDetails, setTrainingDetails] = useState({});
    const [selectedStatus, setSelectedStatus] = useState(trainingDetails.status || '');
    const [selectedPerformance, setSelectedPerformance] = useState(trainingDetails.performance || '');

    useEffect(() => {
        const fetchTrainingDetails = async () => {
            try {
                const response = await APITraining.viewTrainingById(id);
                setTrainingDetails(response.data);
            } catch (error) {

            }
        };

        fetchTrainingDetails();
    }, [id]);

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handlePerformanceChange = (event) => {
        setSelectedPerformance(event.target.value);
    };

    const updateTrainingStatus = async () => {
        try {
            const updatedData = { ...trainingDetails, status: selectedStatus, performance: selectedPerformance };
            await APITraining.updateTrainingById(id, updatedData);
            navigate('/training/training-sessions');
        } catch (error) {

        }
    };

    return (
        <div className="flex flex-col lg:flex-row lg:space-x-8 p-10">
            <div className="lg:w-1/4 bg-white p-6 rounded-md shadow-lg" style={{ alignSelf: 'flex-start' }}>
                <h2 className="text-xl font-bold mb-4">Update Status</h2>
                <div className="mb-4 md:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="performance">
                    Performance
                    </label>
                    <div className="relative">
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="performance" value={selectedPerformance} onChange={handlePerformanceChange}>
                        <option value="" disabled>Select Performance</option>
                        <option>Not Concluded</option>
                        <option>Satisfactory</option>
                        <option>Average</option>
                        <option>Poor</option>
                        <option>Excellent</option>
                    </select>
                    </div>
                </div>
                <div className="mb-4 md:col-span-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Status
                    </label>
                    <div className="relative">
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="status" value={selectedStatus} onChange={handleStatusChange}>
                        <option value="" disabled>Select Status</option>
                        <option>Started</option>
                        <option>Not Started</option>
                    </select>
                    </div>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 ml-auto" onClick={updateTrainingStatus}>Update Status</button>
            </div>
            <div className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-lg mt-4 lg:mt-0 mr-auto">
                <h2 className="text-xl font-bold mb-4">Overview</h2>
                <div className="bg-white p-6 rounded shadow">
                    <ul>
                        <li className="mb-2 border-b"><span className="font-bold">Training Skill: </span>{trainingDetails.training_skill}</li>
                        <li className="mb-2 border-b"><span className="font-bold">Trainer: </span>{trainingDetails.full_name_trainer}</li>
                        <li className="mb-2 border-b"><span className="font-bold">Training Cost: </span>{trainingDetails.training_cost}</li>
                        <li className="mb-2 border-b"><span className="font-bold">Start Date: </span>{new Date(trainingDetails.start_date).toLocaleDateString()}</li>
                        <li className="mb-2 border-b"><span className="font-bold">End Date: </span>{new Date(trainingDetails.end_date).toLocaleDateString()}</li>
                        <li className="mb-2 border-b"><span className="font-bold">Status: </span>{trainingDetails.status}</li>
                        <li className="mb-2 border-b"><span className="font-bold">Performance: </span>{trainingDetails.performance}</li>
                        <li className="mb-2 border-b"><span className="font-bold">Created at: </span>{new Date(trainingDetails.created_at).toLocaleDateString()}</li>
                    </ul>
                </div>
                <h2 className="text-xl font-bold mb-4 mt-4">Training Details</h2>
                <div className="bg-white p-6 rounded shadow">
                    <p>{trainingDetails.description}</p>
                </div>
            </div>
        </div>
    )
}

export default TrainingDetails