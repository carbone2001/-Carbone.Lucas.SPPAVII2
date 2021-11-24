import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';
const URL_MASCOTAS = "http://localhost:8080/api/mascotas/";

const initialValues = {
    "id": -1,
    "nombre": "",
    "edad": -1,
    "tipo": "",
    "vacunado": false,
    "observaciones": ""
}
const DetallePage = () => {
    const [mascota, setMascota] = useState(initialValues);
    const [token] = useState(localStorage.getItem("usuarioLogeado"));
    const params = useParams();
    const history = useHistory();
    useEffect(() => {
        const getMascotas = async (url) => {
            try {
                if(!token)
                {
                    throw new Error({message:"No se ha encontrado el token"});
                }
                const res = await fetch(url,{
                    headers:{
                        'Authorization': "Bearer "+token, 
                        'Content-Type': 'application/json'
                      }
                });
                const data = await res.json();
                if (data.id) {
                    setMascota(data);
                }
                else {
                    history.push("/404");
                }
            }
            catch (error) {
                history.push("/404");
            }
        }
        getMascotas(URL_MASCOTAS + params.id);

    }, [history,params,token])
    return (
        <div className="card-container">
            <div class="card">
                {mascota.id === -1 ?
                    <Loader /> :
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4">Nombre: {mascota.nombre}</p>
                                <p class="subtitle is-6">Edad: {mascota.edad}</p>
                                <p class="subtitle is-6">Tipo: {mascota.tipo}</p>
                                <p class="subtitle is-6">Vacunado: {mascota.vacunado ? "Si" : "No"}</p>
                            </div>
                        </div>
                        <div class="content">
                            {mascota.observaciones}
                        </div>
                        <div className="card-footer">
                            <p class="subtitle is-4"> <Link to="/">Volver a Home</Link></p>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default DetallePage
