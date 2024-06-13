import React, { useState, useEffect } from 'react';
import { APIEmployees } from '@/Apis/APIEmployees';
import { APIPerformance } from '@/Apis/APIPerformance';
import ReactStars from 'react-stars';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AppraisalDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState({});
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await APIPerformance.viewListKpaIndicatorsById(id);
                if (response && response.data) {
                    setDetail(response.data || {});
                    fetchEmployees(response.data.employee_id || 0);
                }
            } catch (error) {

            }
        };

        const fetchEmployees = async (employeeId) => {
            try {
                const response = await APIEmployees.getAllEmployeesNonPagination();
                if (response && response.employees) {
                    const isEmployeeIncluded = response.employees.some(employee => employee.id === employeeId);
                    const updatedEmployees = isEmployeeIncluded ? response.employees : [{id: employeeId, employee_name: detail.employee_name}, ...response.employees];
                    setEmployees(updatedEmployees || []);
                }
            } catch (error) {

            }
        };

        fetchDetail();
    }, [id]);

    const [title, setTitle] = useState('');
    const [overallRating, setOverallRating] = useState(0);
    const [employeeId, setEmployeeId] = useState('');
    const [technicalRatings, setTechnicalRatings] = useState({});
    const [orgRatings, setOrgRatings] = useState({});
    const [activeTab, setActiveTab] = useState('Overview');
    const [appraisalDate, setAppraisalDate] = useState('');

    useEffect(() => {
        setTitle(detail.title);
        setEmployeeId(detail.employee_id);
        setOverallRating(detail.result);
        setAppraisalDate(detail.appraisal_date);
        setTechnicalRatings({
            'BDD - Selling Skill': detail.bdd_selling_skill,
            'BDD - Handling Objection': detail.bdd_handling_objection,
            'BDD - Negotiation Skill': detail.bdd_negotiation_skill,
            'BDD - Proposal Development': detail.bdd_proposal_development,
            'BDD - After Sales Management': detail.bdd_after_sales_management,
            'BDD - Customer Relationship Management': detail.bdd_customer_relationship_management,
            'BDD - Hubungan Interpersonal': detail.bdd_hubungan_interpersonal,
            'BDD - Communication Skill': detail.bdd_communication_skill,
            'BSD - Product Knowledge': detail.bsd_product_knowledge,
            'BSD - Project Management': detail.bsd_project_management,
            'BSD - Delivering Procedures or Process': detail.bsd_delivering_procedures_or_process,
            'BSD - Collaborating Process': detail.bsd_collaborating_process,
            'BSD - Customer Satisfaction': detail.bsd_customer_satisfaction,
            'BSD - Self Confidence': detail.bsd_self_confidence,
            'BSD - Emphaty': detail.bsd_emphaty,
            'TID - Computer Literacy': detail.tid_computer_literacy,
            'TID - System Database Management': detail.tid_system_database_management,
            'TID - Network Management': detail.tid_network_management,
            'TID - Program Development': detail.tid_program_development,
            'TID - Coding Management': detail.tid_coding_management,
            'TID - System Analyze': detail.tid_system_analyze,
            'TID - User Experience Management (U/X)': detail.tid_user_experience_management
        });
        setOrgRatings({
            'Creativity': detail.creativity,
            'Ultimate Speed': detail.ultimate_speed,
            'Reliable': detail.reliable,
            'Open Minded': detail.open_minded,
            'Superior Service': detail.superior_service,
            'Integrity': detail.integrity,
            'Agile Entrepreneur': detail.agile_entrepreneur,
            'Daya Tahan Stress': detail.daya_tahan_stress,
            'Stabilitas Emosi': detail.stabilitas_emosi,
            'Motivasi Berprestasi': detail.motivasi_berprestasi,
            'Attention to Detail': detail.attention_to_detail,
            'Time Management': detail.time_management,
            'Quality Orientation': detail.quality_orientation,
            'Result Orientation': detail.result_orientation
        });
    }, [detail]);

    const handleTechnicalRatingChange = (criteria, value) => {
        setTechnicalRatings(prevTechnicalRatings => ({
          ...prevTechnicalRatings,
          [criteria]: value
        }));
    };
    
    const handleOrgRatingChange = (criteria, value) => {
        setOrgRatings(prevOrgRatings => ({
            ...prevOrgRatings,
            [criteria]: value
        }));
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
        'Discipline Execution': 'discipline_execution'
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const convertWithMapping = (ratings) => {
            const convertedRatings = {};
            Object.keys(ratings).forEach(key => {
              const mappedKey = keyMapping[key] || key;
              convertedRatings[mappedKey] = ratings[key];
            });
            return convertedRatings;
        };

        const formData = {
            title: title,
            employee_id: parseInt(employeeId, 10),
            appraisal_date: appraisalDate,
            ...convertWithMapping(technicalRatings),
            ...convertWithMapping(orgRatings)
        };

        try {
            const response = await APIPerformance.updateListKpaIndicatorsById(detail.id, formData);
            navigate('/performance/performance-appraisal');
        } catch (error) {

        }
    };
    
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    const appraisalDetail = {
        'Title': detail.title,
        'Employee': detail.employee_name,
        'Added by': detail.admin_name,
        'Created at': new Date(detail.created_at).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }),
        'Overall Rating' : <ReactStars
                              count={5}
                              value={overallRating}
                              edit={false}
                              color2={'#ffd700'}
                              size={25}
                              half={false}
                            />
    };

    return(
        <div className="flex flex-col lg:flex-row lg:space-x-8 p-10">
            <div className="lg:w-1/4 bg-white p-6 rounded-md shadow-lg" style={{ alignSelf: 'flex-start' }}>
                <h2 className="text-xl font-bold mb-4">Appraisal Details</h2>
                <ul>
                    {Object.entries(appraisalDetail).map(([key, value]) => (
                        <li key={key} className="mb-2">
                            <span className="font-bold">{key}: </span>{value}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-lg mt-4 lg:mt-0 mr-auto">
                <div className="bg-white p-6 rounded shadow">
                    <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Overview and Edit Indicator</h2>

                    <ul className="flex border-b">
                        <li className="-mb-px mr-1">
                        <a
                            className={`inline-block py-2 px-4 font-semibold ${activeTab === 'Overview' ? 'text-blue-500 border-b-2 border-blue-500 cursor-pointer' : 'text-gray-500 hover:text-gray-800 cursor-pointer'}`}
                            onClick={() => handleTabClick('Overview')}
                        >
                            Overview
                        </a>
                        </li>
                        <li className="mr-1">
                        <a
                            className={`inline-block py-2 px-4 font-semibold ${activeTab === 'Edit' ? 'text-blue-500 border-b-2 border-blue-500 cursor-pointer' : 'text-gray-500 hover:text-gray-800 cursor-pointer'}`}
                            onClick={() => handleTabClick('Edit')}
                        >
                            Edit
                        </a>
                        </li>
                    </ul>
                    </div>
                    {activeTab === 'Overview' && (
                    <div>
                    <form>
                        <h1 className='text-xl font-semibold text-gray-800 mb-2 text-center'>Technical Competencies</h1>
                        {Object.keys(technicalRatings).map(criteria => (
                        <div key={criteria} className="flex items-center mb-2 border-b border-gray-300 ml-2">
                            <label className="mr-2">{criteria}</label>
                            <div className="rating-stars flex ml-auto">
                            <ReactStars
                                count={5}
                                value={technicalRatings[criteria]}
                                edit={false}
                                color2={'#ffd700'}
                                size={25}
                                half={false}
                            />
                            </div>
                        </div>
                        ))}
                    </form>
                    <form>
                        <h1 className='text-xl font-semibold text-gray-800 mb-2 mt-5 text-center'>Organizational Competencies</h1>
                        {Object.keys(orgRatings).map(criteria => (
                        <div key={criteria} className="flex items-center mb-2 border-b border-gray-300 ml-2">
                            <label className="mr-2">{criteria}</label>
                            <div className="rating-stars flex ml-auto">
                            <ReactStars
                                count={5}
                                value={orgRatings[criteria]}
                                edit={false}
                                color2={'#ffd700'}
                                size={25}
                                half={false}
                            />
                            </div>
                        </div>
                        ))}
                    </form>
                    </div>
                    )}
                    {activeTab === 'Edit' && (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='bg-white shadow-md rounded-lg mb-4 w-full max-w-100 p-5 mt-2 grid grid-cols-3 md:grid-cols-3 gap-4'>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    Title
                                    </label> 
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employee">
                                    Employee
                                    </label>
                                    <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="employee"
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                    >
                                    {employees.map(employee => (
                                        <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>
                                    ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="month">
                                    Select Month
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="month" type="month" value={appraisalDate} onChange={(e) => setAppraisalDate(e.target.value)} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <h1 className='text-xl font-semibold text-gray-800 mb-2 text-center'>Technical Competencies</h1>
                                {Object.keys(technicalRatings).map(criteria => (
                                <div key={criteria} className="flex items-center mb-2 border-b border-gray-300 ml-2">
                                    <label className="mr-2">{criteria}</label>
                                    <div className="rating-stars flex ml-auto">
                                    <ReactStars
                                        count={5}
                                        value={technicalRatings[criteria]}
                                        edit={true}
                                        color2={'#ffd700'}
                                        size={25}
                                        half={false}
                                        onChange={(newRating) => handleTechnicalRatingChange(criteria, newRating)}
                                    />
                                    </div>
                                </div>
                                ))}
                            </form>
                            <form onSubmit={handleSubmit}>
                                <h1 className='text-xl font-semibold text-gray-800 mb-2 mt-5 text-center'>Organizational Competencies</h1>
                                {Object.keys(orgRatings).map(criteria => (
                                <div key={criteria} className="flex items-center mb-2 border-b border-gray-300 ml-2">
                                    <label className="mr-2">{criteria}</label>
                                    <div className="rating-stars flex ml-auto">
                                    <ReactStars
                                        count={5}
                                        value={orgRatings[criteria]}
                                        edit={true}
                                        color2={'#ffd700'}
                                        size={25}
                                        half={false}
                                        onChange={(newRating) => handleOrgRatingChange(criteria, newRating)}
                                    />
                                    </div>
                                </div>
                                ))}
                            </form>
                            <div className='flex mt-5'>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md ml-auto">Update appraisal</button>
                            </div>
                        </form>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppraisalDetails;

