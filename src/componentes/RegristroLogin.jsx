import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export function RegistroLogin() {
    const navigate = useNavigate();

    //Uso el contexto
    const auth = useAuth();

    //Hooks para completar el formulario
    const [emailRegistro, setEmailRegistro] = useState("");
    const [contraseñaRegistro, setContraseñaRegistro] = useState("");

    const registrarUsuario = (e) => {
        e.preventDefault();
        auth.register(emailRegistro, contraseñaRegistro);
    }

    useEffect( () => {
        if(auth.user){
            navigate('/dashboard');
        }else{
            //tener en cuenta que en registro no va este mensaje
            console.log("inicie session o cree su usuario")
        }
    },[auth.user]);

    return (
        <div className="contenedorFormulario formWidth marginForm">
            <div>
                <h1 className="titulo"> Registrate </h1>
                <p className="parrafo"> Es rapido y facil</p>
            </div>
            <form className="formulario">                
                <label className="texto-label" htmlFor="usuario">
                    Usuario
                </label>
                <input required type="text" name="usuario" id="usuario" />

                <label className="texto-label" htmlFor="email">
                    Correo
                </label>
                <input required onChange={(e) => setEmailRegistro(e.target.value)} type="email" name="email" id="emailReg" />

                <label className="texto-label" htmlFor="pass">
                    Contraseña
                </label>
                <input required onChange={(e) => setContraseñaRegistro(e.target.value)} type="password" name="pass" id="passReg" />

                <button onClick={(e) => registrarUsuario(e)} className="btn-ingreso">Crear usuario</button>

                <p className="errorRegistro">Este usuario ya se encuentra registrado</p>
            </form>
        </div>
    )
}