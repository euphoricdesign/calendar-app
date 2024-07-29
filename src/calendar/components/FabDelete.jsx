
import { useCalendarStore } from "../../hooks/useCalendarStore"
import { useUiStore } from "../../hooks/useUiStore"
import { MdDeleteOutline } from "react-icons/md";

export const FabDelete = () => {

    const { isDateModalOpen } = useUiStore()

    const { startDeletingEvent, hasEventSelected } = useCalendarStore()

    const handleDelete = () => {
        startDeletingEvent()
    }

    return (
        <button 
            onClick={ handleDelete } 
            className="btn btn-danger fab-danger tw-flex tw-justify-center tw-items-center"
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <MdDeleteOutline className="tw-text-center tw-text-[22px]" />
        </button>
    )
}