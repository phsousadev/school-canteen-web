FROM node:18-alpine

# Instala pnpm globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY pnpm-lock.yaml ./
COPY package.json ./

# Instala as dependências
RUN pnpm install

# Copia o restante do código
COPY . .

# Builda o projeto
RUN pnpm build

# Expõe a porta (por exemplo, se usar `vite preview`)
EXPOSE 4173

# Comando para rodar o projeto
CMD ["pnpm", "preview", "--host"]
