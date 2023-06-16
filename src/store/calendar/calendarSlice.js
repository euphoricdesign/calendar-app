import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = { // Esto es temporal pues lo leeremos del backend mas adelante
    _id: new Date().getTime(), // este id debería venir del backend 
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar un pastel',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Merlina'
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [ tempEvent ], // Array de eventos 
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
                state.events = state.events.filter(event => event._id !== payload._id)
                state.activeEvent = null
            }
        }
    }
});


export const { changeActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;