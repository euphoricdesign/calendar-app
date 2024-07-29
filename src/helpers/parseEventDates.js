// Esta función toma un array de eventos donde las propiedades start y end son strings en formato ISO, y las convierte en objetos Date de JavaScript.

import { parseISO } from 'date-fns';


export const parseEventDates = ( events = []) => {

    return events.map( event => {

        event.end = parseISO( event.end );
        event.start = parseISO( event.start );

        return event;
    })

}