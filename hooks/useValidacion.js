import React, { useState, useEffect } from 'react';


const useValidacion = (stateInicial, validar, fn) => {

    const [ valores, guardarValores ] = useState(stateInicial);
    const [ errores, guardarErrores ] =  useState({});
    const [ submitForm, guardarSubmitForm] = useState(false);
    

    useEffect(() => {
        if(submitForm){
            const notErrores = Object.keys(errores).length === 0;

            if(notErrores){
                fn(); //Fn= Funcion que se ejecuto en el componente
            }
            guardarSubmitForm(false);

        }

    }, [errores]);

    
    //Funcion que se ejecuta con forme el usuario escribe algo
    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name]: e.target.value
        });
    }

    //Funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    }

    //Cuando se realiza el evento blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    }
}
 
export default useValidacion;