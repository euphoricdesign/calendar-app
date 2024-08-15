import { useEffect, useState } from 'react'

import { Calendar } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, Navbar, FabDelete } from "../" // componentes

import { localizer, getMessages } from '../../helpers' // helpers

import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { CustomToolbar } from '../components/CustomToolbar'

import { dayPropGetter } from '../../helpers/dayPropGetter'
import MiniCalendar from '../components/MiniCalendar'

import { IoCalendarOutline } from "react-icons/io5";
import TodayEventsComponent from '../components/TodayEvents'


export const CalendarPage = () => {

    const { openDateModal } = useUiStore()
    const { events, onChangeActiveEvent, startLoadingEvents } = useCalendarStore()

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month' )
    const [selectedDate, setSelectedDate] = useState(new Date());

    const eventStyleGetter = ( event, start, end, isSelected ) => { //* personalizar la apariencia y el estilo de los eventos en el calendario
        const style = {
            backgroundColor: 'rgb(247, 116, 33)',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }
        return {
            style
        }
    }

    //* Crearemos 3 eventos/funciones que conectaremos cuando algo suceda en nuestro calendario
    const onDoubleClick = ( event ) => {
        openDateModal()
        
    }

    const onSelect = ( event ) => {
        // console.log( { selectClick: event } );
        onChangeActiveEvent( event )
    }

    const onViewChanged = ( event ) => {
        localStorage.setItem('lastView', event)
    }

    useEffect(() => {
        startLoadingEvents()
      }, [])


      // Función personalizada para el formato de días
const customFormats = {
    dayFormat: (date, culture, localizer) => {
      // Obtener la abreviatura del día
      const weekdayShort = localizer.format(date, 'eee', culture);
      // Obtener el ancho de la pantalla
      const isSmallScreen = window.innerWidth < 600;
      // Retornar la abreviatura modificada según el tamaño de pantalla
      return isSmallScreen ? weekdayShort.charAt(0) : weekdayShort;
    },
    weekdayFormat: (date, culture, localizer) => {
        const fullDay = localizer.format(date, 'EEEE', culture); // "Monday"
        const shortDay = localizer.format(date, 'EEE', culture); // "Mon"
        const isSmallScreen = window.innerWidth < 600;
        return isSmallScreen ? shortDay.charAt(0) : shortDay;
      },
  };

    return (
        <>
            <Navbar />
            
            <div className='main-container tw-flex tw-justify-between mobile:tw-p-[20px] desktop:tw-py-[40px] desktop:tw-px-[100px] tw-gap-[5%]' style={{ background: 'whitesmoke' }}>
                <div className='mobile:tw-hidden desktop:tw-block'>
                    <MiniCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    <div className='tw-rounded-[10px] tw-shadow-custom tw-bg-white tw-w-[260.3px] tw-h-[260.85px] tw-p-[15px] tw-mt-[18px]'>
                        <div className='tw-flex tw-items-center'>
                            <IoCalendarOutline className='tw-text-orange-600' />
                            <h2 className='tw-ml-[50px] tw-font-semibold'>Today's events</h2>
                        </div>
                        <TodayEventsComponent />
                    </div>
                </div>
           

                <Calendar
                    culture='en' // si queremos poner el calendario en español (días y meses) utilizamos esta propiedad, la misma va a buscar en el objeto 'locales' de nuestro localizer la propiedad 'es'
                    localizer={ localizer }
                    events={ events }
                    defaultView={ lastView }
                    startAccessor="start"
                    endAccessor="end" // se utilizan para especificar los nombres de la propiedades que representan la fecha de inicio y fin del evento en los objetos de eventos.
                    style={{ height: 'calc(-147px + 100vh)', background:'#f5f5f5' }}
                    messages={ getMessages() } // esto nos configura en español el resto del calendario (botones, mensajes)
                    eventPropGetter={ eventStyleGetter } // eventPropGetter es una función opcional que se utiliza para personalizar la apariencia y el estilo de los eventos en el calendario
                    components={{
                        toolbar: CustomToolbar,
                        event: CalendarEvent
                    }} // la propiedad components se utiliza para personalizar y reemplazar los componentes internos utilizados por el calendario. Permite reemplazar componentes clave como los encabezados de fecha, los días de la semana, los eventos, etc., con tus propios componentes personalizados.
                    onDoubleClickEvent={ onDoubleClick } // el componente Calendar puede recibir varios eventos que te permiten capturar y manejar diferentes interacciones y cambios en el calendario. 
                    onSelectEvent={ onSelect }
                    onView={ onViewChanged }
                    dayPropGetter={(date) => dayPropGetter(date, events)}  // Añade esta línea
                    formats={customFormats}
                />

                <CalendarModal />
                <FabDelete />
            </div>
        </>
    )
}
