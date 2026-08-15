# RESQ API Contract

> Documento oficial que define el contrato de comunicación entre el frontend y el backend de RESQ.
>
> **Versión:** 1.0  
> **Estado:** Borrador aprobado por el equipo  
> **Base URL:** `/api`

---

# 1. Base URL

Todos los endpoints de RESQ utilizan como prefijo:

```text
/api
```

Ejemplo:

```text
/api/emergencies
```

---

# 2. Convenciones generales

La API utiliza las siguientes convenciones:

- Las propiedades JSON utilizan `camelCase`.
- Los valores de enumeraciones utilizan `UPPER_SNAKE_CASE`.
- Las fechas utilizan formato ISO 8601.
- Las solicitudes y respuestas utilizan formato JSON.
- Las validaciones deben realizarse en el backend.
- Los endpoints deben utilizar códigos HTTP estándar.
- Los contratos compartidos no deben modificarse unilateralmente.
- Los nuevos valores de enumeraciones compartidas deben ser aprobados por el equipo.
- Los identificadores de recursos utilizan `string`.
- Los nombres de endpoints utilizan kebab-case cuando contienen varias palabras.

---

# 3. Emergency Reports

Esta funcionalidad permite registrar y gestionar reportes de situaciones de emergencia.

## 3.1 Create Emergency Report

```http
POST /api/emergencies
```

### Descripción

Crea un nuevo reporte de emergencia.

### Request

```json
{
  "type": "PERSON_TRAPPED",
  "description": "Persona atrapada dentro de una vivienda.",
  "location": "Barrio Centro",
  "priority": "CRITICAL"
}
```

### Campos

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `type` | enum | Sí | Tipo de emergencia |
| `description` | string | Sí | Descripción del incidente |
| `location` | string | Sí | Ubicación del incidente |
| `priority` | enum | Sí | Nivel de prioridad |

### Emergency Types

| Value | Description |
|---|---|
| `PERSON_TRAPPED` | Persona atrapada |
| `INJURED_PERSON` | Persona herida |
| `DAMAGED_BUILDING` | Edificación afectada |
| `FIRE` | Incendio |
| `GAS_LEAK` | Fuga de gas |
| `OTHER` | Otro tipo de emergencia |

### Priority

| Value | Description |
|---|---|
| `LOW` | Prioridad baja |
| `MEDIUM` | Prioridad media |
| `HIGH` | Prioridad alta |
| `CRITICAL` | Prioridad crítica |

### Response

```http
201 Created
```

```json
{
  "id": "EMG-001",
  "type": "PERSON_TRAPPED",
  "description": "Persona atrapada dentro de una vivienda.",
  "location": "Barrio Centro",
  "priority": "CRITICAL",
  "status": "ACTIVE",
  "createdAt": "2026-08-15T12:00:00.000Z"
}
```

---

# 4. Get Emergency Reports

```http
GET /api/emergencies
```

### Descripción

Obtiene la lista de reportes de emergencia registrados.

### Response

```http
200 OK
```

```json
{
  "data": [
    {
      "id": "EMG-001",
      "type": "PERSON_TRAPPED",
      "description": "Persona atrapada dentro de una vivienda.",
      "location": "Barrio Centro",
      "priority": "CRITICAL",
      "status": "ACTIVE",
      "createdAt": "2026-08-15T12:00:00.000Z"
    }
  ]
}
```

---

# 5. Get Emergency by ID

```http
GET /api/emergencies/:id
```

### Descripción

Obtiene la información de un reporte de emergencia específico.

### Parámetro

| Parámetro | Tipo | Descripción |
|---|---|---|
| `id` | string | Identificador del reporte |

### Response

```http
200 OK
```

```json
{
  "id": "EMG-001",
  "type": "PERSON_TRAPPED",
  "description": "Persona atrapada dentro de una vivienda.",
  "location": "Barrio Centro",
  "priority": "CRITICAL",
  "status": "ACTIVE",
  "createdAt": "2026-08-15T12:00:00.000Z"
}
```

### Si no existe

```http
404 Not Found
```

---

# 6. Update Emergency Status

```http
PATCH /api/emergencies/:id/status
```

### Descripción

Actualiza el estado de un reporte de emergencia.

### Request

```json
{
  "status": "IN_PROGRESS"
}
```

### Emergency Status

| Value | Description |
|---|---|
| `ACTIVE` | Emergencia activa |
| `IN_PROGRESS` | Emergencia en proceso de atención |
| `RESOLVED` | Emergencia resuelta |
| `CANCELLED` | Emergencia cancelada |

### Response

```http
200 OK
```

```json
{
  "id": "EMG-001",
  "status": "IN_PROGRESS",
  "updatedAt": "2026-08-15T12:30:00.000Z"
}
```

---

# 7. Missing Persons

Esta funcionalidad permite registrar personas reportadas como desaparecidas durante una emergencia.

## 7.1 Create Missing Person

```http
POST /api/missing-persons
```

### Descripción

Registra una persona como desaparecida.

### Response

```http
201 Created
```

> Los campos específicos de la persona desaparecida serán definidos en el contrato de la funcionalidad correspondiente.

---

## 7.2 Get Missing Person

```http
GET /api/missing-persons/:id
```

### Descripción

Obtiene la información de una persona reportada como desaparecida.

### Response

```http
200 OK
```

---

# 8. Person Search

Esta funcionalidad permite consultar personas registradas en RESQ.

```http
GET /api/persons
```

### Descripción

Obtiene personas registradas y permite posteriormente aplicar filtros de búsqueda.

### Response

```http
200 OK
```

```json
{
  "data": []
}
```

> Los filtros específicos serán definidos durante la implementación de la funcionalidad correspondiente.

---

# 9. Person Located

Esta funcionalidad permite actualizar el estado de una persona cuando ha sido localizada.

## 9.1 Update Person Status

```http
PATCH /api/persons/:id/status
```

### Request

```json
{
  "status": "LOCATED"
}
```

### Response

```http
200 OK
```

> Los estados específicos de las personas serán definidos en el contrato de la funcionalidad correspondiente.

---

# 10. HTTP Status Codes

Todos los módulos deben utilizar códigos HTTP estándar.

| Código | Nombre | Uso |
|---|---|---|
| `200` | OK | Consulta o actualización exitosa |
| `201` | Created | Recurso creado correctamente |
| `400` | Bad Request | Solicitud inválida o validación fallida |
| `404` | Not Found | Recurso no encontrado |
| `500` | Internal Server Error | Error inesperado del servidor |

---

# 11. Error Response

Todos los módulos deben mantener una estructura consistente para los errores.

### Ejemplo

```json
{
  "status": 400,
  "message": "Invalid emergency type",
  "errors": [
    {
      "field": "type",
      "message": "Type must be a valid emergency type"
    }
  ]
}
```

### Campos del error

| Campo | Tipo | Descripción |
|---|---|---|
| `status` | number | Código HTTP |
| `message` | string | Mensaje general del error |
| `errors` | array | Lista de errores específicos |
| `errors[].field` | string | Campo que produjo el error |
| `errors[].message` | string | Descripción del problema |

---

# 12. Common Data Fields

Los siguientes campos pueden aparecer en diferentes recursos del sistema.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | string | Identificador único |
| `createdAt` | datetime | Fecha de creación |
| `updatedAt` | datetime | Fecha de última actualización |
| `status` | enum | Estado actual del recurso |
| `location` | string | Ubicación relacionada con el recurso |

---

# 13. API Response Conventions

Las respuestas de colección deben utilizar la propiedad `data`.

Ejemplo:

```json
{
  "data": [
    {
      "id": "EMG-001"
    },
    {
      "id": "EMG-002"
    }
  ]
}
```

Las respuestas de un recurso individual pueden devolver directamente el objeto.

Ejemplo:

```json
{
  "id": "EMG-001",
  "status": "ACTIVE"
}
```

---

# 14. Validation Rules

El backend debe validar como mínimo:

- Campos obligatorios.
- Tipos de datos.
- Valores permitidos de los enums.
- Identificadores.
- Longitud de textos cuando corresponda.
- Estados válidos para cada recurso.

Una solicitud inválida debe devolver:

```http
400 Bad Request
```

---

# 15. Versioning

La primera versión del contrato corresponde a:

```text
v1
```

Mientras el proyecto académico permanezca en su primera versión, los endpoints utilizarán:

```text
/api
```

Si en el futuro se requiere versionamiento explícito, se podrá evolucionar hacia:

```text
/api/v1
```

Cualquier cambio que rompa la compatibilidad con clientes existentes debe discutirse y documentarse antes de implementarse.

---

# 16. Contract Change Policy

El contrato de la API es compartido por los cuatro integrantes.

Por lo tanto:

1. Ningún integrante debe modificar unilateralmente un endpoint compartido.
2. Los cambios deben discutirse con el equipo.
3. Los cambios aprobados deben documentarse.
4. Si el cambio modifica el comportamiento existente, debe actualizarse la versión del contrato cuando corresponda.
5. El código debe mantenerse alineado con la documentación.

---

# 17. Current Endpoints

Resumen de endpoints definidos en la versión 1.0:

| Método | Endpoint | Funcionalidad |
|---|---|---|
| `POST` | `/api/emergencies` | Crear emergencia |
| `GET` | `/api/emergencies` | Listar emergencias |
| `GET` | `/api/emergencies/:id` | Consultar emergencia |
| `PATCH` | `/api/emergencies/:id/status` | Actualizar estado de emergencia |
| `POST` | `/api/missing-persons` | Registrar persona desaparecida |
| `GET` | `/api/missing-persons/:id` | Consultar persona desaparecida |
| `GET` | `/api/persons` | Buscar/listar personas |
| `PATCH` | `/api/persons/:id/status` | Actualizar estado de persona |

---

# 18. Document Status

**Version:** 1.0

**Status:** Approved draft

**Next review:** Antes de comenzar la implementación independiente de las funcionalidades.

Los cambios posteriores deberán quedar registrados mediante Git y actualizar la documentación correspondiente.