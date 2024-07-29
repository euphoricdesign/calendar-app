import { useMemo } from 'react'
import Modal from 'react-modal'

import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es';

import { useModalForm } from '../hooks/useModalForm';

import 'react-datepicker/dist/react-datepicker.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from '../../hooks/useUiStore';

registerLocale('es', es) // react-datepicker utiliza la biblioteca date-fns para el manejo y formato de fechas, y registerLocale se utiliza para registrar localizaciones adicionales proporcionadas por date-fns/locale.

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root'); //  el método setAppElement se utiliza para establecer el elemento raíz de la aplicación que será ocultado a los lectores de pantalla cuando el modal esté abierto

export const CalendarModal = () => {

    const { isDateModalOpen } = useUiStore() // custom hook que consume de mi store, en lugar de usar acá el useSelector 

    const {
        formSubmitted,
        formValues,
        onCloseModal,
        onInputChange,
        onDateChange,
        onSubmit
    } = useModalForm() // custom hook para manejar el formulario del Modal 

    const titleClass = useMemo(() => {
        if ( !formSubmitted ) return ''

        return ( formValues.title.length > 0 ) ? '' : 'is-invalid'
    }, [formValues.title, formSubmitted])

    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo" // La superposición es la capa oscura y transparente que se muestra detrás del componente Modal para enfocar la atención del usuario en el contenido del modal.
            closeTimeoutMS={ 200 }
        >
            <h1 className='tw-text-[20px] tw-mb-[18px]'> Crea un nuevo evento </h1>
            <form onSubmit={ onSubmit }>
                <div className="form-group mb-2">
                    <label className='tw-text-gray-500'>Fecha y hora inicio</label>
                    <DatePicker 
                        selected={ formValues.start } // la fecha seleccionada
                        onChange={ (event) => onDateChange(event, 'start') } //  el componente DatePicker no tiene un evento directo llamado onChange. en su lugar, utiliza el evento onChange estándar de React en combinación con la propiedad selected para capturar cambios en la selección de fecha.
                        className='form-control'
                        dateFormat="Pp" // hora, minuto y segundo
                        showTimeSelect // muestra para seleccionar hora
                        locale="es" // configuramos idioma
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label className='tw-text-gray-500'>Fecha y hora fin</label>
                    <DatePicker 
                        minDate={ formValues.start } // no podría seleccionar una fecha que este antes de la fecha de inicio
                        selected={ formValues.end }
                        onChange={ (event) => onDateChange(event, 'end') } 
                        className='form-control'
                        dateFormat="Pp" // hora, minuto y segundo
                        showTimeSelect // muestra para seleccionar hora
                        locale="es" // configuramos idioma
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label className='tw-text-gray-500'>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ titleClass }`}
                        placeholder="Título del evento"
                        autoComplete="off"
                        name="title"
                        value={ formValues.title }
                        onChange={ onInputChange }
                    />
                    <small className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChange }
                    />
                </div>

                <button
                    type="submit"
                    className="btn tw-bg-orange-500 tw-text-white hover:tw-text-white tw-w-full tw-mt-[18px]"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    )
}
