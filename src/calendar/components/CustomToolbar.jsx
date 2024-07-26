import React, { useState } from 'react';
import { Navigate } from 'react-big-calendar';
import { IoIosArrowBack, IoIosArrowForward, IoMdArrowDropdown } from "react-icons/io"
import { FabAddNew } from './FabAddNew';

export const CustomToolbar = (toolbar) => {
  const [selectedView, setSelectedView] = useState(toolbar.view);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const goToBack = () => {
    toolbar.onNavigate(Navigate.PREVIOUS);
  };

  const goToNext = () => {
    toolbar.onNavigate(Navigate.NEXT);
  };

  const goToCurrent = () => {
    toolbar.onNavigate(Navigate.TODAY);
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
    toolbar.onView(view);
    setDropdownOpen(false);
  };

  const label = () => {
    const date = toolbar.date;
    const [month, year] = [
      date.toLocaleString('default', { month: 'long' }),
      date.getFullYear(),
    ];

    // Función para capitalizar la primera letra de una cadena
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const capitalizedMonth = capitalizeFirstLetter(month);

    return (
      <div>
        <span style={{ fontWeight: 700 }}>{capitalizedMonth}</span>{' '}
        <span style={{ fontWeight: 300 }}>{year}</span>
      </div>
    );
  };

  return (
    <div className="custom-toolbar">
      <div className="navigation-buttons">
        <button className='today' onClick={goToCurrent}>Today</button>
        <button onClick={goToBack}><IoIosArrowBack /></button>
        <button onClick={goToNext}><IoIosArrowForward /></button>
        <div className="date-label">{label()}</div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px'}}>
        <div className="select" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className="selected">
            {selectedView.charAt(0).toUpperCase() + selectedView.slice(1)}
            <svg style={{fontSize:'12px', color: 'rgb(92 92 92)'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="arrow">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
            </svg>
          </div>
          {dropdownOpen && (
            <div className="options">
              <div 
                className={`option ${selectedView === 'month' ? 'active' : ''}`} 
                onClick={() => handleViewChange('month')}
              >
                Mes
              </div>
              <div 
                className={`option ${selectedView === 'week' ? 'active' : ''}`} 
                onClick={() => handleViewChange('week')}
              >
                Semana
              </div>
              <div 
                className={`option ${selectedView === 'day' ? 'active' : ''}`} 
                onClick={() => handleViewChange('day')}
              >
                Día
              </div>
            </div>
          )}
        </div>

        <div>
          <FabAddNew />
        </div>
      </div>
    </div>
  );
};
