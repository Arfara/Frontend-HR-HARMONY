import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';

const MonthlyReport = () => {
  return (
    <div className="shadow-md rounded-md p-5 flex items-center bg-white max-w-5xl mx-auto">
      <div className="flex-grow mr-5 last:mr-0">
        <label htmlFor="employee" className="block text-sm text-gray-800 mb-1">Employee</label>
        <select id="employee" className="block w-full px-3 py-1.5 text-base leading-6 text-gray-900 bg-white bg-clip-padding border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
          <option value="">Fakhrity Hikmawan</option>
        </select>
      </div>
      <div className="flex-grow mr-5 last:mr-0">
        <label htmlFor="monthSelect" className="block text-sm text-gray-800 mb-1">Select Month</label>
        <input type="month" id="monthSelect" className="block w-full px-3 py-1.5 text-base leading-6 text-gray-900 bg-white bg-clip-padding border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" defaultValue="2024-01" />
      </div>
      <div className="flex-grow mr-5 last:mr-0">
        <button type="submit" className="mt-6 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default MonthlyReport;