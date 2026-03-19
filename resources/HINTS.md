# Hints

## Navegador y orígenes
- El frontend corre en un origen diferente al de la API — el navegador bloqueará las peticiones si la API no está configurada correctamente para aceptarlas
- El bloqueo ocurre en el navegador, no en la API — si tu API responde bien desde Postman o curl pero no desde el frontend, este es el motivo
- El navegador envía una petición previa antes de ciertas peticiones — tu API debe responder correctamente a ese método también
- No es suficiente con configurarlo en algunos endpoints — debe aplicar a todas las rutas

## Docker
- Los contenedores Docker no se comunican entre sí usando `localhost`
- PostgreSQL tarda unos segundos en estar listo — tu aplicación no debe asumir que la base de datos está disponible de inmediato
- Un contenedor que levanta no significa que la base de datos esté lista para recibir conexiones
- Revisa los logs antes de asumir que algo no funciona: `docker-compose logs`
- Si tu contenedor se reinicia en loop, algo falla al iniciar — los logs te dirán qué
