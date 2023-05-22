// hook que utilizaremos para manejar y hacer dispatch de acciones y controlar todo lo que este relacionado a mi ui en el store 
// En este proyecto vamos a crear un custom hook por cada slice/parte de mi store, con el fin de facilitar el consumo del mismo

import { useSelector } from "react-redux"

export const useUiStore = () => {

    const { isDateModalOpen } = useSelector(state => state.ui)

    return {
        
    }
}

