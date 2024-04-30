import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/id';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

moment.locale('id');
const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate, onView }) => {
  return (
    <div className="flex justify-between items-center py-2">
      <div>
        <button
          onClick={() => onNavigate('TODAY')}
          className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
        >
          Today
        </button>
        <button
          onClick={() => onNavigate('PREV')}
          className="text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded mx-1"
        >
          Back
        </button>
        <button
          onClick={() => onNavigate('NEXT')}
          className="text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded"
        >
          Next
        </button>
      </div>
      <span className="text-lg">{label}</span>
      <div>
        <button
          onClick={() => onView('month')}
          className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
        >
          Month
        </button>
        <button
          onClick={() => onView('week')}
          className="text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded mx-1"
        >
          Week
        </button>
        <button
          onClick={() => onView('day')}
          className="text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded mx-1"
        >
          Day
        </button>
        <button
          onClick={() => onView('agenda')}
          className="text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded"
        >
          Agenda
        </button>
      </div>
    </div>
  );
};

const Legend = () => {
  return (
    <div className="flex flex-col w-full p-4">
      <div className="text-xl mb-2">Events</div>
      <div className="flex flex-wrap">
        <div className="flex items-center mr-4 mb-2">
          <span className="inline-block w-3 h-3 bg-grey-500 rounded-full mr-1"></span>
          <span>Not Started</span>
        </div>
        <div className="flex items-center mr-4 mb-2">
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
          <span>In Progress</span>
        </div>
        <div className="flex items-center mr-4 mb-2">
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
          <span>Completed</span>
        </div>
        <div className="flex items-center mr-4 mb-2">
          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
          <span>Cancelled</span>
        </div>
        <div className="flex items-center mr-4 mb-2">
          <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
          <span>On Hold</span>
        </div>
      </div>
    </div>
  );
};

const TasksCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const events = [
    {
      title: 'Meeting 1',
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 12, 0),
    },
    {
      title: 'Meeting 2',
      start: new Date(2024, 0, 20, 14, 0),
      end: new Date(2024, 0, 20, 16, 0),
    },
  ];

  const eventStyleGetter = (event, start, end, isSelected) => {
    let newStyle = {
      backgroundColor: "#3174ad",
      color: 'white',
      borderRadius: "0px",
      border: "none"
    };

    if (event.title === 'Meeting 1') {
      newStyle.backgroundColor = "blue";
    } else if (event.title === 'Meeting 2') {
      newStyle.backgroundColor = "green";
    }

    return {
      style: newStyle
    };
  };

  return (
    <div className='flex flex-col items-center p-5'>
      <Legend />
      <div className='relative mb-5'>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className='w-full max-w-4xl mx-auto'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          date={selectedDate}
          eventPropGetter={eventStyleGetter}
          components={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
    </div>
  );
};

export default TasksCalendar;