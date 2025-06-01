# Use uma imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos do projeto para o contêiner
COPY . /app

# Instale as dependências do projeto
RUN npm install

# Exponha a porta que o servidor irá usar
EXPOSE 3000

# Configure o script de inicialização
CMD ["npm", "start"]