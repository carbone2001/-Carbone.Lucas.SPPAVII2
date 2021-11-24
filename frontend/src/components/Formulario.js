import React, { useEffect, useState } from 'react'
import SelectTipoMascota from './SelectTipoMascota';
const initialForm = {
    id: null,
    nombre: "",
    edad: null,
    tipo:"",
    vacunado: false,
    observaciones:""
}
const Formulario = ({setMascotaEdit, createMascota, updateMascota, mascotaEdit, tipoMascotas }) => {
    const [form, setForm] = useState(initialForm);
    const { id, nombre, edad, tipo, vacunado, observaciones } = form;
    useEffect(() => {
        if(mascotaEdit){
            setForm(mascotaEdit);
        }
    }, [mascotaEdit])

    const handlerChange = ({target}) => {
        let {name,value,checked} = target;
        value = (name === "vacunado") ? checked : value;
        
        setForm((form) => {
            return { ...form, [name]: value };
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!nombre || !tipo || !observaciones || !edad) {
            alert("Faltan datos");
            setForm(initialForm);
            return;
        }
        if (id) {
            updateMascota(form);
            
        }else{
            createMascota(form);
        }
        setForm(initialForm);
    }
    const handlerReset = () => {
        setForm(initialForm);
        setMascotaEdit(null);
    }
    return (
        <>
            <h2 className="title is-4">{id?"Update Mascota":"Create Mascota"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    autoComplete="off"
                    onChange={handlerChange}
                    value={nombre} />
                <br/>
                <br/>
                <input
                    className="input"
                    type="number"
                    name="edad"
                    placeholder="Edad"
                    autoComplete="off"
                    value={edad||""}
                    onChange={handlerChange} />
                <br/>
                <br/>
                <SelectTipoMascota onChange={handlerChange} value={tipo} tipoMascotas={tipoMascotas} />
                <br/>
                <br/>
                <label  className="checkbox"><input checked={vacunado} type="checkbox" name="vacunado" onChange={handlerChange} /> Vacunado</label> 
                <br/>
                <br/>
                <textarea className="textarea" value={observaciones}  name="observaciones" onChange={handlerChange}/>
                <br/>
                <input type="submit" className="button is-primary" style={{marginRight:"10px"}} value="Enviar" />
                <input type="reset" className="button is-warning" onClick={handlerReset} value="Limpiar" />
            </form>
        </>
    )
}

export default Formulario
