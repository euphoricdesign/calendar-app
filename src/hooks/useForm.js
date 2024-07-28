import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {}) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({});

    // Efecto para actualizar el estado del formulario cuando cambia initialForm
    useEffect(() => {
        validateForm();
    }, [ formState ])

    // Efecto para ejecutar las validaciones cuando cambia el estado del formulario
    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])
    
    
    // Memo para calcular si el formulario es válido
    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;
    }, [ formValidation ])


    // Función para manejar cambios en los inputs
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    // Función para resetear el formulario
    const onResetForm = () => {
        setFormState( initialForm );
    }

    // Función para validar el formulario
    const validateForm = () => {
        
        const formCheckedValues = {};
        
        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage ] = formValidations[formField];

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }



    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}