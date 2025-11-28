# Generar contenedor de angular con Docker

## Construir la imagen
``` shell
    docker build -t sistema-ventas-edm-app .
```

## Ejecutar imagen de docker
``` shell
    docker run -d -p 8080:80 sistema-ventas-edm-app
```