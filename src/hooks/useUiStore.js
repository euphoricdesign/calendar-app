// hook que utilizaremos para manejar y hacer dispatch de acciones y controlar todo lo que este relacionado a mi ui en el store 
// En este proyecto vamos a crear un custom hook por cada slice/parte de mi store, con el fin de facilitar el consumo del mismo

import { useDispatch, useSelector } from 'react-redux'
import { onCloseDateModal, onOpenDateModal } from '../store'

export const useUiStore = () => {

    const dispatch = useDispatch()
    const { isDateModalOpen } = useSelector(state => state.ui)

    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() )
    }

    return {
        //* Propiedades
        isDateModalOpen,

        //* Métodos
        openDateModal,
        closeDateModal
    }
}

