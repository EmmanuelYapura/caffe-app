import { ItemCafe } from "./ItemCafe"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, addDoc, doc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from "../firebaseConfig/firebase"
import cafeNegro from '../imagenes/cafe-negro.jpg'
import cortadoChico from '../imagenes/cortado-chico.jpg'
import cafeConLeche from '../imagenes/cafe-con-leche.jpg'
import submarino from '../imagenes/submarino-2.jpg'
import capuchino from '../imagenes/capuchino.jpg'
import capuchinoItaliano from '../imagenes/cappuccino-italiano.jpg'
import capuchinoCaramel from '../imagenes/cappuccino-caramelo.jpg'
import lagrima from '../imagenes/lagrima.jpg'

/*
    -Modificar el valor de las cantidades en los cafes cuando elimino uno de la lista de cuenta
    -popup cuando realizo una compra
    -enlazar los pedidos a un usuario unico
    -una vez que realizo la compra, luego del popUp debo vaciar la base de datos
*/

export function Dashboard() {
    /* Array de cafe */
    const tiposDeCafe = [
        {
            nombre: "Cafe negro",
            imgUrl: cafeNegro,
            precio: 400,
        },
        {
            nombre: "Cortado chico",
            imgUrl: cortadoChico,
            precio: 450,
        },
        {
            nombre: "Cafe con leche",
            imgUrl: cafeConLeche,
            precio: 420,
        },
        {
            nombre: "Submarino",
            imgUrl: submarino,
            precio: 560,
        },
        {
            nombre: "Capuchino",
            imgUrl: capuchino,
            precio: 600,
        },
        {
            nombre: "Capuchino italiano",
            imgUrl: capuchinoItaliano,
            precio: 720,
        },
        {
            nombre: "Capuchino caramelo",
            imgUrl: capuchinoCaramel,
            precio: 710,
        },
        {
            nombre: "Lagrima",
            imgUrl: lagrima,
            precio: 650,
        }
    ]

    // Hook para almacenar los pedidos 
    let [pedidos, setPedidos] = useState([]);

    //7 Hook para manejar el total de los pedidos
    let [total, setTotal] = useState(0);

    // Variable para utilizar los datos del contexto
    const usuario = useAuth();
    
    // Referencia de la coleccion pedidos
    const pedidosCollection = collection(db, "pedidos")

    //Agrega cafe
    const agregar = async (pedido) => {
        //Indica si existe el cafe dentro de los pedidos
        let indice = pedidos?.findIndex(cafe => cafe.cafe === pedido.cafe);
        
        if (pedido.cantidad === 0) {
            console.log("La cantidad no puedo ser cero!")
        } else if (indice === -1) {
            //Agrega el documento con los datos del pedido a la coleccion de pedidos
            await addDoc(pedidosCollection, { cafe: pedido.cafe, cantidad: pedido.cantidad, precio: pedido.precio, imgUrl: pedido.imgUrl })
            //Carga los pedidos nuevamente 
            traerPedidos();
        } else {
            //Si el pedido existe y fue modificado en cantidad, llamo a la funcion modificar con el respectivo id
            let id = pedidos[indice].id;
            modificarCantidad(pedido, id);
        }
    }

    const traerPedidos = async () => {
        //Trae todos los documentos
        let datos = await getDocs(pedidosCollection)
        //Seteo los nuevos pedidos
        setPedidos(datos?.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(() => {
        traerPedidos();
    }, [])

    const borrarPedido = async (id) => {
        //Toma la refencia del documento
        const pedidoDoc = doc(db, "pedidos", id)
        //Elimina pedido
        await deleteDoc(pedidoDoc)
        traerPedidos()
        //Pensar logica nueva del total
    }

    const comprar = (e) => {
        console.log("Compra realizada, eliminando pedidos...")
        //Vaciar la base
    }

    const modificarCantidad = async (pedido, id) => {
        //Toma la refencia del documento
        const pedidoDoc = doc(db, "pedidos", id)
        //Actualizar documento
        await updateDoc(pedidoDoc, pedido);
        traerPedidos()
    }

    const calcularTotal = () => {
        /* Logica de sumar */
    }

    return (
        <div className="container-dashboard">
            <div className="header-dashboard">
                <h3 className="titulo-dashboard">Bienvenido -{usuario.user?.email}-</h3>
            </div>
            <p className="texto-dashboard">Que tipo de cafe deseas?</p>
            <div className="items-compra">
                <div className="items-dashboard">
                    {
                        tiposDeCafe.map((cafe, index) => (
                            <ItemCafe cafe={cafe} key={index} agregar={agregar} />
                        ))
                    }
                </div>
                <div className="pedido-dashboard">
                    <p className="titulo-pedido">Tu lista de pedidos</p>
                    <div className="pedidos">
                        {pedidos.length > 0 ?
                            pedidos.map((pedido, index) => (
                                <div key={index} className="pedido">
                                    <img width={55} height={55} src={pedido.imgUrl} alt="pedido-img" />
                                    <div style={{ width: "200px" }}>
                                        <h4 className="pedido-cafe pedido-padding">{pedido.cafe}</h4>
                                        <span>$ {pedido.precio} </span>
                                        <span className="pedido-padding">cantidad: {pedido.cantidad}</span>
                                    </div>
                                    <button className="btn-borrar" onClick={() => borrarPedido(pedido.id)}>X</button>
                                </div>

                            ))
                            :
                            <p className="precio-pedido">No tienes pedidos agregados</p>
                        }
                    </div>
                    <div className="container-precio">
                        <span className="precio-pedido">El total de su pedido es ${total} </span>
                        <button className="btn-comprar" onClick={(e) => { comprar(e) }}>Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}