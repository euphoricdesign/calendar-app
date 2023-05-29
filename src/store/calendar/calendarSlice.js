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
        changeActiveEvent: (state, action ) => {
            state.activeEvent = action.payload
        },
    }
});


export const { changeActiveEvent } = calendarSlice.actions;