import dbinstance from '../backend/db/dbconnection.js';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/validar-cedula/:cedula', async (req, res) => {
  let { cedula } = req.params;

  cedula = cedula.replace(/[^0-9]/g, '');
  console.log("Cédula recibida: ", cedula);

  if (!cedula) {
    return res.status(400).json({ mensaje: 'Cédula inválida' });
  }

  try {
    const response = await axios.get(`https://api.digital.gob.do/v3/cedulas/${cedula}/validate`, {
      headers: {
        accept: 'application/json',
      },
    });

    console.log('Respuesta de la API:', response.data);

    if (response.data && response.data.valid) {
      return res.status(200).json({ mensaje: 'Cédula válida!' });
    } else {
      return res.status(400).json({ mensaje: 'Cédula inválida' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al validar cédula' });
  }
});

app.post('/guardar-cedula', async (req, res) => {
  const { cedula, nombre, apellido, numero, direccion } = req.body;

  if (!cedula || !nombre || !apellido || !numero || !direccion) {
    return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
  }

  try {
    const { data, error } = await dbinstance
      .from('usuario')
      .insert([{ cedula, nombre, apellido, numero, direccion }]);

    if (error) {
      console.error(error); // Asegúrate de registrar el error en la consola
      res.status(500).json({ mensaje: 'Error al guardar cédula' });
    } else {
      res.json({ mensaje: 'Cédula guardada!' });
    }
  } catch (error) {
    console.error(error); // Asegúrate de registrar el error en la consola
    res.status(500).json({ mensaje: 'Error al guardar cédula' });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});