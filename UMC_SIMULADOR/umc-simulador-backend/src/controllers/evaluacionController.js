const iaService = require('../services/iaService');

const procesarRespuesta = async(req, res) =>{
try{

    const {competencia, caso, respuestaEstudiante} = req.body;

    if(!competencia || !caso || !respuestaEstudiante || respuestaEstudiante.trim() === '' ) {
        return res.status(400).json({error: 'Faltan campos obligatorios o la respuesta esta vacia'})

    }

    const evaluacionIa = await iaService.evaluarCompetencia({competencia, caso, respuestaEstudiante});


    return res.status(200).json(evaluacionIa);


} catch(error){
    console.error('Error en el control de evaluacion', error.message);

    return res.status(error.status || 500).json({error: error.message || 'Error interno del servidor'})


}

};

module.exports = {procesarRespuesta};

