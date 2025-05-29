# API de Gestão de Veículos

Este projeto é uma API desenvolvida em Node.js com Express para gerenciar veículos, usuários e vendas. Ele utiliza Keycloak para autenticação e autorização, além de integrar com um banco de dados para persistência de dados.

## Estrutura do Projeto
.dockerignore 
.gitignore 
Dockerfile 
keycloak.json 
package.json 
README.md 
src/
  app.js
  server.js
  controllers/ 
    keycloack/ 
      controller.js 
    usuarios/ 
      controller.js 
    veiculos/ 
      controller.js 
    vendas/ 
      controller.js 
  middleware/ 
    veiculos/ 
      middleware.js 
    vendas/ 
      middleware.js 
  models/ 
    keycloack/ 
      model.js 
    usuarios/ 
      model.js 
    veiculos/ 
      model.js 
    vendas/ 
      model.js 
  routers/ 
    keycloack/ 
      router.js 
    usuarios/
      router.js
    veiculos/
      router.js
    vendas/ 
      router.js
    test/ 
      router.js
    veiculos/
      router.js


## Funcionalidades

- **Keycloak**: Autenticação e autorização.
- **Usuários**: CRUD de usuários.
- **Veículos**: Gerenciamento de veículos (listar, cadastrar, editar).
- **Vendas**: Validação e registro de vendas.

## Pré-requisitos

- Node.js (v16 ou superior)
- NPM (v8 ou superior)
- Banco de dados MySQL
- Keycloak configurado com o `client_id` e `client_secret` especificados no arquivo `src/models/keycloack/model.js`.

## Instalação

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>

2. Instale as dependências:
npm install

3.Configure o Keycloak:

Atualize o arquivo keycloak.json com as informações do seu servidor Keycloak.
4.Configure o banco de dados:

Certifique-se de que o MySQL está rodando e configure as credenciais no arquivo de conexão do Sequelize.
Uso
Ambiente de Desenvolvimento
Para iniciar o servidor em modo de desenvolvimento com nodemon:
npm run dev

Ambiente de Produção
Para iniciar o servidor em modo de produção:
npm start

Testes
Para executar os testes:
npm test

Endpoints
Rotas Públicas
GET /: Bem-vindo à API.
GET /health: Verifica o status da API.

Rotas do Keycloak
POST /keycloak/login: Login com client credentials.
POST /keycloak/login/:username: Login com username e senha.
POST /keycloak/introspect/:username: Introspecção de token.
POST /keycloak/logout/:username: Logout do usuário.

Rotas Protegidas
Usuários
GET /usuarios/get: Lista todos os usuários.
GET /usuarios/get/:username: Busca usuário pelo username.
POST /usuarios/create: Cria um novo usuário.
DELETE /usuarios/delete: Deleta um usuário.
PUT /usuarios/update: Atualiza um usuário.

Veículos
GET /veiculos: Lista todos os veículos.
POST /veiculos: Cadastra um novo veículo.
PUT /veiculos/:id: Edita um veículo.

Vendas
POST /vendas: Registra uma venda.

Tecnologias Utilizadas
Node.js
Express
Keycloak
Sequelize
MySQL
Jest (para testes)

Contribuição
Sinta-se à vontade para abrir issues ou enviar pull requests para melhorias.

Licença
Este projeto está licenciado sob a licença ISC.