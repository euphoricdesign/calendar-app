import { useState } from 'react'

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import { addHours, differenceInSeconds } from 'date-fns'


export const useModalForm = () => {

    const [ isOpen, setIsOpen ] = useState(true)
    const [ formSubmitted, setFormSubmitted ] = useState(false)

    const [formValues, setFormValues] = useState({
        title: 'Merlina',
        notes: 'Villecco',
        start: new Date(),
        end: addHours( new Date(), 2 )
    })
    

    const onCloseModal = () => {
        console.log('cerrando modal');
        setIsOpen(false)
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

    const onSubmit = (event) => {
        event.preventDefault()
        setFormSubmitted(true)

        const difference = differenceInSeconds( formValues.end, formValues.start ) // La función differenceInSeconds de date-fns se utiliza para calcular la diferencia en segundos entre dos fechas

        if ( isNaN( difference ) || difference <= 0 ) { // isNaN es una función de js. Si no es un número o la diferencia es menor a 0, es decir la fecha final es menor 
            Swal.fire('Fechas incorrectas', 'Revisar fechas ingresadas', 'error')
            return
        }

        if ( !formValues.title.length <= 0 ) return


    }


    return {
        isOpen,
        formSubmitted,
        formValues,
        onCloseModal,
        onInputChange,
        onDateChange,
        onSubmit
    }
}