import React, { useEffect, useState } from 'react'
import Formulario from './Formulario'
import Tabla from './Tabla'
import { Loader } from './Loader';
import { useHistory } from 'react-router';
// const URL = "http://localhost:8080/mascotas";
// const URL_TIPO_MASCOTAS = "http://localhost:8080/tipos";
const URL = "http://localhost:8080/api/mascotas";
const URL_TIPO_MASCOTAS = "http://localhost:8080/api/tipos";
const Crud = () => {
    const [token] = useState(localStorage.getItem("usuarioLogeado"));
    const [mascotas, setMascotas] = useState([]);
    const [tipoMascotas, setTipoMascotas] = useState([]);
    const [mascotaEdit, setMascotaEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const getMascotas = async (url) => {
            try {
                if(!token)
                {
                    throw new Error({message:"No se ha encontrado el token"});
                }
                
                setIsLoading(true);
                const res = await fetch(url,{
                    headers:{
                        'Authorization': "Bearer "+token, 
                        'Content-Type': 'application/json'
                      }
                });
                const data = await res.json();
                if(res.status === 200){
                    console.log(data);
                    setMascotas(data);
                }
                else{
                    throw data;
                }
            } catch (error) { 
                console.log(error);
                alert(error.message);
                history.push("/login");
            }
            finally {
                setIsLoading(false);
            }
        }

        const getTipoMascotas = async (url) => {
            try {
                setIsLoading(true);
                const res = await fetch(url);
                const data = await res.json();
                setTipoMascotas(data)
            } catch (error) { }
            finally {
                setIsLoading(false);
            }
        }

        getMascotas(URL);
        getTipoMascotas(URL_TIPO_MASCOTAS);
    }, [history,token])


    const createMascota = (newMascota) => {
        setIsLoading(true);
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer "+token,
            },
            body: JSON.stringify(newMascota)
        })
            .then((res) => res.json())
            .then((nuevaMascota) => {
                console.log(nuevaMascota)
                setMascotas((mascotas) => [...mascotas, nuevaMascota]);
                alert("Alta exitosa");
            })
            .catch((err)=>{
                localStorage.removeItem("usuarioLogeado")
                console.log(err);
            })
            .finally(()=>{
                setIsLoading(false);
            })
    }
    const updateMascota = (mascotaUpdated) => {
        setIsLoading(true);
        fetch(URL + "/" + mascotaUpdated.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer "+token,
            },
            body: JSON.stringify(mascotaUpdated)
        })
            .then(res => res.json())
            .then(movieModificada => {
                setMascotas((mascotas) => {
                    return mascotas.map((movie) => movie.id === movieModificada.id ? movieModificada : movie);
                })
                alert("Modificacion exitosa")
            })
            .catch((err)=>console.log(err))
            .finally(()=>{
                setIsLoading(false);
            })
    }

    const deleteMascota = (id) => {
        if (window.confirm("Confirma eliminacion de " + id)) {
            setIsLoading(true);
            //path /:id
            fetch(URL + "/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': "Bearer "+token,
                }   
            })
            .then(res => {
                if (res.ok) {
                    setMascotas((mascotas) => {
                        return mascotas.filter((movie) => movie.id !== id);
                    })
                    alert("Borrado exitoso!!");
                }
            })
            .finally(()=>{
                setIsLoading(false);
            })
        }
    }

    const getMascotaDetalles = (id) => {
        history.push("/detalles/"+id);
    }

    return (
        <div className="container-grid">
            <div className="form">
                <Formulario
                    updateMascota={updateMascota}
                    createMascota={createMascota}
                    mascotaEdit={mascotaEdit}
                    setMascotaEdit={setMascotaEdit}
                    tipoMascotas={tipoMascotas}
                />
            </div>
            <div className="table">
                {isLoading ?
                    <Loader /> :
                    <Tabla
                        data={mascotas}
                        setMascotaEdit={setMascotaEdit}
                        deleteMascota={deleteMascota}
                        getMascotaDetalles={getMascotaDetalles}
                    />}
            </div>
        </div>
    )
}

export default Crud
