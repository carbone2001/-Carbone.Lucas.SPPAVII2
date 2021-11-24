import React from 'react'
import { useHistory } from 'react-router';
import FormularioRegistracion from '../components/FormularioRegistracion';
import Header from '../components/Header'
const URL = "http://localhost:8080/api/users";
const RegistracionPage = () => {
    const history = useHistory();
    const onSubmit = async (usuario) => {
        try {
            let res = await fetch(URL,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
            if(res.status === 201){
                alert("El usuario ha sido registrado exitosamente");
                history.push("/login")
            }
            else{
                let data = await res.json();
                console.log(data);
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <div className="loginPage">
            <Header/>
            <FormularioRegistracion onSubmit={onSubmit}/>
        </div>
    )
}

export default RegistracionPage
