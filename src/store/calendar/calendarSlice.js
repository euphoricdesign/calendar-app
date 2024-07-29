import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [], // Array de eventos 
        activeEvent: null, // Evento activo

    },
    reducers: {
        changeActiveEvent: (state, { payload }) => {
            state.activeEvent = payload
        },
        onAddNewEvent:  (state, { payload }) => {
            state.events.push( payload )
            state.activeEvent = null // limpio el evento activo y esto esta listo para esperar el siguiente evento 
        },
        onUpdateEvent:  (state, { payload }) => {
             state.events = state.events.map(event => {
                if ( event._id === payload._id ) {
                    return payload
                }

                return event
             })
        },
        onDeleteEvent: (state, { payload }) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter(event => event.id !== payload.id)
                state.activeEvent = null
            }
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach( event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id );
                if ( !exists ) {
                    state.events.push( event )
                }
            })
        },
        onLogoutCalendar: ( state ) => {
            state.isLoadingEvents = true,
            state.events      = []
            state.activeEvent = null
        }
    }
});


export const { changeActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions;