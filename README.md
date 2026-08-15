# UMC-SIMULADOR DE CIERRE DE BRECHAS (Claro)
SimuladorIA - este proyecto es un prototipo funcional que fue diseñado para la Universidad Corporativa Claro (UMC). Consiste en un simulador de evaluación formativa enfocado en medir y cerrar las brechas de competencias comerciales de los asesores de servicio al cliente.

El sistema opera mediante un flujo interactivo y automatizado: El asesor ingresa su nombre, selecciona una competencia especifica de claro y redacta una respuesta solida ante a un caso critico. El sistema procesa la respuesta enviada y se encarga de evaluar de forma automática,
generando una calificación formativa (1.0 es lo mas bajo, 5.0 es lo mas alto) junto con un análisis detallado, finalizando con una sincronización de resultados mediante una tabla cuyos campos se conforman por una retroalimentación sobre calificaciones pasadas y presentes.


## Tecnologías utilizadas
### Backend(servidor)
- Node.js & Express: Entorno de ejecución y framework ligero para la creación de la API REST asíncrona de alto rendimiento.
- Google Generative AI SDK (@google/generative-ai): Integración oficial con el modelo de última generación Gemini 3.6-Flash, optimizado para el procesamiento lógico y análisis de texto rapido.
- CORS & Helmet: Middlewares de ciberseguridad para la protección de cabeceras HTTP y el control de acceso desde orígenes cruzados.
- Dotenv: Gestión segura de variables de entorno para aislar las credenciales de la API Key de Google.

### Frontend (Interfaz de Usuario)
- HTML5 & CSS3 Nativo: Estructurado y diseñado utilizando los colores corporativos oficiales de Claro.
- JavaScript Vanilla (ES6+): Lógica transaccional asíncrona basada en el API Fetch nativa para la comunicación distribuida entre interfaces y manipulación directa del DOM.
- Web Storage (localStorage): Mecanismo ágil de persistencia en el lado del cliente para gestionar los estados del tablero y simular el histórico de brechas de forma eficiente.

## Estructura del proyecto
````text
UMC_SIMULADOR/
  umc-simulador-backend/
    src/
      controllers/
        evaluacionController.js    #Valiodacion y control de peticiones HTTP.
      service/
        iaService.js               #Conexion lógica a GeminiIA.
    .env                           #Variables de entorno protegidas GEMINI_API_KEY.
    .gitignore                     #Ocultar credenciales claves.
    index.js                       #Punto de entrada principal y configuración global de middlewares.

  ucm-simulador-frontend/
    app.js                         #Control de funciones.
    index.hml                      #Cuerpo del sistema
    style.css                      #Estilo visual del sistema.
````
      
## Características principales del sistema

- Arquitectura Cliente-Servidor Desacoplada: El Frontend y el Backend operan de forma independiente, comunicándose mediante un canal estándar de formato JSON, lo que facilita el mantenimiento aislado de cada capa.
- Ingeniería de Prompts Estricta: La capa de servicios formatea las instrucciones del sistema (System Prompt) obligando al modelo de lenguaje a comportarse como un evaluador corporativo estricto y a retornar **únicamente un objeto JSON estructurado**, asegurando la predictibilidad del software.
- Sistema de Navegación de Panel Único (SPA): JavaScript controla de forma interactiva la visibilidad de las pantallas mediante la propiedad .style.display, alternando de forma instantánea entre el registro, el simulador de casos y la tabla de avances sin recargar el navegador.
- Analizador de Brechas Automatizado: La tabla de avance no es un campo de texto plano, realiza una comparación matemática en tiempo real entre la nota base y la calificación de la IA, dictando al supervisor un diagnóstico preciso sobre si la brecha fue reducida, estancada o permanece crítica. 
- Validación de Datos Defensiva: El sistema cuenta con expresiones regulares (Regex) en el inicio de sesión que impiden el ingreso de caracteres numéricos o símbolos extraños en el nombre del asesor, garantizando la calidad de los datos de entrada.



## Instrucciones para ejecutar el proyecto de forma local




