# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm ci --legacy-peer-deps

# Copiamos el código fuente
COPY . .


# Configuramos la variable de entorno para la API
# Este valor por defecto se usa cuando no se pasa un ARG durante la construcción
ARG NEXT_PUBLIC_API_URL=https://7jg2of7gv3.execute-api.us-east-1.amazonaws.com
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Construimos la aplicación para producción (exportación estática)
RUN npm run build

# Etapa de producción con Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copiamos la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos estáticos generados
COPY --from=builder /app/out /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Iniciamos Nginx
CMD ["nginx", "-g", "daemon off;"]