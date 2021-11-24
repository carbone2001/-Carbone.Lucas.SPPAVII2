import React from 'react'
import Row from './Row'

const Tabla = ({ data, setMascotaEdit, deleteMascota, getMascotaDetalles }) => {
    return (
        <>
            <h2 className="title is-4">Mascota List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Detalles</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {!data.lenght ? (data.map((mascota) => <Row getMascotaDetalles={getMascotaDetalles} deleteMascota={deleteMascota} setMascotaEdit={(e) => { setMascotaEdit(e) }} key={mascota.id} mascota={mascota} />)) : <tr><td colSpan="3">No hay datos</td></tr>}
                </tbody>
            </table>
        </>
    )
}

export default Tabla
