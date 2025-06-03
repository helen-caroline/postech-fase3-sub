# API de Gestão de Veículos

## Descrição do Projeto
API para gerenciar veículos, usuários e vendas. Utiliza Keycloak para autenticação e MySQL para armazenamento.

## Tecnologias Utilizadas
- Node.js
- Express
- MySQL
- Keycloak
- Docker e Docker Compose
- Jest para testes

## Estrutura do Projeto
- **src/**: Código-fonte.
  - **app.js**: Configuração principal da aplicação.
  - **server.js**: Inicialização do servidor.
  - **models/**: Modelos de banco de dados.
    - **veiculos/model.js**: Operações relacionadas aos veículos.
    - **vendas/model.js**: Operações relacionadas às vendas.
  - **routers/**: Rotas da API.
    - **veiculos/router.js**: Rotas relacionadas aos veículos.
    - **vendas/router.js**: Rotas relacionadas às vendas.
    - **usuarios/router.js**: Rotas relacionadas aos usuários.
  - **middleware/**: Validação e autenticação.
    - **veiculos/middleware.js**: Middleware para validação de veículos.
    - **vendas/middleware.js**: Middleware para validação de vendas.
  - **controllers/**: Lógica de negócios.
    - **veiculos/controller.js**: Controlador de veículos.
    - **vendas/controller.js**: Controlador de vendas.
    - **usuarios/controller.js**: Controlador de usuários.
- **Docker/**: Arquivos de configuração do Docker Compose.
  - **backend/**
    - **Dockerfile**: Configuração do contêiner backend.
  - **keycloak/**: Configurações do Keycloak.
    - **Dockerfile**: Configuração do contêiner Keycloak.
    - **import/**: Arquivos de importação para Keycloak.
      - **api-veiculos.json**: Configuração do cliente Keycloak.
      - **realm-export.json**: Exportação do Realm.
- **sql/**: Scripts de inicialização do banco de dados.
- **init.sql**: Script para criação e inicialização das tabelas.
- **docker-compose.backend.yml**: Configuração do backend.
- **docker-compose.keycloak.yml**: Configuração do Keycloak.
- **docker-compose.mysql.yml**: Configuração do MySQL.
- **docker-compose.runner.yml**: Configuração do runner.
- **.env**: Variáveis de ambiente.
- **README.md**: Documentação do projeto.

---

### Configuração do `.env`:
```env
DB_HOST=mysql
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=veiculos

HOSTNAME_API=http://backend:3000
HOSTNAME=http://keycloak:8080
REALM=prod
CLIENT_ID=api-veiculos
CLIENT_SECRET=<CLIENT_SECRET>
```

### Iniciar contêiner:
para iniciar o projeto subo o container principal que será responsavel pelo deploy automatizado:

Crie a rede compartilhada com o comando:
```bash
docker network create app-network2
```

```bash
docker-compose -f docker-compose.runner.yml up -d
```

Logo após o runner estiver UP os containers Mysql, Keycloak e Backend, iniciarão automaticamente.

### Acesso ao banco de dados MySQL
```bash
docker exec -it mysql bash
mysql -uroot -p
Insira a senha: [`admin`]
```
Configurando a base dados:
execute os comandos no arquivo ``.init`` na raiz do projeto.

### Endpoints Disponíveis:

#### Rotas Públicas:
- `GET /`: Mensagem de boas-vindas.
- `GET /health`: Status da API.

#### Rotas do Keycloak:
- `POST /keycloak/login`: Autenticação via Keycloak.
  - **Body**:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
- `POST /keycloak/login/:username`: Login com senha.
  - **Body**:
    ```json
    {
      "password": "string"
    }
    ```
- `POST /keycloak/introspect/:username`: Introspecção de token.
  - **Body**:
    ```json
    {
      "token": "string"
    }
    ```
- `POST /keycloak/logout/:username`: Logout de usuário.
  - **Body**:
    ```json
    {
      "token": "string"
    }
    ```

#### Rotas de Veículos:
- `GET /veiculos`: Listar veículos.

#### Rotas de Usuários:
- `GET /usuarios/get`: Buscar todos os usuários.
- `GET /usuarios/get/:username`: Buscar usuário pelo username.
- `POST /usuarios/create`: Criar usuário.
  - **Body**:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
- `DELETE /usuarios/delete`: Deletar usuário.
  - **Body**:
    ```json
    {
      "username": "string"
    }
    ```
- `PUT /usuarios/update`: Atualizar usuário.
  - **Body**:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

#### Rotas de Vendas:
- `GET /vendas/sales`: Listar todas as vendas.
- `POST /vendas/buy`: Registrar venda.
  - **Body**:
    ```json
    {
      "veiculoId": "string",
      "compradorId": "string",
      "valor": "number"
    }
    ```

---


# Configurando o Runner com o github

Para o funcionamento do deploy, é necessário configurar o runner no GitHub. O runner deve estar no mesmo servidor da aplicação.

### Instalação do runner no GitHub:
Pode seguir a parte inicial que o github orienta

Download
```bash
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-2.324.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.324.0/actions-runner-linux-x64-2.324.0.tar.gz
echo "TOKEN  actions-runner-linux-x64-2.324.0.tar.gz" | shasum -a 256 -c
tar xzf ./actions-runner-linux-x64-2.324.0.tar.gz
```

``A paritr daqui o runner precisara de uma configuração especial:``
## Configure
### Configuração de usuário para rodar o runner:
```bash
useradd -m github-runner
chown -R github-runner:github-runner /actions-runner
```
### Instalação de dependências:
```bash
./bin/installdependencies.sh
```
### Configuração do runner:
```bash
su - github-runner -c 'cd /actions-runner && ./config.sh --url https://github.com/helen-caroline/postech-fase3-sub --token  A56FW6QILTW7L5LQF55R5ZTIHTAQS'
```
## Using your self-hosted runner
### Iniciar o runner:
```bash
su - github-runner -c 'cd /actions-runner && ./run.sh'
```

Se tudo estiver correto, você verá:
```
√ Connected to GitHub
Current runner version: '2.324.0'
2025-05-30 20:20:38Z: Listening for Jobs
```

---

# Configuração do Keycloak

### Importação de arquivos:
- **Realm**: `keycloak/import/realm-export.json`
- **Client**: `keycloak/import/api-veiculos.json`

#### Importar Realm:
1. Acesse **Manage realms**.
2. Clique em **Create realm**.
3. Selecione o arquivo `realm-export.json`.
4. Clique em **Create**.

#### Configurar Realm:
1. Em **Realm Settings**, na aba superior, clique em **Login**.
2. Certifique-se que as opções estão habilitadas:
    - Email as username: **On**
    - Login with email: **On**

#### Importar Client:
1. Acesse **Clients**.
2. Clique em **Import client**.
3. Selecione o arquivo `api-veiculos.json`.
4. Clique em **Save**.

#### Criar Usuário:
1. Acesse **Users** e clique em **Create new user**.
2. Preencha as propriedades:
    - **Username**: `valid_user@email.com`
    - **Email**: `valid_user@email.com`
    - **First Name**: `Valid`
    - **Last Name**: `User`
3. Clique em **Create**.
4. Defina a senha:
    - **Password**: `admin321`
    - Desabilite **Temporary**.

#### Configurar Roles:
1. Acesse o client `api-veiculos`.
2. Vá para **Service accounts roles**.
3. Clique em **Assign roles** e selecione:
    - **realm-management: manage-realm**
    - **realm-management: manage-users**
    - **realm-management: create-client**

---

# Deploy Automatizado

O deploy automatizado está configurado no arquivo `.github/workflows/ci-cd.yml`. Ele realiza:
1. Instalação de dependências.
2. Execução de testes.
3. Deploy em ambiente configurado.

Configure as credenciais do Docker no GitHub Actions e ajuste o arquivo conforme necessário.

OBS: o action que vai rodar o deploy inicia após o merge da PR na main.
---
