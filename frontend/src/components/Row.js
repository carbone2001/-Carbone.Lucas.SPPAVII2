import React from 'react'

const Row = ({mascota,setMascotaEdit,deleteMascota,getMascotaDetalles}) => {
    const {id,nombre,tipo} = mascota;
    return (
        <tr>
            <td>{nombre}</td>
            <td>{tipo}</td>
            <td>
                <button 
                className="button is-info"
                onClick={()=>{getMascotaDetalles(id)}}>Ver Detalles</button>
            </td>
            <td>
                <button className="button is-primary" onClick={()=>{setMascotaEdit(mascota)}}>Modificar</button>
            </td>
            <td>
            <button className="button is-danger" onClick={()=>{deleteMascota(id)}}>Eliminar</button>
            </td>
        </tr>
    )
}

export default Row
