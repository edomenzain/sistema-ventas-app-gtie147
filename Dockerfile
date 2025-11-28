# ng build --configuration=production
# Contruir el proyecto de angular
FROM node:22 as build

# Crear directorio de trabajo
WORKDIR /app

# Copiar el archivo de dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código que genero
COPY . .

# Ejecutar el comando para construir angular
RUN npm run build -- --configuration=production

# ----------- GENERAR EL CONTENEDOR CON EL COMPILADO
FROM nginx:alpine

# Copiar build generado desde node (build)
COPY --from=build /app/dist/sistema-ventas-edm-app/browser /usr/share/nginx/html

# Configurar NGINX para rutas SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto
EXPOSE 80

# Ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]