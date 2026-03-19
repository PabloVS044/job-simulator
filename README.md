# Job Simulator — REST CRUD API

## Descripción

Se requiere construir una API REST con operaciones CRUD completas, persistencia en base de datos relacional y entorno containerizado. El dominio del recurso queda a criterio del desarrollador.

El sistema será consumido por un cliente frontend ya existente. La API debe cumplir el contrato definido en este documento de forma exacta. Cualquier desviación del contrato se considera un fallo de integración.

---

## Condiciones de trabajo

Eres un desarrollador backend contratado para entregar un sistema funcional en un tiempo determinado. El pago se acredita únicamente si el sistema es entregado en tiempo y cumple el contrato en su totalidad.

Las siguientes condiciones resultan en terminación del contrato sin compensación parcial:

- El repositorio contiene archivos que no deben ser versionados (`node_modules`, `vendor`, `.env`, binarios, archivos de sistema operativo)

- Entrega fuera del plazo establecido
- El sistema no levanta con un único comando
- Algún endpoint no responde o responde de forma incorrecta
- Los códigos de respuesta HTTP no son los correctos según el estándar REST
- Las validaciones no están implementadas
- Los tipos de datos no son respetados
- Las respuestas no son JSON
- Almacenamiento en memoria en lugar de base de datos relacional
- El API no interactua de forma correcta con el frontend.

El nivel de contratación determina el máximo de compensación posible. No existe compensación parcial dentro de un nivel.

---

## Contrato de la API

### Estructura del recurso

El recurso expone los siguientes campos con nombres fijos:

| Campo  | Tipo    | Restricciones              |
| ------ | ------- | -------------------------- |
| id     | integer | primary key, autoincrement |
| campo1 | string  | requerido                  |
| campo2 | string  | requerido                  |
| campo3 | string  | requerido                  |
| campo4 | integer | requerido                  |
| campo5 | float   | requerido                  |
| campo6 | boolean | requerido                  |

El dominio es libre. Los nombres internos en base de datos y lógica de negocio quedan a criterio del desarrollador.

---

### Endpoints

Se requiere implementar los métodos `GET`, `POST`, `PUT` y `DELETE`. El nombre del recurso en la ruta debe seguir las convenciones REST estándar.

---

### Validaciones

Todos los campos son requeridos. Los tipos deben ser respetados estrictamente: `campo4` es entero, `campo5` es decimal, `campo6` es booleano.

---

### Códigos de respuesta

El uso correcto de códigos HTTP es parte del contrato con el cliente. Todas las respuestas son JSON.

---

## Stack

- Lenguaje: Javascript, PHP o Rust — no se aceptan Go ni Python
- Base de datos: relacional, sin almacenamiento en memoria
- Containerización: Docker obligatorio

En la carpeta `resources/` se incluyen Dockerfiles de referencia para cada lenguaje y base de datos, y un `.env.example`.

---

## Niveles de contratación

La evaluación es **pasa o no pasa**. Indicar el nivel seleccionado al momento de la entrega.

---

### Nivel 1 — Junior `(máximo 70/100)`

**Base de datos:** SQLite

**Infraestructura:** `docker-compose.yml` con un único servicio. La base de datos corre embebida dentro del mismo contenedor que la aplicación. `docker-compose up` debe levantar el sistema completo y funcional sin intervención manual.

**Requisitos:**
- Los cinco endpoints funcionan correctamente contra la base de datos
- Todas las validaciones están implementadas y retornan los códigos HTTP correspondientes
- La base de datos persiste los datos correctamente entre operaciones
- `Dockerfile` y `docker-compose.yml` presentes y funcionales

---

### Nivel 2 — Mid `(máximo 85/100)`

**Base de datos:** PostgreSQL

**Infraestructura:** `docker-compose.yml` con dos servicios independientes: aplicación y base de datos. La aplicación debe conectarse a PostgreSQL usando variables de entorno. Un único `docker-compose up` levanta el sistema completo y funcional.

**Requisitos adicionales al Nivel 1:**
- Archivo `.env` con todas las variables de configuración necesarias
- Sin credenciales, puertos ni strings de conexión hardcodeados en el código
- La aplicación maneja correctamente los errores de conexión a la base de datos
- El servicio de la aplicación no inicia hasta que PostgreSQL esté disponible

---

### Nivel 3 — Senior `(máximo 100/100)`

**Base de datos:** PostgreSQL

**Infraestructura:** igual que Nivel 2.

**Requisitos adicionales al Nivel 2:**
- Endpoint `PATCH` para actualizaciones parciales: solo se modifican los campos presentes en el body, el resto permanece sin cambios
- `.env.example` en el repositorio con todas las variables necesarias documentadas, sin valores reales
- `.gitignore` que excluya `node_modules`, `.env`, y archivos de sistema operativo
- Script SQL de inicialización de esquema ejecutado automáticamente por Docker al primer arranque
- Estructura de proyecto con separación clara de responsabilidades: configuración de base de datos, definición de rutas y punto de entrada en archivos distintos
- Historial de commits que refleje un proceso de desarrollo incremental — no se acepta un único commit con todo el trabajo

---

## Bonus

Los puntos bonus se suman sobre la nota del nivel entregado. Cada bonus se evalúa de forma independiente.

### Integración full stack `(+10 puntos)`

Integrar el frontend provisto en el mismo `docker-compose.yml` que la API.

Condiciones:
- Un único `docker-compose.yml` levanta ambos servicios
- El frontend consume la API sin configuración manual posterior al `docker-compose up`
- Ambos servicios operativos con un solo comando

### Personalización del frontend `(+5 puntos)`

Adaptar el frontend para que refleje el dominio elegido: etiquetas en el idioma correcto, nombres de campos legibles, y cualquier ajuste visual que mejore la experiencia del usuario final.

Condiciones:
- El frontend no debe mostrar `campo1`, `campo2`, etc. — deben verse los nombres reales del dominio
- Los cambios deben ser coherentes con el recurso implementado en la API
- Aplica únicamente si el bonus de integración también fue completado

---

## Configuración del frontend

El frontend provisto requiere dos valores en `public/js/config.js`:

```js
window.API_URL = "http://localhost:8080"; // URL base de tu API
window.RESOURCE = "products";             // Nombre del recurso en tu API
```

`RESOURCE` debe coincidir exactamente con el nombre que usaste en las rutas de tu API.

---

## Entrega

- Repositorio en GitHub con visibilidad pública
- El sistema levanta con un único comando
