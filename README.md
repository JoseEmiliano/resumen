TP - Estrategias de Persistencia (Versión PostgreSQL Local)
Este proyecto tiene como objetivo la implementación de asociaciones 1 a N y N a M en una API REST utilizando el ORM Sequelize. Se ha evolucionado la base de datos de una versión inicial de prueba a un entorno profesional basado en PostgreSQL dentro de contenedores Docker.

 Implementación: El Búnker de Datos (Postgres)
Para cumplir con los criterios de evaluación de persistencia avanzada, se utiliza una imagen de PostgreSQL 15. Esto permite validar el comportamiento de las tablas intermedias (ProductoFabricante y ProductoComponente) en un motor de base de datos relacional de producción.

 Guía de Ejecución Local
1. Requisitos previos
Docker y Docker Compose instalados.

DBeaver (recomendado para visualizar las tablas).

2. Levantar el entorno
Desde la terminal en la raíz del proyecto, ejecutá:

Bash
docker compose up -d
Este comando levantará dos servicios:

api: Servidor Express en el puerto 3000 con Hot-Reload (Nodemon).

db: Base de datos PostgreSQL en el puerto 5432.

3. Sincronización de Modelos
Sequelize está configurado para sincronizar los modelos automáticamente al iniciar. Podés verificar que las tablas se crearon correctamente con:

Bash
docker compose logs -f api
 Modelo de Datos (DER)
El sistema gestiona la relación entre productos manufacturados, sus fabricantes y los componentes técnicos que los integran.

 Endpoints Principales
Productos (Relaciones N:M)
GET /productos: Obtiene todos los productos con sus fabricantes y componentes asociados (Eager Loading).

POST /productos/:id/fabricantes: Asocia un producto con una lista de IDs de fabricantes.

POST /productos/:id/componentes: Asocia un producto con una lista de IDs de componentes.

Fabricantes
GET /fabricantes/:id/productos: Obtiene el fabricante con sus productos y los componentes de cada producto.

Componentes
GET /componentes/:id/productos: Obtiene un componente y la lista de productos donde se utiliza.

Configuración del Búnker
Los datos de conexión están centralizados en el archivo docker-compose.yml. Para conectar desde DBeaver o herramientas externas, usá los siguientes parámetros:

Host: localhost

Puerto: 5432

Usuario: usuario_tp

Password: clave123

Base de Datos: resumen_db

🛠️ Comandos Útiles de Mantenimiento
Bash
# Ver logs del contenedor de la API
docker compose logs -f api

# Reiniciar la API sin afectar la base de datos
docker compose restart api

# Detener y borrar el volumen de datos (Reset total de la DB)
docker compose down -v
✅ Instrucciones para la Entrega
Asegurarse de que el archivo DER.png esté en la raíz del proyecto.

Verificar que la carpeta node_modules esté en el .gitignore.

El sistema detectará automáticamente el puerto configurado por la variable de entorno PORT en el archivo de configuración.