import { useDispatch, useSelector } from "react-redux"
import { changeActiveEvent, onAddNewEvent, onDeleteEvent, onUpdateEvent, onLoadEvents } from "../store"
import calendarApi from "../api/calendarApi"
import Swal from "sweetalert2"
import { parseEventDates } from '../helpers/parseEventDates'



export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { events, activeEvent, } = useSelector(state => state.calendar)
    const { user } = useSelector( state => state.auth ) 

    const onChangeActiveEvent = (event) => {
        dispatch( changeActiveEvent(event) )
    }


    // En este proyecto no vamos a utilizar thunks en su lugar lo haremos de la siguiente manera:

    const startSavingEvent = async( calendarEvent ) => { // Creamos una función que se ve similar como lo haría un thunk. Al comenzar con la palabra Start hay que mentalizarse de que va a iniciar un proceso, en este caso de grabación de un nuevo evento

        try {
            if ( calendarEvent.id ) {
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent ) 
                dispatch( onUpdateEvent({ ...calendarEvent, user }) ) 
                return 

            } else {
                const { data } = await calendarApi.post('/events', calendarEvent ) 
                dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) )  // Si es un evento nuevo sabemos que no va a tener id, por lo que vamos a crearle un id ficticio por el momento 
            }
        } catch (error) {
            console.log(error);
            // Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    } 

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`events/${activeEvent.id}`)
            dispatch(onDeleteEvent())
        } catch (error) {
            dispatch( onDeleteEvent(activeEvent) )
            // Swal.fire('Error al eliminar', error.response.data.msg, 'error')
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events') 
            const events = parseEventDates(data.events)
            dispatch( onLoadEvents(events))
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error)
          }
    }


    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent, // si esto es null va a regresar false si es un objeto va a regresar true, es todo lo que precisamos para saber rápidamente si hay un evento seleccionado o no

        //* Métodos
        onChangeActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }

}