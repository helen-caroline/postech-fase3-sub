# Trabalho Fase 3 - Substitutiva

## Keycloak
Esta API utiliza o **Keycloak** para gerenciar autenticação e autorização. Para acessar as rotas protegidas, você precisa obter um **token de acesso (Access Token)** e incluí-lo no cabeçalho `Authorization` das requisições.

---

### Configuração do Keycloak
- **URL do Keycloak**: Certifique-se de que o Keycloak está rodando em `http://localhost:8080`.
- **Realm**: `postech-fase3`
- **Client**: `api-compradores`
- **Client Secret**: Configurado no Keycloak (veja no painel administrativo do cliente).

---

### Como Obter o Token de Acesso
1. Faça uma requisição `POST` para o endpoint de token do Keycloak:
   ```
   POST http://localhost:8080/realms/postech-fase3/protocol/openid-connect/token
   ```

2. Envie os seguintes parâmetros no corpo da requisição (formato `x-www-form-urlencoded`):
   - `grant_type`: `password`
   - `client_id`: `api-compradores`
   - `client_secret`: O segredo do cliente configurado no Keycloak.
   - `username`: O nome de usuário registrado no Keycloak.
   - `password`: A senha do usuário.

   **Exemplo de requisição com `curl`:**
   ```bash
   curl -X POST http://localhost:8080/realms/postech-fase3/protocol/openid-connect/token \
   -H "Content-Type: application/x-www-form-urlencoded" \
   -d "grant_type=password" \
   -d "client_id=api-compradores" \
   -d "client_secret=SEU_CLIENT_SECRET" \
   -d "username=usuario_teste" \
   -d "password=senha_teste"
   ```

3. A resposta será algo como:
   ```json
   {
       "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
       "expires_in": 300,
       "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
       "token_type": "Bearer",
       ...
   }
   ```

4. Copie o valor do campo `access_token`.

---

### Como Usar o Token de Acesso
Inclua o token de acesso no cabeçalho `Authorization` das requisições para rotas protegidas. O formato deve ser:
```
Authorization: Bearer SEU_ACCESS_TOKEN
```

**Exemplo de requisição com `curl`:**
```bash
curl -X GET http://localhost:3000/veiculos/viewer \
-H "Authorization: Bearer SEU_ACCESS_TOKEN"
```

---

## Rotas Protegidas
As seguintes rotas requerem autenticação com o token de acesso:

### Veículos
- **Listar todos os veículos cadastrados**
  ```
  GET /veiculos/viewer
  ```
  **Exemplo de uso:**
  ```bash
  curl -X GET http://localhost:3000/veiculos/viewer
  ```

- **Listar todos os veículos disponíveis**
  ```
  GET /veiculos/available
  ```
  **Exemplo de uso:**
  ```bash
  curl -X GET http://localhost:3000/veiculos/available
  ```

- **Listar todos os veículos vendidos**
  ```
  GET /veiculos/sold
  ```
  **Exemplo de uso:**
  ```bash
  curl -X GET http://localhost:3000/veiculos/sold
  ```

- **Cadastrar um veículo**
  ```
  POST /veiculos/create
  ```
  **Corpo da requisição (JSON):**
  ```json
  {
    "marca": "Toyota",
    "modelo": "Corolla",
    "ano": 2023,
    "cor": "Branco",
    "preco": 120000
  }
  ```
  **Exemplo de uso:**
  ```bash
  curl -X POST http://localhost:3000/veiculos/create \
  -H "Content-Type: application/json" \
  -d '{"marca":"Toyota","modelo":"Corolla","ano":2023,"cor":"Branco","preco":120000}'
  ```

- **Editar um veículo pelo ID**
  ```
  PUT /veiculos/update/:id
  ```
  **Parâmetro de rota:** `:id` (ID do veículo a ser atualizado)  
  **Corpo da requisição (JSON):**
  ```json
  {
    "modelo": "Novo Modelo"
  }
  ```
  **Exemplo de uso:**
  ```bash
  curl -X PUT http://localhost:3000/veiculos/update/1 \
  -H "Content-Type: application/json" \
  -d '{"modelo":"Novo Modelo"}'
  ```

---

### Vendas
- **Listar todas as vendas**
  ```
  GET /vendas/viewer
  ```
  **Exemplo de uso:**
  ```bash
  curl -X GET http://localhost:3000/vendas/viewer
  ```

- **Registrar uma venda**
  ```
  POST /vendas/create
  ```
  **Corpo da requisição (JSON):**
  ```json
  {
    "veiculoId": 1,
    "usuarioId": 2
  }
  ```
  **Exemplo de uso:**
  ```bash
  curl -X POST http://localhost:3000/vendas/create \
  -H "Content-Type: application/json" \
  -d '{"veiculoId": 1, "usuarioId": 2}'
  ```

- **Comprar um veículo**
  ```
  POST /vendas/buy
  ```
  **Corpo da requisição (JSON):**
  ```json
  {
    "veiculoId": 1,
    "usuarioId": 2
  }
  ```
  **Exemplo de uso:**
  ```bash
  curl -X POST http://localhost:3000/vendas/buy \
  -H "Content-Type: application/json" \
  -d '{"veiculoId": 1, "usuarioId": 2}'
  ```

  **OBS:** Quando uma compra é feita através dessa rota, um registro de venda é criado automaticamente acionando a rota `vendas/create`.

---

### Usuários
- **Listar todos os usuários cadastrados**
  ```
  GET /usuarios/viewer
  ```
  **Exemplo de uso:**
  ```bash
  curl -X GET http://localhost:3000/usuarios/viewer
  ```

- **Cadastrar um usuário**
  ```
  POST /usuarios/create
  ```
  **Corpo da requisição (JSON):**
  ```json
  {
    "nome": "João Silva",
    "email": "joao.silva@email.com"
  }
  ```
  **Exemplo de uso:**
  ```bash
  curl -X POST http://localhost:3000/usuarios/create \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","email":"joao.silva@email.com"}'
  ```

---

## Logout
Para realizar o logout, acesse a rota:
```
GET http://localhost:3000/logout
```
Isso redirecionará para o Keycloak e, em seguida, para a URL configurada no `redirect_uri`.

---