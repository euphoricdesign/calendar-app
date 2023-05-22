// información de la ui 

import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false // Para saber el estado del Modal para selección de fecha, etc
    },
    reducers: {
        onOpenDateModal: (state, action ) => { // Esto se va a llamar cuando el usuario abra el Modal 
            state.isDateModalOpen = true
        },
        onCloseDateModal: (state, action ) => { // Esto se va a llamar cuando el usuario abra el Modal 
            state.isDateModalOpen = false
        },
    }
});


export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
