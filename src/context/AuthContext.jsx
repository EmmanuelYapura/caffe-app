import { useContext, createContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig/firebase";

//Funciones de firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

//Crea contexto
export const authContext = createContext();

//Funcion que retorna contexto
export const useAuth = () => {
    const context = useContext(authContext);
    if(!context){
        console.log("error al crear el contexto");
    }
    return context;
}

export function AuthProvider ( {children} ) {
    //hook para usuarios
    const [user, setUser] = useState(null);

    //hook para almacenar informacion de usuarios 
    const [userData, setUserData] = useState(null);

    //hook para indicar que esta cargando el usuario 
    const [loading, setLoading] = useState(true)

    //Funciones para manejar errores en login y registro
    const mostrarError = (valor) => {
        const p = document.querySelector(`.error${valor}`);
        p.style.display = "block";
    }
    const ocultarError = (valor) => {
        const p = document.querySelector(`.error${valor}`);
        p.style.display = "none";
    }

    //funcion de login, envio email y contraseña
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            ocultarError('Login');       
            setUser(userCredential.user);
        } catch (error) {
            mostrarError('Login');
            /* En vez de generar un error forzado, buscar una libreria para mostrar un popup que diga que no se encuentra registrado*/
        }
    }

    //funcion de registro, envio email y contraseña
    const register = async (email, constraseña) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth,email, constraseña);
            ocultarError('Registro')

            //Obtener el ID de usuario unico UID
            const userId = userCredential.user.uid;

            //Datos adicionales del usuario para almacenar en la coleccion usuarios
            const userData = {
                email,
                constraseña,
                nombre: email
            }

            //agregar usuario a firebase
            const userRef = collection(db, "usuarios")
            await addDoc(userRef, {...userData, userId})

            //actualizar estado 
            setUser(userCredential.user)

            //guardar el perfil del usuario en el estado userData
            setUserData(userData);
        } catch (error) {
            //Muestra error de usuario ya registrado
            mostrarError('Registro')
        }
    }

    const logout = async () => {
        try{
            await signOut(auth);
            setUser(null);
            // eliminar los datos del usuario del estado userData al cerrarsesion
            setUserData(null);
        }
        catch(error){
            console.error("error al cerrar sesion");
            throw error;
        }
    }

    const fetchUserProfile = async (userId) => {
        try {
            const userCollectionRef = collection(db, "usuarios")
            const querySnapshot = await getDocs(query(userCollectionRef, where("userId", "==", userId)))

            if(!querySnapshot.empty){
                const userData = querySnapshot.docs[0].data()
                return userData;
            }else{
                console.log("El documento del usuario no existe")
                return null
            }
        } catch (error) {
            console.error("error al obtener datos del usuario: ", error)
            return null
        }
    }

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
            if(user){
                /* Recibe el perfil del usuario, si esta autenticado */
                fetchUserProfile(user.uid).then((userProfile) => {
                    if(userProfile){
                        setUserData(userProfile)
                    }else{
                        console.log("El perfil del usuario no existe en firestore")
                    }
                })
            } else{
                //Si el usuario no esta autenticado, eliminamos su perfil del estado userData
                setUserData(null)
            }
        })
        
        return () => unsubscribe()
    }, [])



    return (
    <authContext.Provider
        value={{
            register,
            login,
            logout,
            user,
            loading,
            userData
        }}
    >
        {children}
    </authContext.Provider>);
}