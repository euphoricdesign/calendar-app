import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getDay } from 'date-fns'; // Importa función para obtener el día de la semana
import CustomWeekday from './CustomWeekDay';

const MiniCalendar = ({ selectedDate, setSelectedDate }) => {
    const currentDay = new Date().getDay();
    const highlightClass = `highlight-today day-${currentDay + 1}`;
  
    return (
      <DatePicker
        calendarClassName={highlightClass}
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
     />
  );
};

export default MiniCalendar;
