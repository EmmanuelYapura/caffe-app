import 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function FormLogin() {
    const navigate = useNavigate();

    //Tomo los datos del contexto
    const auth = useAuth();

    //Hooks para completar el formulario
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");

    const iniciarSesion = (e) => {
        e.preventDefault();
        auth.login(email,contraseña);       
    }

    useEffect( () => {
        if(auth.user){
            navigate('/dashboard');
        }else{
            console.log("inicie session o cree su usuario")
        }
    },[auth.user]);


    return (
        <div className="contenedorFormulario formWidth marginForm">
            <div>
                <h1 className="titulo">Bienvenido</h1>
                <p className="parrafo">Estas listo para pedir tu <span>café?</span></p>
            </div>
            <form className="formulario">
                <label className="texto-label" htmlFor="email">
                Correo     
                </label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" />

                <label className="texto-label" htmlFor="pass">
                Contraseña 
                </label>
                <input onChange={(e) => setContraseña(e.target.value)} type="password" name="pass" id="pass" />
                
                <button onClick={(e) => iniciarSesion(e)} className="btn-ingreso">Ingresar</button>

                <p className='errorLogin'>Datos incorrectos, vuelva a comprobarlos o cree una cuenta</p>
            </form>
        </div>
    )
}