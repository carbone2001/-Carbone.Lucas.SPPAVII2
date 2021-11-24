import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const initialForm = {
    username:"",
    password:""
}
const FormularioRegistracion = ({ onSubmit }) => {
    const [form, setForm] = useState(initialForm);
    const { username, password } = form;

    const handlerChange = ({ target }) => {
        let { name, value } = target;

        setForm((form) => {
            return { ...form, [name]: value };
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("Faltan datos");
            return;
        }
        onSubmit(form);
        setForm(initialForm);
    }
    const handlerReset = () => {
        setForm(initialForm);
    }
    return (
        <>
            <h2 className="title is-4">Registracion</h2>
            <form style={{textAlign:"center"}} onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="text"
                    name="username"
                    placeholder="Username"
                    autoComplete="off"
                    onChange={handlerChange}
                    value={username} />
                <br />
                <br />
                <input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="Clave"
                    autoComplete="off"
                    value={password}
                    onChange={handlerChange} />
                <br />
                <br />
                <input type="submit" className="button is-primary" style={{ float:"left" }} value="Enviar" />
                <input type="reset" className="button is-warning"  style={{ float:"right" }} onClick={handlerReset} value="Limpiar" />
                <br/>
                <br/>
                <Link to="/login">Iniciar Sesion</Link>
            </form>
        </>
    )
}

export default FormularioRegistracion;
