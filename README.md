# Backend 3 - AdoptMe

## Descripción

API REST para gestión de adopciones de mascotas. Incluye mocking de datos, router de adopciones, tests funcionales y deployment con Docker.

## Estructura del proyecto

src/
├── app.js
├── routes/
│ ├── adoption.router.js
│ ├── mocks.router.js
│ ├── users.router.js
│ └── pets.router.js
├── modules/
│ └── mocking.js
├── models/
│ ├── user.model.js
│ └── pet.model.js
├── dao/
│ ├── users.dao.js
│ └── pets.dao.js
├── services/
│ ├── users.services.js
│ └── pets.services.js
└── test/
└── adoption.test.js

## Repositorio

[https://github.com/AgusTV0318/backend-3](https://github.com/AgusTV0318/backend-3)

## Imagen en DockerHub

[https://hub.docker.com/r/agus0318/backend3-adoptme](https://hub.docker.com/r/agus0318/backend3-adoptme)

## Requisitos

- Node.js 22+
- MongoDB Atlas o local
- Docker Desktop

## Instalación y ejecución local

```bash
git clone https://github.com/AgusTV0318/backend-3.git
cd backend-3
npm install
```

Crear archivo `.env`:
PORT=8080
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/backend3

```bash
npm start
```

## Correr los tests

```bash
npm test
```

## Ejecutar con Docker

```bash
docker pull agus0318/backend3-adoptme:latest
docker run -p 8080:8080 --env-file .env agus0318/backend3-adoptme:latest
```

## Endpoints

| Método | Ruta                     | Descripción                        |
| ------ | ------------------------ | ---------------------------------- |
| GET    | /api/adoptions           | Lista usuarios con adopciones      |
| GET    | /api/adoptions/:aid      | Obtiene adopción por ID de usuario |
| POST   | /api/adoptions/:uid/:pid | Adopta una mascota                 |
| GET    | /api/mocks/mockingpets   | Genera 50 mascotas falsas          |
| GET    | /api/mocks/mockingusers  | Genera 50 usuarios falsos          |
| POST   | /api/mocks/generateData  | Inserta users y pets en DB         |
| GET    | /api/users               | Lista todos los usuarios           |
| GET    | /api/pets                | Lista todas las mascotas           |

## Escaneo de seguridad

```bash
docker scout cves backend3-adoptme
```

Resultado: 0 críticas, 1 alta, 4 medias, 1 baja — todas en dependencias de desarrollo.

## Tests funcionales

Cobertura completa del router `adoption.router.js`:

- GET /api/adoptions → retorna array de usuarios con mascotas
- GET /api/adoptions/:aid → 404 con ID inexistente, 500 con formato inválido
- POST /api/adoptions/:uid/:pid → éxito, usuario inexistente, mascota inexistente, mascota ya adoptada
