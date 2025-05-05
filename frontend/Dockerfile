FROM node:18-alpine AS builder
WORKDIR /app

# Copia apenas o package.json primeiro
COPY package.json .

# Gera o package-lock.json dentro do container
RUN npm install --package-lock-only

# Instala as dependências
RUN npm ci --no-audit --force

# Copia o restante dos arquivos
COPY . .

# Build da aplicação
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]