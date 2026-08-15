const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();


const evaluacionController = require('./src/controllers/evaluacionController');

const app = express();


app.use(express.json());
app.use(cors());
app.use(helmet());


app.post('/api/evaluar', evaluacionController.procesarRespuesta);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor del simulador iniciado en el puerto: ${PORT}`);
});
