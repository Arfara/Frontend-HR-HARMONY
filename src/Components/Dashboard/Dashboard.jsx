import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Header from '../Header/Header';
import Chart from 'react-apexcharts';
import { CheckCircleIcon, RefreshIcon, PlayIcon, PauseIcon, UserGroupIcon, BriefcaseIcon, CalendarIcon } from '@heroicons/react/solid';
import { APIDashboard } from '@/Apis/APIDashboard';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIDashboard.getDashboardData();
        setDashboardData(data || {});
      } catch (error) {
        setLoadingMessage("Failed to load data. Please try again.");
      }
    };

    fetchData();
  }, []);

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-100">
        <div className="text-center">
          <img src={require('../Assets/comp_logo.png')} alt="Loading" className="h-48 w-48 mx-auto animate-bounce" />
          <p className="mt-4 text-lg text-gray-700">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  const projectsStatusSeries = dashboardData.project_summary ? dashboardData.project_summary.map(project => project.project_bar) : [];

  const payrollChartOptions = {
    chart: {
      id: 'payroll-chart',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: dashboardData.payroll_summary ? dashboardData.payroll_summary.map(item => item.month) : []
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toFixed(0);
        }
      }
    },
    dataLabels: {
      formatter: function (value) {
        return value.toFixed(0);
      }
    },
    colors: ['#3056d3'],
  };

  const payrollChartSeries = [
    {
      name: 'Payroll',
      data: dashboardData.payroll_summary ? dashboardData.payroll_summary.map(item => item.amount) : []
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
    labels: dashboardData.project_summary ? dashboardData.project_summary.map(project => project.project_name) : [],
  };

  const tasksStatusSeries = dashboardData.task_summary ? dashboardData.task_summary.map(task => task.progress_bar) : [];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-green-500 text-white rounded-lg shadow-lg p-6 flex items-center justify-between transition-transform transform hover:scale-105">
            <div className="flex items-center">
              <CheckCircleIcon className="h-10 w-10 text-white mr-4" />
              <div>
                <p className="font-bold text-2xl">{dashboardData.project_status?.Completed || 0}</p>
                <p className="text-sm">Total Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-500 text-white rounded-lg shadow-lg p-6 flex items-center justify-between transition-transform transform hover:scale-105">
            <div className="flex items-center">
              <RefreshIcon className="h-10 w-10 text-white mr-4" />
              <div>
                <p className="font-bold text-2xl">{dashboardData.project_status?.In_Progress || 0}</p>
                <p className="text-sm">Total In Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-teal-500 text-white rounded-lg shadow-lg p-6 flex items-center justify-between transition-transform transform hover:scale-105">
            <div className="flex items-center">
              <PlayIcon className="h-10 w-10 text-white mr-4" />
              <div>
                <p className="font-bold text-2xl">{dashboardData.project_status?.Not_Started || 0}</p>
                <p className="text-sm">Total Not Started</p>
              </div>
            </div>
          </div>
          <div className="bg-red-500 text-white rounded-lg shadow-lg p-6 flex items-center justify-between transition-transform transform hover:scale-105">
            <div className="flex items-center">
              <PauseIcon className="h-10 w-10 text-white mr-4" />
              <div>
                <p className="font-bold text-2xl">{dashboardData.project_status?.Cancelled || 0}</p>
                <p className="text-sm">Total Cancelled</p>
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
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="text-xl font-semibold mb-4 flex items-center">
                <UserGroupIcon className="h-6 w-6 text-gray-600 mr-2" />
                Department Wise Staff
              </div>
              <div className="flex items-center mb-4">
                <UserGroupIcon className="h-8 w-8 mr-4" />
                <div>
                  <p className="font-bold text-lg">Total Departments: {dashboardData.departments ? Object.keys(dashboardData.departments).length : 0}</p>
                  <p className="text-sm">View the distribution of staff across different departments</p>
                </div>
              </div>
              <ul className="space-y-2">
                {dashboardData.departments ? Object.entries(dashboardData.departments).map(([department, count]) => (
                  <li key={department} className="flex justify-between">
                    <span>{department}</span>
                    <span>{count}</span>
                  </li>
                )) : null}
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
                  <p className="font-bold text-lg">Total Designations: {dashboardData.designations ? Object.keys(dashboardData.designations).length : 0}</p>
                  <p className="text-sm">View the distribution of staff across different designations</p>
                </div>
              </div>
              <ul className="space-y-2">
                {dashboardData.designations ? Object.entries(dashboardData.designations).map(([designation, count]) => (
                  <li key={designation} className="flex justify-between">
                    <span>{designation}</span>
                    <span>{count}</span>
                  </li>
                )) : null}
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
                  <p className="font-bold text-lg">Total Staff: {dashboardData.attendance_summary ? dashboardData.attendance_summary.total_staff : 0}</p>
                  <p className="text-sm">View the attendance details of staff</p>
                </div>
              </div>
              <div className="space-y-2">
                <p>Total Staff: {dashboardData.attendance_summary ? dashboardData.attendance_summary.total_staff : 0}</p>
                <p>Present: {dashboardData.attendance_summary ? dashboardData.attendance_summary.present : 0}</p>
                <p>Absent: {dashboardData.attendance_summary ? dashboardData.attendance_summary.absent : 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

