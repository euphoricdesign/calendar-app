import { useDispatch, useSelector } from "react-redux"
import { changeActiveEvent, onAddNewEvent, onDeleteEvent, onUpdateEvent } from "../store"



export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { events, activeEvent, } = useSelector(state => state.calendar)

    const onChangeActiveEvent = (event) => {
        dispatch( changeActiveEvent(event) )
    }


    // En este proyecto no vamos a utilizar thunks en su lugar lo haremos de la siguiente manera:
    
    const startSavingEvent = async( calendarEvent ) => { // Creamos una función que se ve similar como lo haría un thunk. Al comenzar con la palabra Start hay que mentalizarse de que va a iniciar un proceso, en este caso de grabación de un nuevo evento
        
        //* TODO: llegar al backend, mandarle la información respectiva, el mismo me regresa la información 
        
        //* Si todo sale bien 

        if ( calendarEvent._id ) {

            dispatch( onUpdateEvent( calendarEvent ) )

            //* Actualizando un evento 

        } else {

            //* Creando un evento
            dispatch(onAddNewEvent( { ...calendarEvent, _id: new Date().getTime() } )) // Si es un evento nuevo sabemos que no va a tener id, por lo que vamos a crearle un id ficticio por el momento 

        }


    } 

    const startDeletingEvent = () => {
        //* TODO: Llegar al backend 

        dispatch( onDeleteEvent(activeEvent) )
    }


    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent, // si esto es null va a regresar false si es un objeto va a regresar true, es todo lo que precisamos para saber rápidamente si hay un evento seleccionado o no

        //* Métodos
        onChangeActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }

}