import { useDispatch, useSelector } from "react-redux"
import { changeActiveEvent } from "../store"



export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector(state => state.calendar)

    const onChangeActiveEvent = (event) => {
        dispatch( changeActiveEvent(event) )
    }


    return {
        //* Propiedades
        events,
        activeEvent,

        //* Métodos
        onChangeActiveEvent
    }

}