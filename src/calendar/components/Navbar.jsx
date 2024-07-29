import { useEffect, useRef, useState } from 'react';
import user from '../../user.svg'
import { useAuth } from '../../hooks/useAuth';
import { MdKeyboardArrowDown, MdOutlineLightMode, MdOutlineLogout, MdOutlineSpaceDashboard } from 'react-icons/md';

export const Navbar = () => {
    const { startLogout, user: activeUser } = useAuth();

    const [showModal, setShowModal] = useState(false)

    const modalRef = useRef(null)
    const currentClickRef = useRef(null); 

    const handleShowModal = (event) => {
        currentClickRef.current = event.target;
        setShowModal((prevShowModal) => !prevShowModal);
    }
    
    const handleCloseModal = () => {
        setShowModal(false) 
    }    

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            modalRef.current &&
            !modalRef.current.contains(event.target) &&
            event.target !== currentClickRef.current
          ) {
            handleCloseModal();
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        }
      }, []);
    
    return (
        <div className="navbar tw-shadow-sm">
            <span className="navbar-brand" style={{fontWeight:'800', fontSize: '22px'}}>
                Cal<span style={{color: '#f77421',fontWeight:'800', fontSize: '22px'}}>.</span>
            </span>

            <div className='tw-right tw-flex tw-gap-4 tw-relative'>
                <img onClick={handleShowModal} className='tw-cursor-pointer' style={{width:'40px'}} src={user} alt='user' />
                {showModal && (
                    <div className="tw-absolute tw-right-0 tw-z-50 tw-top-10 tw-w-[15rem] tw-bg-white tw-flex tw-gap-4 tw-justify-center tw-left-55 tw-p-5 tw-h-[17.5rem] tw-rounded tw-shadow-md" ref={modalRef}>
                        <div>
                            <ul className="tw-flex tw-flex-col tw-gap-3">
                                <li className="tw-flex tw-justify-center">
                                    <img
                                    onClick={handleShowModal}
                                    className="tw-w-[80px] tw-cursor-pointer"
                                    src={user}
                                    alt="user"
                                    />
                                </li>
                                <li className="tw-flex tw-flex-col tw-items-center">
                                    <h5 className="tw-text-base tw-font-medium tw-text-[#05264E]">{activeUser.name}</h5>
                                </li>
                                <li onClick={handleCloseModal} className="tw-flex tw-justify-between">
                                    <a href="" className="tw-text-[#05264E] tw-flex tw-items-center tw-gap-2">
                                        <MdOutlineLightMode className="tw-text-base tw-text-[#05264E]" /> Theme: Light
                                        mode
                                    </a>
                                    <MdKeyboardArrowDown className="tw-text-base tw-text-[#05264E]" />
                                </li>
                                <li onClick={handleCloseModal} className="tw-flex tw-items-center tw-gap-2">
                                    <MdOutlineSpaceDashboard className="tw-text-[#05264E] tw-text-base" />
                                    <a href="" className="tw-text-[#05264E]">
                                    {activeUser ? "Dashboard" : "Inicia sesión"}
                                    </a>
                                </li>
                                {activeUser && (
                                    <li onClick={handleCloseModal}>
                                        <a href="#" className="tw-flex tw-items-center tw-gap-2">
                                            <MdOutlineLogout className="tw-text-[#05264E] tw-text-base" />
                                            <button onClick={startLogout}>
                                                <span className="tw-text-[#05264E]">Log Out</span>
                                            </button>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

// &nbsp es una entidad de caracteres utilizada en HTML y XML para representar un espacio en blanco. La abreviatura "nbsp" significa "non-breaking space" en inglés, lo que se traduce como "espacio no rompible".


