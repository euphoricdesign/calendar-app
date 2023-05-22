import { useState } from 'react'

import { Calendar } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns' 
import { CalendarEvent, CalendarModal, Navbar } from "../" // componentes

import { localizer, getMessagesES } from '../../helpers' // helpers


const events = [{ // array de eventos
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar un pastel',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Merlina'
    }
}]

export const CalendarPage = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week' )

    const eventStyleGetter = ( event, start, end, isSelected ) => { // personalizar la apariencia y el estilo de los eventos en el calendario

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    // Crearemos 3 eventos/funciones que conectaremos cuando algo suceda en nuestro calendario
    const onDoubleClick = ( event ) => {
        console.log( { doubleClick: event } );
    }

    const onSelect = ( event ) => {
        console.log( { selectClick: event } );
    }

    const onViewChanged = ( event ) => {
        localStorage.setItem('lastView', event)
    }


    return (
        <>
            <Navbar />

            <Calendar
                culture='es' // si queremos poner el calendario en español (días y meses) utilizamos esta propiedad, la misma va a buscar en el objeto 'locales' de nuestro localizer la propiedad 'es'
                localizer={ localizer }
                events={ events }
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={ getMessagesES() } // esto nos configura en español el resto del calendario (botones, mensajes)
                eventPropGetter={ eventStyleGetter } // eventPropGetter es una función opcional que se utiliza para personalizar la apariencia y el estilo de los eventos en el calendario
                components={{
                    event: CalendarEvent
                }} // la propiedad components se utiliza para personalizar y reemplazar los componentes internos utilizados por el calendario. Permite reemplazar componentes clave como los encabezados de fecha, los días de la semana, los eventos, etc., con tus propios componentes personalizados.
                onDoubleClickEvent={ onDoubleClick } // el componente Calendar puede recibir varios eventos que te permiten capturar y manejar diferentes interacciones y cambios en el calendario. 
                onSelectEvent={ onSelect }
                onView={ onViewChanged }

            />

            <CalendarModal />
        </>
    )
}
