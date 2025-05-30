# Configurando o Runner com o github

Para o funcionamento do deploy, é necessário configurar o runner no GitHub. O runner deve estar no mesmo servidor da aplicação.

### Comandos para instalação e configuração do runner:
```bash
apt-get update -y
apt upgrade -y
apt-get install -y curl vim perl docker-compose
```

### Instalação do runner no GitHub:
```bash
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-2.324.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.324.0/actions-runner-linux-x64-2.324.0.tar.gz
echo "TOKEN  actions-runner-linux-x64-2.324.0.tar.gz" | shasum -a 256 -c
tar xzf ./actions-runner-linux-x64-2.324.0.tar.gz
```

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
su - github-runner -c 'cd /actions-runner && ./config.sh --url https://github.com/USER/postech-fase3-sub --token OUTRO_TOKEN'
```

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

# Configuração do Banco de Dados MySQL

### Passos:
1. Entre no servidor MySQL:
    ```bash
    docker exec -it mysql bash
    ```
2. Acesse o banco de dados:
    ```bash
    mysql -uroot -p
    ```
    Insira a senha: `admin`.

3. Execute os comandos do arquivo `sql/init.sql` bloco por bloco.

4. Após finalizar, o banco de dados estará pronto para os testes.

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
    - **Username**: `valid_user`
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
  - **models/**: Modelos de banco de dados.
  - **routers/**: Rotas da API.
  - **middleware/**: Validação e autenticação.
  - **controllers/**: Lógica de negócios.
- **keycloak/**: Configurações do Keycloak.
- **sql/**: Scripts de inicialização.
- **.env**: Variáveis de ambiente.
- **Dockerfile**: Criação de imagem Docker.
- **docker-compose.yml**: Orquestração de contêineres.

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
```bash
docker-compose -f docker-compose.runner.yml up -d
```

### Endpoints Disponíveis:
- `GET /`: Mensagem de boas-vindas.
- `GET /health`: Status da API.
- `POST /keycloak/login`: Autenticação via Keycloak.
- `GET /veiculos`: Listar veículos.
- `POST /vendas`: Registrar venda.

---

# Testes

### Instalar dependências:
```bash
npm install
```

### Executar testes:
```bash
npm test
```

---

# Deploy Automatizado

O deploy automatizado está configurado no arquivo `.github/workflows/ci-cd.yml`. Ele realiza:
1. Instalação de dependências.
2. Execução de testes.
3. Build e push da imagem Docker.
4. Deploy em ambiente configurado.

Configure as credenciais do Docker no GitHub Actions e ajuste o arquivo conforme necessário.
---
