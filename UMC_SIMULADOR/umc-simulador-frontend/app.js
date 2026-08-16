const API_URL = 'http://localhost:3000/api/evaluar';

const casosDeClaro = {
    "Manejo de Objeciones": "Un cliente residencial llama muy molesto exigiendo cancelar su plan de Claro Hogar porque considera que la tarifa de $120.000 es extremadamente alta. ¿Cómo manejas la objeción y salvas la venta?",
    "Conocimiento de Producto": "Un cliente te pregunta cuáles son los beneficios reales de adquirir un plan de tecnología de Fibra Óptica simétrica frente a las conexiones de cobre tradicionales. Explícalo de forma sencilla.",
    "Cierre de Ventas": "Acabas de ofrecerle un combo a un cliente interesado. Él se nota convencido pero te dice: 'Déjame pensarlo con mi esposa y te llamo la otra semana'. Aplica una estrategia de cierre inmediato."
};

const notasAntesPorCompetencia = {
    "Manejo de Objeciones": '1.0',
    "Conocimiento de Producto": '1.0',
    "Cierre de Ventas": '1.0'
};

function actualizarCasoVisivo() {
    const competenciaSeleccionada = document.getElementById('opciones-competencias').value;
    document.getElementById('texto-caso').textContent = casosDeClaro[competenciaSeleccionada];
    document.getElementById('bloque-resultado').style.display = 'none';
    document.getElementById('textarea-respuesta').value = '';
}

document.getElementById('opciones-competencias').addEventListener('change', actualizarCasoVisivo);

document.getElementById('btn-ingresar').addEventListener('click', () => {
    const nombreAsesor = document.getElementById('input-nombre').value.trim();

    if (nombreAsesor === "") {
        return alert("Por favor, ingresa tu nombre completo.");
    }
    if (/^[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(nombreAsesor) || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreAsesor)) {
        return alert("El nombre no puede iniciar ni contener puntos, números o símbolos extraños.");
    }

    localStorage.setItem('nombre_guardado', nombreAsesor);
    document.getElementById('nombre-usuario-display').textContent = "Asesor: " + nombreAsesor;

    document.getElementById('seccion-registro').style.display = 'none';
    document.getElementById('panel-trabajo').style.display = 'block';
    actualizarCasoVisivo();
});

document.getElementById('btn-evaluar').addEventListener('click', async () => {
    const respuestaAsesor = document.getElementById('textarea-respuesta').value.trim();
    const competenciaActual = document.getElementById('opciones-competencias').value;
    const casoActual = document.getElementById('texto-caso').textContent;

    if (respuestaAsesor === "") {
        return alert("Debes escribir una respuesta antes de enviarla a evaluar.");
    }

    const botonEvaluar = document.getElementById('btn-evaluar');
    const textoOriginalBoton = botonEvaluar.textContent;
    botonEvaluar.disabled = true;
    botonEvaluar.textContent = "Evaluando...";

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                competencia: competenciaActual,
                caso: casoActual,
                respuestaEstudiante: respuestaAsesor
            })
        });

        console.log("Respuesta HTTP recibida. Status:", response.status);

        let data;
        try {
            data = await response.json();
        } catch (errorParseo) {
            console.error("La respuesta del servidor no es JSON válido:", errorParseo);
            throw new Error("El servidor respondió en un formato inesperado. Revisa la consola del backend.");
        }

        if (!response.ok) {
            console.error("El backend respondió con error:", data);
            throw new Error(data.error || `Error del servidor (status ${response.status}).`);
        }

        document.getElementById('resultado-nota').textContent = data.nota;
        document.getElementById('resultado-feedback').textContent = data.retroalimentacion;
        document.getElementById('bloque-resultado').style.display = 'block';

        localStorage.setItem(`nota_antes_${competenciaActual}`, notasAntesPorCompetencia[competenciaActual]);
        localStorage.setItem(`nota_despues_${competenciaActual}`, data.nota);
        localStorage.setItem(`feedback_${competenciaActual}`, data.retroalimentacion);

        actualizarTablaAvance();

    } catch (error) {
        console.error("Error completo al evaluar:", error);
        alert("Hubo un fallo en la conexión: " + error.message);
    } finally {
        botonEvaluar.disabled = false;
        botonEvaluar.textContent = textoOriginalBoton;
    }
});

document.getElementById('btn-avance').addEventListener('click', () => {
    document.getElementById('panel-trabajo').style.display = 'none';
    document.getElementById('tabla-avance').style.display = 'block';
    actualizarTablaAvance();
});


function calcularAnalisisBrecha(antes, despues) {
    if (despues === null) {
        return 'Pendiente por realizar la simulación comercial.';
    }

    const notaAntesNum = parseFloat(antes);
    const notaDespuesNum = parseFloat(despues);

    if (notaDespuesNum > notaAntesNum) {
        return `Brecha reducida con éxito. Incremento de ${(notaDespuesNum - notaAntesNum).toFixed(1)} puntos frente a la línea base.`;
    } else if (notaDespuesNum === notaAntesNum) {
        return "Brecha estancada. El desempeño evaluado es idéntico al diagnóstico base. Se sugiere refuerzo pedagógico.";
    } else {
        return "Brecha crítica abierta. El resultado obtenido es inferior al diagnóstico inicial. Requiere acompañamiento inmediato.";
    }
}


function actualizarTablaAvance() {
    const contenedorTabla = document.getElementById('cuerpo-tabla-avance');
    if (!contenedorTabla) return;

    const nombresCompetencias = Object.keys(casosDeClaro);

    const filasHTML = nombresCompetencias.map(nombreCompetencia => {
        const antes = localStorage.getItem(`nota_antes_${nombreCompetencia}`) || notasAntesPorCompetencia[nombreCompetencia];
        const despuesGuardado = localStorage.getItem(`nota_despues_${nombreCompetencia}`);
        const despues = despuesGuardado || 'Sin evaluar';
        const analisisBrecha = calcularAnalisisBrecha(antes, despuesGuardado);

        return `
            <tr>
                <td style="padding: 12px; font-weight: bold; color: #333333;">${nombreCompetencia}</td>
                <td style="padding: 12px; text-align: center; font-weight: bold; color: #333333;">${antes}</td>
                <td style="padding: 12px; text-align: center; font-weight: bold; color: #333333;">${despues}</td>
                <td style="padding: 12px; color: #333333; font-weight: 500; text-align: left; line-height: 1.4;">${analisisBrecha}</td>
            </tr>
        `;
    }).join('');

    contenedorTabla.innerHTML = filasHTML;
}


document.getElementById('btn-atras').addEventListener('click', () => {
    document.getElementById('tabla-avance').style.display = 'none';
    document.getElementById('panel-trabajo').style.display = 'block';
});

window.onload = () =>{
    console.log("Pagina recargada desde cero");

    localStrorage.removeItem('nota_despues');
    localStrorage.removeItem('feedback_ia');

    const casos = ["Manejo de Objeciones", "Conocimiento de Producto", "Cierre de Ventas"];
    casos.forEach(competencia =>{
        localtrorage.removeItem(`nota_despues_${competencia}`)
        
    })


actualizarTablaAvance();
}
