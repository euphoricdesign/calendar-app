import { Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'

export const AppRouter = () => {

    // Algún tipo de validación, por ahora, temporal
    const authStatus = 'authenticated'


    return (
        <Routes>
            {
                (authStatus === 'not-authenticated')
                ? <Route path="/auth/*" element={<LoginPage />} />
                : <Route path="/*" element={<CalendarPage />} />
            }

            {/* En teoria esto no sería necesario, pero lo vamos a dejar así para evitar que nuestro usuario llegue a una ruta que no existe */}
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
