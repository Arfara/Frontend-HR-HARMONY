import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { APIEmployees } from '@/Apis/APIEmployees';
import { APIAttendance } from '@/Apis/APIAttendance';
import { toast } from 'react-toastify';
import { pdfjs } from 'react-pdf';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import ErrorBoundary from '../Attendances/ErrorBoundary';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

const MonthlyReport = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await APIEmployees.getAllEmployeesNonPagination();
        setEmployees(response.employees || []);
      } catch (error) {
        toast.error("Failed to fetch employees.");
      }
    };
    
    fetchEmployees();
  }, []);

  const handleEmployeeChange = (event) => {
    setSelectedEmployeeId(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSearch = async () => {
    if (!selectedEmployeeId || !selectedMonth) {
      toast.error("Please select both employee and month.");
      return;
    }
    try {
      const response = await APIAttendance.getEmployeeAttendanceReport(selectedEmployeeId, selectedMonth);
      const data = await response.data;
      setPdfFile(URL.createObjectURL(data));
    } catch (error) {
      toast.error("Error fetching PDF file.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="shadow-md rounded-md p-5 flex flex-col items-center bg-white mb-5">
        <div className="flex w-full justify-between items-center">
          <div className="flex-grow mr-5">
            <label htmlFor="employee" className="block text-sm text-gray-800 mb-1">Employee</label>
            <select id="employee" onChange={handleEmployeeChange} className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.first_name} {employee.last_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-grow mr-5">
            <label htmlFor="monthSelect" className="block text-sm text-gray-800 mb-1">Select Month</label>
            <input type="month" id="monthSelect" onChange={handleMonthChange} className="block w-full px-3 py-1.5 text-base leading-6 text-gray-900 bg-white bg-clip-padding border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" defaultValue="2024-01" />
          </div>
          <div className="flex-grow">
            <button type="button" onClick={handleSearch} className="mt-6 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      {pdfFile && (
        <div className="shadow-md rounded-md p-5 flex flex-col items-center bg-white">
          <Worker workerUrl={`/pdf.worker.mjs`}>
            <ErrorBoundary>
              <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
            </ErrorBoundary>
          </Worker>
        </div>
      )}
    </div>
  );
};

export default MonthlyReport;