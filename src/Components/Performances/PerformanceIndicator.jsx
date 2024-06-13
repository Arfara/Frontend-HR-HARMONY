import React, { useState, useEffect, useRef, Fragment } from 'react';
import { TrashIcon, ArrowCircleRightIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { APIPerformance } from '@/Apis/APIPerformance';
import { APICoreHR } from '@/Apis/APICoreHR';
import ReactStars from 'react-stars';
import Pagination from '../Pagination/Pagination';
import { getPaginatedData } from '../Pagination/Pagination';

const initialTechnicalRatings = {
  'BDD - Selling Skill': 0,
  'BDD - Handling Objection': 0,
  'BDD - Negotiation Skill': 0,
  'BDD - Proposal Development': 0,
  'BDD - After Sales Management': 0,
  'BDD - Customer Relationship Management': 0,
  'BDD - Hubungan Interpersonal': 0,
  'BDD - Communication Skill': 0,
  'BSD - Product Knowledge': 0,
  'BSD - Project Management': 0,
  'BSD - Delivering Procedures or Process': 0,
  'BSD - Collaborating Process': 0,
  'BSD - Customer Satisfaction': 0,
  'BSD - Self Confidence': 0,
  'BSD - Emphaty': 0,
  'TID - Computer Literacy': 0,
  'TID - System Database Management': 0,
  'TID - Network Management': 0,
  'TID - Program Development': 0,
  'TID - Coding Management': 0,
  'TID - System Analyze': 0,
  'TID - User Experience Management (U/X)': 0,
};

const initialOrgRatings = {
  'Creativity': 0,
  'Ultimate Speed': 0,
  'Reliable': 0,
  'Open Minded': 0,
  'Superior Service': 0,
  'Integrity': 0,
  'Agile Entrepreneur': 0,
  'Daya Tahan Stress': 0,
  'Stabilitas Emosi': 0,
  'Motivasi Berprestasi': 0,
  'Attention to Detail': 0,
  'Time Management': 0,
  'Quality Orientation': 0,
  'Result Orientation': 0,
  'Discipline Execution': 0,
};

const initialSelectedDesignation = '';

const PerformanceIndicator = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [kpiIndicators, setKpiIndicators] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState(initialSelectedDesignation);
  const titleRef = useRef(null);
  const [technicalRatings, setTechnicalRatings] = useState(initialTechnicalRatings);
  const [orgRatings, setOrgRatings] = useState(initialOrgRatings);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteKpiIndicatorId, setDeleteKpiIndicatorId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [total_count, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(10);

  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(total_count / per_page)) {
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const paginatedKpiIndicators = getPaginatedData(kpiIndicators, currentPage, per_page);

  useEffect(() => {
    const fetchKpiIndicators = async () => {
      setIsLoading(true);
      try {
        const params = { page: currentPage, per_page: per_page, search: searchQuery };
        const response = await APIPerformance.viewAllKpiIndicators(params);
        setKpiIndicators(response.data || []);
        setTotalCount(response.pagination.total_count || 0);
        setCurrentPage(response.pagination.page || 1);
        setPerPage(response.pagination.per_page || 10);
        setIsLoading(false);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    const fetchDesignations = async () => {
      try {
        const response = await APICoreHR.getAllDesignationsNonPagination();
        setDesignations(response.designations || []);
      } catch (error) {

      }
    };

    fetchKpiIndicators();
    fetchDesignations();
  }, [currentPage, per_page, searchQuery]);

  const handleAddNewClick = () => {
    setShowAddForm(true);
  };

  const handleCancelClick = () => {
    setShowAddForm(false);
  };

  const handleRatingChange = (criteria, newRating, isTechnical) => {
    const stateSetter = isTechnical ? setTechnicalRatings : setOrgRatings;
    stateSetter(prevRatings => ({
      ...prevRatings,
      [criteria]: newRating
    }));
  };

  const resetForm = () => {
    setTechnicalRatings(initialTechnicalRatings);
    setOrgRatings(initialOrgRatings);
    setSelectedDesignation(initialSelectedDesignation);
    if (titleRef.current) {
      titleRef.current.value = '';
    }
  };

  const keyMapping = {
    'BDD - Selling Skill': 'bdd_selling_skill',
    'BDD - Handling Objection': 'bdd_handling_objection',
    'BDD - Negotiation Skill': 'bdd_negotiation_skill',
    'BDD - Proposal Development': 'bdd_proposal_development',
    'BDD - After Sales Management': 'bdd_after_sales_management',
    'BDD - Customer Relationship Management': 'bdd_customer_relationship_management',
    'BDD - Hubungan Interpersonal': 'bdd_hubungan_interpersonal',
    'BDD - Communication Skill': 'bdd_communication_skill',
    'BSD - Product Knowledge': 'bsd_product_knowledge',
    'BSD - Project Management': 'bsd_project_management',
    'BSD - Delivering Procedures or Process': 'bsd_delivering_procedures_or_process',
    'BSD - Collaborating Process': 'bsd_collaborating_process',
    'BSD - Customer Satisfaction': 'bsd_customer_satisfaction',
    'BSD - Self Confidence': 'bsd_self_confidence',
    'BSD - Emphaty': 'bsd_emphaty',
    'TID - Computer Literacy': 'tid_computer_literacy',
    'TID - System Database Management': 'tid_system_database_management',
    'TID - Network Management': 'tid_network_management',
    'TID - Program Development': 'tid_program_development',
    'TID - Coding Management': 'tid_coding_management',
    'TID - System Analyze': 'tid_system_analyze',
    'TID - User Experience Management (U/X)': 'tid_user_experience_management',
    'Creativity': 'creativity',
    'Ultimate Speed': 'ultimate_speed',
    'Reliable': 'reliable',
    'Open Minded': 'open_minded',
    'Superior Service': 'superior_service',
    'Integrity': 'integrity',
    'Agile Entrepreneur': 'agile_entrepreneur',
    'Daya Tahan Stress': 'daya_tahan_stress',
    'Stabilitas Emosi': 'stabilitas_emosi',
    'Motivasi Berprestasi': 'motivasi_berprestasi',
    'Attention to Detail': 'attention_to_detail',
    'Time Management': 'time_management',
    'Quality Orientation': 'quality_orientation',
    'Result Orientation': 'result_orientation',
    'Discipline Execution': 'discipline_execution',
  };

  const convertKeysToSnakeCase = (ratings) => {
    const convertedRatings = {};
    Object.keys(ratings).forEach(key => {
      const snakeCaseKey = keyMapping[key] || key.replace(/ - /g, '_').replace(/ /g, '_').toLowerCase();
      convertedRatings[snakeCaseKey] = ratings[key];
    });
    return convertedRatings;
  };

  const prepareFormData = () => {
    const technicalRatingsConverted = convertKeysToSnakeCase(technicalRatings);
    const orgRatingsConverted = convertKeysToSnakeCase(orgRatings);

    return {
      title: titleRef.current.value,
      designation_id: parseInt(selectedDesignation, 10),
      ...technicalRatingsConverted,
      ...orgRatingsConverted,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = prepareFormData();

    try {
      const response = await APIPerformance.createKpiIndicators(formData);
      if (!response.error) {
        setShowAddForm(false);
        resetForm();
        const kpiResponse = await APIPerformance.viewAllKpiIndicators();
        setKpiIndicators(kpiResponse.data || []);
      }
    } catch (error) {

    }
  };

  const handleViewDetailsClick = async (id) => {
    navigate(`/performance/indicator-details/${id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteKpiIndicatorId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await APIPerformance.deleteListKpiIndicatorsById(deleteKpiIndicatorId);
      setKpiIndicators(kpiIndicators.filter(indicator => indicator.id !== deleteKpiIndicatorId));
      setShowDeleteConfirmation(false);
    } catch (error) {

    }
  };

  return (
    <div className="border border-gray-200 rounded overflow-hidden max-w-6xl ml-auto mr-auto">
      <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">List All Performance Indicators</h2>
        <div className="flex items-center">
          <button className='text-white bg-blue-500 border-blue-600 py-2 px-4 rounded text-lg leading-6 cursor-pointer hover:bg-blue-700 hover:border-blue-700' onClick={handleAddNewClick}>+ Add New</button>
        </div>
      </div>

      {showAddForm && (
      <div>
        <div className='bg-white shadow-md rounded-lg mb-4 w-full max-w-100 p-5 mt-2 grid grid-cols-2 md:grid-cols-2 gap-4'>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label> 
            <input
              ref={titleRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              name="title"
              type="text"
              placeholder="Title"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
              Designation
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="designation"
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(parseInt(e.target.value, 10))}
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
        <div className="bg-white shadow-md rounded-lg mb-4 w-full max-w-100 p-5 mt-2 grid grid-cols-2 md:grid-cols-2 gap-4">
          <form onSubmit={handleSubmit}>
            <h1 className='text-xl font-semibold text-gray-800 mb-5 text-center'>Technical Competencies</h1>
            {Object.keys(technicalRatings).map(criteria => (
              <div key={criteria} className="flex items-center mb-2">
                <label className="mr-2">{criteria}</label>
                <ReactStars
                  count={5}
                  onChange={(newRating) => handleRatingChange(criteria, newRating, true)}
                  size={24}
                  color2={'#ffd700'}
                  value={technicalRatings[criteria]}
                  className="ml-auto"
                  half={false}
                />
              </div>
            ))}
          </form>
          <form onSubmit={handleSubmit}>
            <h1 className='text-xl font-semibold text-gray-800 mb-5 text-center'>Organizational Competencies</h1>
            {Object.keys(orgRatings).map(criteria => (
              <div key={criteria} className="flex items-center mb-2">
                <label className="mr-2">{criteria}</label>
                <ReactStars
                  count={5}
                  onChange={(newRating) => handleRatingChange(criteria, newRating, false)}
                  size={24}
                  color2={'#ffd700'}
                  value={orgRatings[criteria]}
                  className="ml-auto"
                  half={false}
                />
              </div>
            ))}
          </form>
        </div>
        <div className='flex mt-5'>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md ml-auto" onClick={handleSubmit}>Submit</button>
            <button type="cancel" className="bg-gray-500 text-white px-4 py-2 rounded-md ml-5" onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
      )}
      <div className="p-5">
        <div className="flex justify-between mb-4">
          <label className="flex items-center">
            Show
            <select value={per_page} onChange={(e) => handlePerPageChange(Number(e.target.value))}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            entries
          </label>
          <div className="flex">
            <input type="text" className="px-2 py-1 border border-gray-300 rounded-md" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto px-3">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added by</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created at</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-sm text-gray-500">Loading performance indicator data...</td>
                </tr>
              ) : paginatedKpiIndicators.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-sm text-gray-500">No performance indicators data available.</td>
                </tr>
              ) : (
                paginatedKpiIndicators.map((indicator) => (
                  <tr key={indicator.id} className="group hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex justify-between">
                        <div>{indicator.title}</div>
                        <div className="flex-shrink-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="p-1 ml-10 text-blue-600 hover:text-blue-800 focus:outline-none" onClick={() => handleViewDetailsClick(indicator.id)}>
                            <ArrowCircleRightIcon className="h-5 w-5" />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-800 focus:outline-none" onClick={() => handleDeleteClick(indicator.id)}>
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{indicator.designation_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <ReactStars
                        count={5}
                        value={indicator.result}
                        size={24}
                        color2={'#ffd700'}
                        edit={false}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{indicator.admin_name || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(indicator.created_at).toLocaleDateString('id-ID')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
      </div>
      <div className="text-gray-500 text-sm px-4 my-2 flex justify-between items-center">
      <span>Showing {((currentPage - 1) * per_page) + 1} to {Math.min(currentPage * per_page, total_count)} of {total_count} records</span>
        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(total_count / per_page)}
            onPageChange={handlePageChange}
          />
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
                        Delete Performance Indicator
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this performance indicator? This action cannot be undone.
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
    </div>
  );
};

export default PerformanceIndicator;