import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Header from '../Header/Header';
import Chart from 'react-apexcharts';
import { CheckCircleIcon, RefreshIcon, PlayIcon, PauseIcon, UserGroupIcon, BriefcaseIcon, CalendarIcon } from '@heroicons/react/solid';
import { APIDashboard } from '@/Apis/APIDashboard';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIDashboard.getDashboardData();
        setDashboardData(data.dashboard || {});
        toast.success('Data loaded successfully! 🎉');
      } catch (error) {

      }
    };

    fetchData();
  }, []);

  if (!dashboardData) {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-xl font-semibold">Loading...</div>
    </div>;
  }

  const projectsStatusSeries = dashboardData.project_summary.map(project => project.project_bar);

  const payrollChartOptions = {
    chart: {
      id: 'payroll-chart',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: ['Jan 2024', 'Dec 2023', 'Nov 2023', 'Oct 2023', 'Sep 2023', 'Aug 2023', 'Jul 2023', 'Jun 2023', 'May 2023', 'Apr 2023', 'Mar 2023', 'Feb 2023']
    },
    colors: ['#3056d3'],
  };

  const payrollChartSeries = [
    {
      name: 'Payroll',
      data: dashboardData.payroll_summary.map(item => item.amount)
    }
  ];

  const radialBarChartOptions = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b
              }, 0)
            }
          }
        }
      }
    },
    labels: ['Project A', 'Project B', 'Project C', 'Project D'],
  };

  const tasksStatusSeries = [76, 85, 101, 98];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-green-500 text-white rounded-lg shadow-lg p-6 flex items-center justify-between transition-transform transform hover:scale-105">
            <div className="flex items-center">
              <CheckCircleIcon className="h-10 w-10 text-white mr-4" />
              <div>
                <p className="font-bold text-2xl">{dashboardData.project_status.Completed}</p>
                <p className="text-sm">Total Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-500 text-white rounded-lg shadow-lg p-6 flex items-center justify-between transition-transform transform hover:scale-105">
            <div className="flex items-center">
              <RefreshIcon className="h-10 w-10 text-white mr-4" />
              <div>
                <p className="font-bold text-2xl">{dashboardData.project_status.In_Progress}</p>
                <p className="text-sm">Total In Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-teal-500 text-white rounded-lg shadow-lg p-6 flex items-center justify-between transition-transform transform hover:scale-105">
            <div className="flex items-center">
              <PlayIcon className="h-10 w-10 text-white mr-4" />
              <div>
                <p className="font-bold text-2xl">{dashboardData.project_status.Not_Started}</p>
                <p className="text-sm">Total Not Started</p>
              </div>
            </div>
          </div>
          <div className="bg-red-500 text-white rounded-lg shadow-lg p-6 flex items-center justify-between transition-transform transform hover:scale-105">
            <div className="flex items-center">
              <PauseIcon className="h-10 w-10 text-white mr-4" />
              <div>
                <p className="font-bold text-2xl">{dashboardData.project_status.On_Hold}</p>
                <p className="text-sm">Total On Hold</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Payroll Monthly Report Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="text-xl font-semibold mb-4">Payroll Monthly Report</div>
              <Chart
                options={payrollChartOptions}
                series={payrollChartSeries}
                type="bar"
                height="350"
              />
            </div>

            {/* Projects Status */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="text-xl font-semibold mb-4">Projects Status</div>
              <Chart
                options={radialBarChartOptions}
                series={projectsStatusSeries}
                type="radialBar"
                height="350"
              />
            </div>

            {/* Tasks Status */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="text-xl font-semibold mb-4">Tasks Status</div>
              <Chart
                options={radialBarChartOptions}
                series={tasksStatusSeries}
                type="radialBar"
                height="350"
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* Department wise staff */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-transform transform hover:scale-110 hover:shadow-2xl">
              <div className="text-xl font-semibold mb-4 flex items-center">
                <UserGroupIcon className="h-6 w-6 text-gray-600 mr-2" />
                Department Wise Staff
              </div>
              <div className="flex items-center mb-4">
                <UserGroupIcon className="h-8 w-8 mr-4" />
                <div>
                  <p className="font-bold text-lg">Total Departments: {Object.keys(dashboardData.departments).length}</p>
                  <p className="text-sm">View the distribution of staff across different departments</p>
                </div>
              </div>
              <ul className="space-y-2">
                {Object.entries(dashboardData.departments).map(([department, count]) => (
                  <li key={department} className="flex justify-between">
                    <span>{department}</span>
                    <span>{count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Designation wise staff */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="text-xl font-semibold mb-4 flex items-center">
                <BriefcaseIcon className="h-6 w-6 text-gray-600 mr-2" />
                Designation Wise Staff
              </div>
              <div className="flex items-center mb-4">
                <BriefcaseIcon className="h-8 w-8 mr-4" />
                <div>
                  <p className="font-bold text-lg">Total Designations: {Object.keys(dashboardData.designations).length}</p>
                  <p className="text-sm">View the distribution of staff across different designations</p>
                </div>
              </div>
              <ul className="space-y-2">
                {Object.entries(dashboardData.designations).map(([designation, count]) => (
                  <li key={designation} className="flex justify-between">
                    <span>{designation}</span>
                    <span>{count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Staff attendance */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="text-xl font-semibold mb-4 flex items-center">
                <CalendarIcon className="h-6 w-6 text-gray-600 mr-2" />
                Staff Attendance
              </div>
              <div className="flex items-center mb-4">
                <CalendarIcon className="h-8 w-8 mr-4" />
                <div>
                  <p className="font-bold text-lg">Total Staff: {dashboardData.attendance_summary.total_staff}</p>
                  <p className="text-sm">View the attendance details of staff</p>
                </div>
              </div>
              <div className="space-y-2">
                <p>Total Staff: {dashboardData.attendance_summary.total_staff}</p>
                <p>Present: {dashboardData.attendance_summary.present}</p>
                <p>Absent: {dashboardData.attendance_summary.absent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


