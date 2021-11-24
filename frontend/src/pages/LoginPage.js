import React from 'react'
import { useHistory } from 'react-router';
import FormularioLogin from '../components/FormularioLogin'
import Header from '../components/Header'
const URL = "http://localhost:8080/api/login";
const LoginPage = () => {
    const history = useHistory()
    const onSubmit = async (usuario) => {
        let res = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        if (res.status === 200) {
            alert("Logeo exitoso");
            let data = await res.json();
            localStorage.setItem("usuarioLogeado",data.token);
            history.push("/")
        }
        else {
            let data = await res.json();
            console.log(data);
            alert(data.message);
        }
    }

    return (
        <div className="loginPage">
            <Header />
            <FormularioLogin onSubmit={onSubmit} />
        </div>
    )
}

export default LoginPage
