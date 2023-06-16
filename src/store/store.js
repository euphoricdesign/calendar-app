import { configureStore } from '@reduxjs/toolkit'

import { uiSlice } from './ui/uiSlice'
import { calendarSlice } from './calendar/calendarSlice'

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false 
    }) // soluciona problema de serialización de fechas, directamente le decimos que no es necesario que revise si son serializables o no 
})