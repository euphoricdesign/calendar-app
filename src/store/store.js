import { configureStore } from '@reduxjs/toolkit'
import { uiSlice } from './ui/uiSlice'

console.log(uiSlice)

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer
    }
})