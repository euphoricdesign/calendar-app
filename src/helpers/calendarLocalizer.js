// crea nuestro localizer, para tener más limpio nuestro componente CalendarPage

import { dateFnsLocalizer } from 'react-big-calendar' // // el método dateFnsLocalizer se utiliza para configurar y proporcionar localización y formatos de fecha y hora utilizando la biblioteca date-fns
import { format, parse, startOfWeek, getDay } from 'date-fns' // todas estas importaciones vienen del paquete date-fns, un paquete adicional para trabajar con react-big-calendar como menciono arriba. date-fns es una biblioteca popular de JS para manipulación y formateo de fechas
import esES from 'date-fns/locale/es' 

const locales = {
    'es': esES,
} // idiomas 

export const localizer = dateFnsLocalizer({ // configuración de localización y formatos fecha y hora 
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })



  
