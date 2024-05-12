import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import 'rc-slider/assets/index.css';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from '../Header/Header';
import { APIHelpdesk } from '@/Apis/APIHelpdesk';

const TicketDetails = () => {
  const [ticketDetails, setTicketDetails] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await APIHelpdesk.viewHelpdeskById(id);
        setTicketDetails(response.helpdesk || {});
      } catch (error) {

      }
    };

    fetchTicketDetails();
  }, [id]);

  const handleDescriptionChange = (value) => {
    setTicketDetails(prevDetails => ({
      ...prevDetails,
      description: value
    }));
  };

  const handleUpdateDescription = async () => {
    const updatedData = {
      description: ticketDetails.description
    };
    
    try {
      const response = await APIHelpdesk.updateHelpdeskById(id, updatedData);
    } catch (error) {

    }
  };

  return (
    <div className="container mx-auto">
      <Header/>
      <div className="flex justify-center my-10">
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
              <h5 className="text-lg font-semibold text-gray-700">Ticket Details</h5>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate('/helpdesk')}
              >
                Add New Ticket
              </button>
            </div>
            <div className="p-4">
              <div className="bg-gradient-to-r from-blue-500 to-transparent text-white rounded-lg px-4 py-2 mb-4">Ticket #{ticketDetails.id}</div>
              <div className="max-w-4xl mx-auto">
                <div className="border rounded-lg p-4 bg-white mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-semibold text-blue-600">Subject</div>
                    <div>{ticketDetails.subject}</div>
                    <div className="font-semibold">Assigned To</div>
                    <div>{ticketDetails.employee_full_name}</div>
                    <div className="font-semibold">Date Created</div>
                    <div>{new Date(ticketDetails.created_at).toLocaleDateString()}</div>
                    <div className="font-semibold">Priority</div>
                    <div>{ticketDetails.priority}</div>
                    <div className="font-semibold">Status</div>
                    <div>{ticketDetails.status}</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="border rounded-lg p-4 bg-white mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                      Remarks
                    </label>
                    <ReactQuill theme="snow" value={ticketDetails.description} onChange={handleDescriptionChange} />
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleUpdateDescription}>Update</button>
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails

