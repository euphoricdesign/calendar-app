import { isSameDay, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export const dayPropGetter = (date, events) => {
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    // Verifica si hay eventos en esta fecha
    const hasEvent = events.some(event => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);

        // Verifica si el evento empieza y termina en el mismo día o abarca más de un día
        return isSameDay(eventStart, dayStart) || 
               isSameDay(eventEnd, dayStart) || 
               isWithinInterval(dayStart, { start: eventStart, end: eventEnd });
    });

    // Estilo para los días con eventos
    let style = {};
    if (hasEvent) {
        style = {
            backgroundColor: '#f9ecc973'
        };
    }

    return {
        style: style
    };
};
