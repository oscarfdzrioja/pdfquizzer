# PDFQuizzer

PDFQuizzer es una aplicación que permite crear quizzes a partir de archivos PDF. Está desarrollada utilizando tecnologías modernas como FastAPI, React, Docker y más.

## URL Desplegada

**La aplicación está desplegada y accesible desde:** [http://pdfquizzer.pro](http://pdfquizzer.pro)

## Requisitos previos

- Tener instalado Docker y Docker Compose.
- Un editor de texto para configurar los archivos (opcional).

## Instalación y ejecución

### 1. Clonar el repositorio

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/oscarfdzrioja/pdfquizzer
cd pdfquizzer
```

### 2. Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto y copia las variables del archivo `.env.example`.
Edita el archivo `.env` con las credenciales y configuraciones necesarias, como la base de datos, claves secretas, etc.

Ejemplo de `.env`:

```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database
SECRET_KEY=your_secret_key
DOMAIN=localhost
```

### 3. Ejecutar el proyecto con Docker

Ejecuta el siguiente comando para iniciar los servicios definidos en `docker-compose.yml`:

```bash
docker-compose up --build
```

Esto descargará las imágenes necesarias, construirá los servicios y los levantará en contenedores Docker.

### 4. Probar la aplicación

Accede a la aplicación en tu navegador web visitando:
[http://localhost](http://localhost)

La API estará disponible en la misma dirección y puedes explorarla utilizando OpenAPI/Swagger.

## Recursos adicionales

- La interfaz de administración para la base de datos estará disponible (por ejemplo, Adminer). Revisa el archivo `docker-compose.yml` para verificar el puerto.
- Configura el dominio o realiza despliegues en un servidor VPS para producción.

## Contribuciones

Si deseas contribuir, crea un `fork` de este repositorio, realiza tus cambios y envía un pull request.

## Licencia

Este proyecto está licenciado bajo [MIT License](./LICENSE).
