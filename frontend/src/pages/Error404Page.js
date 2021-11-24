import React from 'react'
import { Link } from 'react-router-dom';
const Error404Page = () => {
    return (
        <div className="card-container">
            <div class="card">
                <div class="card-content">
                    <p class="title is-4">Pagina no Encontrada</p>
                    <p class="subtitle is-4"> <Link to="/">Volver a Home</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Error404Page
