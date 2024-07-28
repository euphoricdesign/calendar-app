import user from '../../../public/user.svg'
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
    const { startLogout, user: activeUser } = useAuth();
    return (
        <div className="navbar shadow-sm">
            <span className="navbar-brand" style={{fontWeight:'800', fontSize: '22px'}}>
                Cal<span style={{color: '#f77421',fontWeight:'800', fontSize: '22px'}}>.</span>
            </span>

            <img className='tw-cursor-pointer' onClick={startLogout} style={{width:'40px'}} src={user} alt='user' />
        </div>
    )
}

// &nbsp es una entidad de caracteres utilizada en HTML y XML para representar un espacio en blanco. La abreviatura "nbsp" significa "non-breaking space" en inglés, lo que se traduce como "espacio no rompible".