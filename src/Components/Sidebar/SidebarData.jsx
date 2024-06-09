import { MdDashboard, MdPayments, MdKeyboardArrowDown, MdKeyboardArrowUp, MdEmojiPeople } from "react-icons/md";
import { FaUsers, FaUserClock, FaSync, FaTasks } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FiHelpCircle } from "react-icons/fi";

const SideBarData = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />
    },
    {
        title: "Employees",
        path: "#",
        icon: <FaUsers />,
        iconClosed: <MdKeyboardArrowDown />,
        iconOpened: <MdKeyboardArrowUp />,
        subNav: [
            {
                title: "Employees",
                path: "/employees/staff-list"
            },
            {
                title: "Position",
                path: "/employees/position"
            },
            {
                title: "Shift Scheduling",
                path: "/employees/shift-scheduling"
            },
            {
                title: "Employees Exit",
                path: "/employees/employees-exit"
            },
        ]
    },
    {
        title: "Core HR",
        path: "#",
        icon: <FaSync />,
        iconClosed: <MdKeyboardArrowDown />,
        iconOpened: <MdKeyboardArrowUp />,
        subNav: [
            {
                title: "Department",
                path: "/corehr/departments-list"
            },
            {
                title: "Designation",
                path: "/corehr/designation-list"
            },
            {
                title: "Policies",
                path: "/corehr/policies-list"
            },
            {
                title: "Make Announcement",
                path: "/corehr/news-list"
            },
        ]
    },
    {
        title: "Attendance",
        path: "#",
        icon: <FaUserClock />,
        iconClosed: <MdKeyboardArrowDown />,
        iconOpened: <MdKeyboardArrowUp />,
        subNav: [
            {
                title: "Attendance",
                path: "/attendances/attendance-list"
            },
            {
                title: "Manual Attendance",
                path: "/attendances/manual-attendance"
            },
            {
                title: "Monthly Report",
                path: "/attendances/monthly-report"
            },
            {
                title: "Overtime Request",
                path: "/attendances/overtime-request"
            },
        ]
    },
    {
        title: "Payroll",
        path: "#",
        icon: < MdPayments />,
        iconClosed: <MdKeyboardArrowDown />,
        iconOpened: <MdKeyboardArrowUp />,
        subNav: [
            {
                title: "Payroll",
                path: "/payroll/payroll-list"
            },
            {
                title: "Pasyslip History",
                path: "/payroll/payslip-history"
            },
            {
                title: "Advance Salary",
                path: "/payroll/advance-salary"
            },
            {
                title: "Request Loan",
                path: "/payroll/request-loan"
            },
        ]
    },
    {
        title: "Tasks",
        path: "#",
        icon: < FaTasks />,
        iconClosed: <MdKeyboardArrowDown />,
        iconOpened: <MdKeyboardArrowUp />,
        subNav: [
            {
                title: "Tasks",
                path: "/tasks/tasks-list"
            },
            {
                title:"Projects",
                path:"/tasks/project-list"
            },
            {
                title:"Calendar",
                path:"/tasks/calendar"
            }
        ]
    },
    {
        title: "Performance",
        path: "#",
        icon: < MdPayments />,
        iconClosed: <MdKeyboardArrowDown />,
        iconOpened: <MdKeyboardArrowUp />,
        subNav: [
            {
                title: "KPI (Indicator)",
                path: "/performance/performance-indicator"
            },
            {
                title: "KPA (Appraisal)",
                path: "/performance/performance-appraisal"
            },
            {
                title: "Track Goals (OKRs)",
                path: "/performance/track-goals"
            },
            {
                title: "Goal Type",
                path: "/performance/goal-type"
            },
        ]
    },
    {
        title: "Recruitment",
        path: "#",
        icon: < MdEmojiPeople />,
        iconClosed: <MdKeyboardArrowDown />,
        iconOpened: <MdKeyboardArrowUp />,
        subNav: [
            {
                title: "New Opening",
                path: "/recruitment/new-opening"
            },
            {
                title:"Candidates",
                path:"/recruitment/candidates"
            },
            {
                title:"Interviews",
                path:"/recruitment/interviews"
            },
            {
                title:"Promotions",
                path:"/recruitment/promotions"
            }
        ]   
    },
    {
        title: "Training",
        path: "#",
        icon: <LiaChalkboardTeacherSolid />,
        iconClosed: <MdKeyboardArrowDown />,
        iconOpened: <MdKeyboardArrowUp />,
        subNav: [
            {
                title: "Training Sessions",
                path: "/training/training-sessions"
            },
            {
                title: "Trainers",
                path: "/training/trainers"
            },
            {
                title: "Training Skills",
                path: "/training/training-skills"
            },
        ]
    },
    {
        title: "Leave Request",
        path: "#",
        icon: <LiaChalkboardTeacherSolid />,
        iconClosed: <MdKeyboardArrowDown />,
        iconOpened: <MdKeyboardArrowUp />,
        subNav: [
            {
                title: "Manage Leaves",
                path: "/leave/manage-leave"
            },
            {
                title: "Leave Type",
                path: "/leave/leave-type"
            },
        ]
    },
    {
        title: "Manage Client",
        path: "/client-list",
        icon: < FaBuildingUser />
    },
    {
        title: "Helpdesk",
        path: "/helpdesk",
        icon: < FiHelpCircle />
    },
    
];

export default SideBarData;
