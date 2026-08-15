const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AQ.Ab8RN6IG1cl4ATRk1JBZtSSBLATlCoSKIuESzL4EB-Rg0B04bA');

const evaluarCompetencia = async ({ competencia, caso, respuestaEstudiante }) => {
    try {

        const modelo = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' });

        const promptSistema = `
            Actúa como un evaluador experto de la Universidad Corporativa Claro (UMC).
            Tu objetivo es evaluar la respuesta abierta de un asesor comercial frente a un caso específico.

            Información de la evaluación:
            - Competencia a evaluar: "${competencia}"
            - Caso planteado: "${caso}"
            - Respuesta del asesor: "${respuestaEstudiante}"

            Instrucciones obligatorias de respuesta:
            Debes responder UNICAMENTE con un objeto en formato JSON válido que contenga exactamente estas dos propiedades (no agregues saludos, ni marcas de formato markdown como \`\`\`json):
            {
                "nota": Coloca un número entero o decimal de 1.0 a 5.0 (donde 1.0 es pésimo y 5.0 es excelente),
                "retroalimentacion": "Escribe un texto corto en español (máximo 3 frases) analizando qué hizo bien el asesor y qué brecha o detalle le faltó mejorar para cerrar la competencia."
            }
        `;

        const resultado = await modelo.generateContent(promptSistema);
        const textoRespuesta = resultado.response.text();

        const respuestaJSON = JSON.parse(textoRespuesta);
        return respuestaJSON;

    } catch (error) {
        console.error('--- ERROR INTERNO GOOGLE ---');
        console.error(error.message);
        console.error('----------------------------');
        
        const errorServicio = new Error('Error al conectar con el motor de evaluación de inteligencia artificial');
        errorServicio.status = 502;
        throw errorServicio;
    }
};

module.exports = { evaluarCompetencia };
