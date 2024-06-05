import React from 'react';

export const getPaginatedData = (data, page, perPage) => {
    const totalData = data.length;
    const totalPages = Math.ceil(totalData / perPage);
    const validPage = page > totalPages ? totalPages : page;
    const offset = (validPage - 1) * perPage;
    const safeOffset = Math.max(0, offset);
    return data.slice(safeOffset, safeOffset + perPage);
};

export const getFilteredPaginatedData = (data, page, perPage, searchQuery) => {
  const filteredData = data.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
  return getPaginatedData(filteredData, page, perPage);
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        className={`px-4 py-2 rounded-md focus:outline-none ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700">
        {currentPage}
      </span>
      <button
        className={`px-4 py-2 rounded-md focus:outline-none ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
