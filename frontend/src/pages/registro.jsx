import React, { useState } from "react";
import axios from "axios";

const RegistroPage = () => {
    const [cedula, setCedula] = useState('');
    const [resultado, setResultado] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [numero, setNumero] = useState('');
    const [direccion, setDireccion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

    // Validar que todos los campos estén completos
    if (!cedula || !nombre || !apellido || !numero || !direccion) {
        setMensaje('Todos los campos son requeridos');
        return;
    }

        try {
            const response = await axios.get(`http://localhost:5000/validar-cedula/${cedula}`);
            if (response.data.mensaje === "Cédula válida!") {
                setResultado('Cédula válida!');
                setMensaje('');
                const saveResponse = await axios.post('http://localhost:5000/guardar-cedula', {
                    cedula, nombre, apellido, numero, direccion
                });
                if (saveResponse.data.mensaje === "Cédula guardada!") {
                    setMensaje("Cédula guardada exitosamente");
                } else {
                    setMensaje("Error al guardar cédula");
                }
            } else {
                setResultado('Cédula inválida');
            }
        } catch (error) {
            console.log(error);
            setResultado('');
            setMensaje(`Error al guardar la cédula: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Validar y guardar cédula</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Validar Cédula" type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} />
                <input placeholder="Nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input placeholder="Apellido" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                <input placeholder="Número" type="number" value={numero} onChange={(e) => setNumero(e.target.value)} />
                <input placeholder="Dirección" type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                <button type="submit">Validar</button>
            </form>
            <p>{resultado}</p>
            <p>{mensaje}</p>
        </div>
    );
};

export default RegistroPage;