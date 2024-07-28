import { configureStore } from '@reduxjs/toolkit'

import { authSlice } from './auth/authSlice'
import { uiSlice } from './ui/uiSlice'
import { calendarSlice } from './calendar/calendarSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false 
    }) // soluciona problema de serialización de fechas, directamente le decimos que no es necesario que revise si son serializables o no 
})

// getDefaultMiddleware es una función proporcionada por Redux Toolkit que devuelve un conjunto predeterminado de middlewares para ser
// utilizados en el store. Estos middlewares incluyen funcionalidades comunes y útiles

// En particular, el objeto de configuración {serializableCheck: false} se utiliza para desactivar la verificación de acciones serializables.
// La verificación de acciones serializables es una característica de Redux Toolkit que ayuda a garantizar que las acciones que se envían al
// store sean objetos planos y serializables. Al establecer serializableCheck en false, se está indicando que no se realizará esta verificación.

// En resumen, este código configura una store de Redux utilizando Redux Toolkit, especifica los reducers que manejarán las actualizaciones de
// estado y desactiva la comprobación de serialización en el middleware predeterminado.