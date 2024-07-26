import React from 'react';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';

const CustomWeekday = () => {
  const today = new Date();
  const currentDayIndex = today.getDay();
  
  const weekDays = [...Array(7)].map((_, i) => {
    const day = addDays(new Date(today.setDate(today.getDate() - today.getDay())), i);
    const dayName = format(day, 'EEEEEE', { locale: es }).toUpperCase();
    const isCurrentDay = i === currentDayIndex;
    
    return { dayName, isCurrentDay };
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {weekDays.map(({ dayName, isCurrentDay }, index) => (
        <div
          key={index}
          style={{
            fontWeight: isCurrentDay ? 'bold' : 'normal',
            color: isCurrentDay ? '#007bff' : '#999',
          }}
        >
          {dayName}
        </div>
      ))}
    </div>
  );
};

export default CustomWeekday;