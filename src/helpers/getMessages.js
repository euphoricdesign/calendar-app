export const getMessages = () => {
    return {
        allDay: 'All day',
        previous: '<',
        next: '>',
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        agenda: 'Schedule',
        date: 'Date',
        time: 'Time',
        event: 'Event',
        noEventsInRange: 'There are no events in this range',
        showMore: total => `+ View more (${total})` 
    }
}