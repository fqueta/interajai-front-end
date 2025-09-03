# Etapa 1 - Build do React com Node 22
FROM node:22 AS build
WORKDIR /app

# Copia os arquivos de configuração
COPY package*.json ./

# Instala dependências
RUN npm install --frozen-lockfile

# Copia o restante do projeto
COPY . .

# Gera os arquivos otimizados do Vite
RUN npm run build

# Etapa 2 - Servir com Nginx
FROM nginx:stable-alpine

# Remove config padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia os arquivos do build para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
