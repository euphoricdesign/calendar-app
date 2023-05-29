import { addHours } from "date-fns"
import { useCalendarStore } from "../../hooks/useCalendarStore"
import { useUiStore } from "../../hooks/useUiStore"

export const FabAddNew = () => {

    //* Cuando click en este botón quiero abrir el Modal y activar un nuevo evento

    const { openDateModal } = useUiStore()
    const { onChangeActiveEvent } = useCalendarStore()

    const handleNewEvent = () => {
        onChangeActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Merlina'
            }
        })

        openDateModal()
    }

    return (
        <button onClick={handleNewEvent} className="btn btn-primary fab">
            <i className="fas fa-plus"></i>
        </button>
    )
}