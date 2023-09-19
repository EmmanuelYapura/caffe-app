import { useState } from "react"

export function ItemCafe({ cafe, agregar }) {

    let [ cantidad, setCantidad] = useState(0);

    let pedido = {
        cafe: cafe.nombre,
        cantidad,
        precio: cafe.precio,
        imgUrl: cafe.imgUrl,
        id: cafe.id
    }

    const cambiarCantidad = ( valor ) => {
        if(cantidad + valor >= 0) setCantidad(cantidad + valor);
    }

    return (
        <div className="container-item">
            <img className="img-item" src={cafe.imgUrl} alt="item-cafe" width={210} height={150} />
            <div className="info-item">
                <h4 className="info-titulo">{cafe.nombre}</h4>
                <span className="info-precio">$ {cafe.precio}</span>
            </div>
            <div className="container-btns">
                <button onClick={() => {
                    agregar(pedido)
                    setCantidad(0)
                    }} className="info-btn">agregar</button>
                <div>
                    <button onClick={ () => cambiarCantidad(-1)} className="info-btn padding-cant">-</button>
                    <span> {cantidad} </span>
                    <button onClick={ () => cambiarCantidad(1)} className="info-btn padding-cant">+</button>
                </div>
            </div>
        </div>
    )
}