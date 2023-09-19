import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {

    const auth = useAuth();

    const cerrarSesion = () => {
        auth.logout();
    }

    return (
        <>
            <header className="header">
                <Link className="link-header-home" to={"/"}>
                    <h1 className="titulo-header">
                        CafeApp
                    </h1>
                </Link>

                {
                    auth.user ? (
                        <div className="usuario">
                            {/* Modificar por nombre de usuario */}
                            <span className="nombreUsuario">Usuario</span>
                            <button onClick={(e) => cerrarSesion(e)} className="btn-logout">Cerrar sesión</button>
                        </div>
                    )
                        :
                        (
                            <nav className="links-header">
                                <Link className="link-header" to={"/login"}> Iniciar sesión </Link>
                                <Link className="link-header" to={"/register"}> Regitrarse </Link>
                            </nav>
                        )
                }


            </header>

            <Outlet />
        </>
    )
}