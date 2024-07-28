// Esta función retorna un objeto que contiene todas las variables de entorno disponibles en import.meta.env.

export const getEnvVariables = () => ({ ...import.meta.env })