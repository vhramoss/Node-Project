# Usa imagem oficial do Node.js
FROM node:18

# Instala a ferramenta 'netcat' para que o script wait-for-db.sh funcione.
# O pacote 'netcat' é um pacote virtual, então instalamos 'netcat-openbsd'.
RUN apt-get update && apt-get install -y netcat-openbsd

# Define o diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código, incluindo o script wait-for-db.sh
COPY . .

# Garante que o script é executável
RUN chmod +x wait-for-db.sh

# Expõe a porta que o NestJS escuta
EXPOSE 3000

# Inicia a aplicação usando o script wait-for-db.sh
CMD ["./wait-for-db.sh"]
