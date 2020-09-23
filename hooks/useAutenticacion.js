import React, { useEffect, useState } from 'react';
import firebase from '../firebase'

function useAuntenticacion() {
    const [usuarioAunteticado,guardarUsuarioAutenticado] =  useState(null);

    useEffect(() => {
        const unsuscribre = firebase.auth.onAuthStateChanged(usuario => {
            if( usuario ){
                guardarUsuarioAutenticado(usuario);
            }else {
                guardarUsuarioAutenticado(null);
            }
        });
        return () => unsuscribre();

    }, []);

    return usuarioAunteticado;

}

export default useAuntenticacion;