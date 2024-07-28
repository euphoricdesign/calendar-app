import { onChecking, onLogin, onLogout, clearErrorMessage } from "../store/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"


export const useAuth = () => {
    const dispatch = useDispatch()
    const { status, user, errorMessage } = useSelector(state => state.auth)


    const startLogin = async ({ email, password }) => {
        dispatch(onChecking())

        try {
            const { data } = await calendarApi.post('/auth/login', { email, password })
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin(data.user))
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data?.message || 'Error al loguear usuario';
                const validationErrors = error.response.data?.errors;
    
                if (validationErrors) {
                    validationErrors.forEach(err => {
                        console.log(err.msg);
                        dispatch(onLogout(err.msg)); // Muestra los mensajes de error específicos
                    });
                } else {
                    console.log(errorMessage);
                    dispatch(onLogout(errorMessage)); // Muestra un mensaje de error general
                }
            } else {
                console.log('Error:', error.message);
                dispatch(onLogout('Error de conexión'));
            }
    
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async ({ email, password, name }) => {
        dispatch(onChecking());    
        try {
            const { data } = await calendarApi.post('/auth/register', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin(data.user));
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data?.message || 'Error en el registro';
                const validationErrors = error.response.data?.errors;
    
                if (validationErrors) {
                    validationErrors.forEach(err => {
                        console.log(err.msg);
                        dispatch(onLogout(err.msg)); // Muestra los mensajes de error específicos
                    });
                } else {
                    console.log(errorMessage);
                    dispatch(onLogout(errorMessage)); // Muestra un mensaje de error general
                }
            } else {
                console.log('Error:', error.message);
                dispatch(onLogout('Error de conexión'));
            }
    
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };
    

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await calendarApi.get('auth/renew');
            console.log(data)
            // localStorage.setItem('token', data.token );
            // localStorage.setItem('token-init-date', new Date().getTime() );
            // dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }

    }

    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogout())
    }


    return {
        //* Propiedades
        errorMessage,
        status, 
        user, 

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}

