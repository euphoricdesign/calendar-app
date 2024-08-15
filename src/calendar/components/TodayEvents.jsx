import React, { useState, useEffect } from 'react';
import { format, isToday } from 'date-fns';
import { useSelector } from 'react-redux';
import { TbPointFilled } from "react-icons/tb";

const TodayEventsComponent = () => {
  const [todayEvents, setTodayEvents] = useState([]);
  const { events } = useSelector(state => state.calendar);

  useEffect(() => {
    const filteredEvents = events.filter(event => 
      isToday(new Date(event.start))
    );
    setTodayEvents(filteredEvents);
  }, [events]); // Ahora el efecto se ejecuta cada vez que 'events' cambia

  return (
    <div className="tw-mt-[18px]">
      {todayEvents.length === 0 ? (
        <p className='tw-text-center'>No events for today</p>
      ) : (
        <ul className='tw-text-xs'>
          {todayEvents.map(evento => (
            <li key={evento.id} className='tw-flex tw-gap-[14px] tw-items-center tw-mb-[18px]'>
              <span className='tw-text-gray-500'>{format(new Date(evento.start), 'HH:mm')}</span> <span className='tw-text-[15px] tw-flex tw-items-center tw-gap-2'><TbPointFilled className='tw-text-orange-600' /> {evento.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodayEventsComponent;