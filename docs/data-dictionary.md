# RESQ Data Dictionary

> Diccionario oficial de datos compartidos del proyecto RESQ.
>
> **Versión:** 1.0  
> **Estado:** Approved draft

---

# 1. Objetivo

Este documento define los nombres, tipos, formatos y valores permitidos para los datos utilizados por los diferentes módulos de RESQ.

Todos los integrantes deben utilizar estas convenciones para evitar inconsistencias durante la integración.

---

# 2. Naming Conventions

## 2.1 JSON Properties

Todas las propiedades JSON deben utilizar:

```text
camelCase
```

Correcto:

```json
{
  "createdAt": "2026-08-15T12:00:00.000Z",
  "firstName": "Juan"
}
```

Incorrecto:

```json
{
  "created_at": "...",
  "first_name": "Juan"
}
```

---

# 3. Identifiers

## 3.1 id

| Propiedad | Valor |
|---|---|
| Nombre | `id` |
| Tipo | `string` |
| Obligatorio | Sí |
| Descripción | Identificador único del recurso |

Ejemplo:

```json
{
  "id": "EMG-001"
}
```

---

# 4. Date and Time

## 4.1 createdAt

| Propiedad | Valor |
|---|---|
| Nombre | `createdAt` |
| Tipo | `string` / datetime |
| Formato | ISO 8601 |
| Obligatorio | Sí |
| Descripción | Fecha y hora de creación |

Ejemplo:

```text
2026-08-15T12:00:00.000Z
```

---

## 4.2 updatedAt

| Propiedad | Valor |
|---|---|
| Nombre | `updatedAt` |
| Tipo | `string` / datetime |
| Formato | ISO 8601 |
| Obligatorio | No |
| Descripción | Fecha y hora de última modificación |

Ejemplo:

```text
2026-08-15T12:30:00.000Z
```

---

# 5. Emergency Report

Representa un reporte generado durante una situación de emergencia.

## 5.1 Emergency Report Structure

```json
{
  "id": "EMG-001",
  "type": "PERSON_TRAPPED",
  "description": "Persona atrapada dentro de una vivienda.",
  "location": "Barrio Centro",
  "priority": "CRITICAL",
  "status": "ACTIVE",
  "createdAt": "2026-08-15T12:00:00.000Z",
  "updatedAt": "2026-08-15T12:30:00.000Z"
}
```

---

## 5.2 type

| Propiedad | Valor |
|---|---|
| Nombre | `type` |
| Tipo | enum |
| Obligatorio | Sí |
| Descripción | Tipo de emergencia |

Valores permitidos:

```text
PERSON_TRAPPED
INJURED_PERSON
DAMAGED_BUILDING
FIRE
GAS_LEAK
OTHER
```

---

## 5.3 description

| Propiedad | Valor |
|---|---|
| Nombre | `description` |
| Tipo | `string` |
| Obligatorio | Sí |
| Descripción | Explicación de la situación reportada |

Ejemplo:

```text
Persona atrapada dentro de una vivienda.
```

---

## 5.4 location

| Propiedad | Valor |
|---|---|
| Nombre | `location` |
| Tipo | `string` |
| Obligatorio | Sí |
| Descripción | Ubicación relacionada con el reporte |

Ejemplo:

```text
Barrio Centro
```

> En una futura versión este campo podrá evolucionar a coordenadas geográficas.

---

## 5.5 priority

| Propiedad | Valor |
|---|---|
| Nombre | `priority` |
| Tipo | enum |
| Obligatorio | Sí |
| Descripción | Nivel de prioridad del reporte |

Valores permitidos:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

---

## 5.6 status

| Propiedad | Valor |
|---|---|
| Nombre | `status` |
| Tipo | enum |
| Obligatorio | Sí |
| Descripción | Estado actual del reporte |

Valores permitidos:

```text
ACTIVE
IN_PROGRESS
RESOLVED
CANCELLED
```

---

# 6. Missing Person

Representa una persona reportada como desaparecida.

## 6.1 Identificación

Los siguientes campos se establecen como base para la primera versión:

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `id` | string | Sí | Identificador único |
| `firstName` | string | Sí | Nombre |
| `lastName` | string | Sí | Apellido |
| `age` | number | No | Edad aproximada |
| `description` | string | Sí | Descripción física o información relevante |
| `lastSeenLocation` | string | Sí | Última ubicación conocida |
| `status` | enum | Sí | Estado de la persona |
| `createdAt` | datetime | Sí | Fecha de registro |
| `updatedAt` | datetime | No | Fecha de actualización |

---

## 6.2 firstName

```text
firstName
```

Tipo:

```text
string
```

Representa el nombre de la persona.

Ejemplo:

```json
{
  "firstName": "Carlos"
}
```

---

## 6.3 lastName

```text
lastName
```

Tipo:

```text
string
```

Representa el apellido de la persona.

Ejemplo:

```json
{
  "lastName": "Rodríguez"
}
```

---

## 6.4 age

```text
age
```

Tipo:

```text
number
```

Representa la edad conocida o aproximada.

Ejemplo:

```json
{
  "age": 35
}
```

---

## 6.5 description

```text
description
```

Tipo:

```text
string
```

Contiene información descriptiva relevante para ayudar a identificar a la persona.

Ejemplo:

```text
Camisa azul, pantalón negro y cabello corto.
```

---

## 6.6 lastSeenLocation

```text
lastSeenLocation
```

Tipo:

```text
string
```

Representa el último lugar donde fue vista la persona.

Ejemplo:

```text
Barrio San Martín
```

---

# 7. Person Status

Los estados de una persona se mantienen separados de los estados de una emergencia.

Valores iniciales:

```text
MISSING
LOCATED
CONFIRMED_SAFE
UNKNOWN
```

### Descripción

| Valor | Descripción |
|---|---|
| `MISSING` | Persona reportada como desaparecida |
| `LOCATED` | Persona localizada |
| `CONFIRMED_SAFE` | Persona localizada y confirmada fuera de peligro |
| `UNKNOWN` | Estado todavía desconocido |

---

# 8. Common Enums

## 8.1 Priority

```text
LOW
MEDIUM
HIGH
CRITICAL
```

---

## 8.2 EmergencyType

```text
PERSON_TRAPPED
INJURED_PERSON
DAMAGED_BUILDING
FIRE
GAS_LEAK
OTHER
```

---

## 8.3 EmergencyStatus

```text
ACTIVE
IN_PROGRESS
RESOLVED
CANCELLED
```

---

## 8.4 PersonStatus

```text
MISSING
LOCATED
CONFIRMED_SAFE
UNKNOWN
```

---

# 9. JSON Example

Ejemplo completo de una persona desaparecida:

```json
{
  "id": "PER-001",
  "firstName": "Carlos",
  "lastName": "Rodríguez",
  "age": 35,
  "description": "Camisa azul, pantalón negro y cabello corto.",
  "lastSeenLocation": "Barrio San Martín",
  "status": "MISSING",
  "createdAt": "2026-08-15T12:00:00.000Z"
}
```

---

# 10. Validation Rules

Todos los módulos deben validar los datos recibidos.

## Strings

Los campos de texto obligatorios:

- No deben estar vacíos.
- Deben eliminar espacios innecesarios.
- Deben respetar una longitud máxima definida por el módulo.

## Numbers

Los campos numéricos deben:

- Ser números válidos.
- No aceptar valores negativos cuando no tengan sentido.
- Respetar los rangos definidos por el módulo.

## Enums

Los campos enum únicamente pueden aceptar los valores definidos en este documento.

Ejemplo válido:

```json
{
  "priority": "HIGH"
}
```

Ejemplo inválido:

```json
{
  "priority": "URGENT"
}
```

---

# 11. Future Extensions

Estos campos no forman parte obligatoria del MVP, pero podrán agregarse posteriormente:

```text
latitude
longitude
photoUrl
phone
email
emergencyContact
documentNumber
gender
medicalInformation
```

Cualquier nuevo campo debe ser evaluado antes de incorporarse al contrato oficial.

---

# 12. Data Privacy

RESQ manejará información potencialmente sensible relacionada con personas desaparecidas y situaciones de emergencia.

Por esta razón:

- No se deben almacenar datos personales innecesarios.
- No se deben incluir datos sensibles en logs.
- No se deben subir datos reales de personas al repositorio.
- Los datos utilizados durante desarrollo deben ser ficticios.
- Los secretos y credenciales nunca deben almacenarse en Git.
- Las futuras funcionalidades de autenticación y autorización deberán controlar el acceso a la información.

---

# 13. Contract Change Policy

Este documento es compartido por los cuatro integrantes.

Antes de modificar:

- nombres de campos;
- tipos de datos;
- enums;
- estados;
- estructuras JSON;

se debe informar al equipo y actualizar la documentación.

Los cambios deben quedar registrados mediante Git.

---

# 14. Document Status

**Version:** 1.0

**Status:** Approved draft

**Owner:** RESQ Development Team

Este documento debe mantenerse sincronizado con la implementación del backend y frontend.