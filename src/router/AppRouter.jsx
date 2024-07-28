import { Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'
import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'


export const AppRouter = () => {

    const { status, checkAuthToken } = useAuth();

    useEffect(() => {
        checkAuthToken();
    }, [])
    


    if ( status === 'checking' ) {
        return (
            <div className='tw-flex tw-justify-center tw-items-center tw-h-[100vh]'>
                <div class="loadingspinner">
                    <div id="square1"></div>
                    <div id="square2"></div>
                    <div id="square3"></div>
                    <div id="square4"></div>
                    <div id="square5"></div>
                </div>
            </div>
        )
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                ? <Route path="/auth/*" element={<LoginPage />} />
                : <Route path="/*" element={<CalendarPage />} />
            }

            {/* En teoria esto no sería necesario, pero lo vamos a dejar así para evitar que nuestro usuario llegue a una ruta que no existe */}
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
