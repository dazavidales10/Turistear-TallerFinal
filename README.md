# Turistear

Proyecto integrador Full Stack para la gestión de planes turísticos, vuelos y reservas, desarrollado con Java y Spring Boot.

# Tecnologías
Java 17
Spring Boot
Spring Data JPA
H2 Database
Maven
API REST
JSON

# Estructura principal
src/main/java/com/sena/edu/turistear/

├── controller/    # Endpoints REST
├── service/       # Lógica de negocio
├── repository/    # Acceso a datos
├── model/         # Entidades
├── external/      # Servicios externos
└── exception/     # Manejo de errores

# Endpoints principales

Planes turísticos

GET     /api/planes
GET     /api/planes/{id}
POST    /api/planes
PUT     /api/planes/{id}
DELETE  /api/planes/{id}

Vuelos

GET     /api/vuelos
GET     /api/vuelos/{id}
POST    /api/vuelos
PUT     /api/vuelos/{id}
DELETE  /api/vuelos/{id}

Reservas

GET     /api/reservas
GET     /api/reservas/{id}
POST    /api/reservas
PUT     /api/reservas/{id}/estado
DELETE  /api/reservas/{id}

Clima

GET /api/clima?latitud=4.7110&longitud=-74.0721

# Ejecución
mvnw.cmd spring-boot:run

Servidor:

http://localhost:8080

Base de datos H2:

http://localhost:8080/h2-console