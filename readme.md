# BACKEND 

API REST para la plataforma de cursos virtuales `Corsi`. 

## Prerrequisitos

1. [Git](https://git-scm.com/)
2. [NodeJS](https://nodejs.org/es/)
3. [NestJS](https://nestjs.com/)
4. [PostgreSQL](https://www.postgresql.org/)

## Instalar

Desde un terminal clonamos el repositorio 

    $ git clone https://github.com/ucab-ravens/backend.git

e instalamos todas las dependencias necesarias

    $ cd backend
    $ npm install

Se deberá crear una bases de datos llamada 'corsi' en Postgres desde la consola de comandos o bien desde pgAdmin. Además de esto, edite los datos necesarios en el `.env` (ej. `DB_PASSWORD`) según como se haya configurado Postgres.

## Ejecutar (entorno de desarrollo)

Una vez instaladas las dependencias necesarias basta con ejecutar el siguiente comando para levantar el servicio de manera local

    $ npm run start:dev

Podemos correr seeds (cargar la base de datos con datos de prueba) corriendo

    # Cargamos datos de prueba
    $ npm run seed

    # Dropeamos todos los datos
    $ npm run seed:drop


## Construir (entorno de producción)

    $ npm run start:prod
