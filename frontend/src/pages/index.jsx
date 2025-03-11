import React, { useState } from "react";
import axios from "axios";
import "../css/index.css";

const IndexPage = () => {
    const [cedula, setCedula] = useState('');
    const [resultado, setResultado] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [numero, setNumero] = useState('');
    const [direccion, setDireccion] = useState('');
    const [isCedulaValid, setIsCedulaValid] = useState(false);

    const handleValidateCedula = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/validar-cedula/${cedula}`);
            if (response.data.mensaje === "Cédula válida!") {
                setResultado('Cédula válida!');
                setMensaje('');
                setIsCedulaValid(true);
            } else {
                setResultado('Cédula inválida');
                setIsCedulaValid(false);
            }
        } catch (error) {
            console.log(error);
            setResultado('');
            setMensaje(`Error al validar la cédula: ${error.message}`);
            setIsCedulaValid(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cedula || !nombre || !apellido || !numero || !direccion) {
            setMensaje('Todos los campos son requeridos');
            return;
        }
        try {
            const saveResponse = await axios.post('http://localhost:5000/guardar-cedula', {
                cedula, nombre, apellido, numero, direccion
            });
            if (saveResponse.data.mensaje === "Cédula guardada") {
                setMensaje("Cédula guardada exitosamente");
            } else {
                setMensaje("Error al guardar cédula");
            }
        } catch (error) {
            console.log(error);
            setMensaje(`Error al guardar la cédula: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Validar y guardar cédula</h2>
            {!isCedulaValid ? (
                <form onSubmit={handleValidateCedula}>
                    <input placeholder="Validar Cédula" type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} />
                    <button type="submit">Validar</button>
                </form>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input placeholder="Nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <input placeholder="Apellido" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <input placeholder="Número" type="number" value={numero} onChange={(e) => setNumero(e.target.value)} />
                        <input placeholder="Dirección" type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    </div>
                    <button type="submit">Guardar</button>
                </form>
            )}
            <p>{resultado}</p>
            <p>{mensaje}</p>
        </div>
    );
};

export default IndexPage;
