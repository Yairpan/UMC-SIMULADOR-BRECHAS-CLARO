# UMC-SIMULADOR DE CIERRE DE BRECHAS (Claro)
SimuladorIA - este proyecto es un prototipo funcional que fue diseñado para la Universidad Corporativa Claro (UMC). Consiste en un simulador de evaluación formativa enfocado en medir y cerrar las brechas de competencias comerciales de los asesores de servicio al cliente.

El sistema opera mediante un flujo interactivo y automatizado: El asesor ingresa su nombre, selecciona una competencia especifica de claro y redacta una respuesta solida ante a un caso critico. El sistema procesa la respuesta enviada y se encarga de evaluar de forma automática,
generando una calificación formativa (1.0 es lo mas bajo, 5.0 es lo mas alto) junto con un análisis detallado, finalizando con una sincronización de resultados mediante una tabla cuyos campos se conforman por una retroalimentación sobre calificaciones pasadas y presentes.


## Tecnologías utilizadas
### Backend(servidor)
- Node.js & Express: Entorno de ejecución y framework ligero para la creación de la API REST asíncrona de alto rendimiento.
- Google Generative AI SDK (`@google/generative-ai`): Integración oficial con el modelo de última generación Gemini 3.6-Flash, optimizado para el procesamiento lógico y análisis de texto rapido.
- CORS & Helmet: Middlewares de ciberseguridad para la protección de cabeceras HTTP y el control de acceso desde orígenes cruzados.
- Dotenv: Gestión segura de variables de entorno para aislar las credenciales de la API Key de Google.

### Frontend (Interfaz de Usuario)
- HTML5 & CSS3 Nativo: Estructuración semántica y diseño visual personalizado utilizando los colores corporativos oficiales de Claro (Rojo e identidad visual limpia) sin dependencia de frameworks pesados.
- JavaScript Vanilla (ES6+): Lógica transaccional asíncrona basada en el API `Fetch` nativa para la comunicación distribuida entre interfaces y manipulación directa del DOM.
- Web Storage (`localStorage`):** Mecanismo ágil de persistencia en el lado del cliente para gestionar los estados del tablero y simular el histórico de brechas de forma eficiente].




