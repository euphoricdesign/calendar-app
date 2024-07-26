
import { useCalendarStore } from "../../hooks/useCalendarStore"
import { useUiStore } from "../../hooks/useUiStore"

export const FabDelete = () => {

    const { isDateModalOpen } = useUiStore()

    const { startDeletingEvent, hasEventSelected } = useCalendarStore()

    const handleDelete = () => {
        startDeletingEvent()
    }

    return (
        <button 
            onClick={ handleDelete } 
            className="btn btn-danger fab-danger"
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}