import { useEffect, useState } from 'react'

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import { addHours, differenceInSeconds } from 'date-fns'
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';


export const useModalForm = () => {
    const [ formSubmitted, setFormSubmitted ] = useState(false)

    const { closeDateModal } = useUiStore()
    const { activeEvent, startSavingEvent } = useCalendarStore()

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2 )
    })
    
    useEffect(() => {
        if ( activeEvent !== null ) {
            setFormValues({ ...activeEvent })
        }
    }, [ activeEvent ])


    const onCloseModal = () => {
        closeDateModal()
    }

    const onInputChange = ({ target }) => {
        const { name, value } = target

        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const onDateChange = ( date, selected ) => { // date sería el evento, que me devuelve la fecha que estoy seleccionando tal cual y selected es la propiedad con ese nombre del componente DatePicker 
        setFormValues({
            ...formValues,
            [selected]: date
        })
    }

    const onSubmit = async(event) => {
        event.preventDefault()
        setFormSubmitted(true)

        
        const difference = differenceInSeconds( formValues.end, formValues.start ) // La función differenceInSeconds de date-fns se utiliza para calcular la diferencia en segundos entre dos fechas
        
        if ( isNaN( difference ) || difference <= 0 ) { // isNaN es una función de js. Si no es un número o la diferencia es menor a 0, es decir la fecha final es menor 
            Swal.fire('Incorrect dates', 'Check dates entered', 'error')
            return
        }
        
        if ( formValues.title.length <= 0 ) return

        //* TODO: 
        await startSavingEvent( formValues ) 
        closeDateModal()
        setFormSubmitted(false)

    }


    return {
        //* Propiedades
        formSubmitted,
        formValues,

        //* Métodos 
        onCloseModal,
        onInputChange,
        onDateChange,
        onSubmit
    }
}