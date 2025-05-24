# postech-fase3-sub
Trabalho fase 3 , substitutiva

## Keycloak
Esta API utiliza o Keycloak para gerenciar autenticação e autorização. Para acessar as rotas protegidas, você precisa obter um token de acesso (Access Token) e incluí-lo no cabeçalho Authorization das requisições.

### Configuração do Keycloak
URL do Keycloak: Certifique-se de que o Keycloak está rodando em http://localhost:8080.
```
Realm: postech-fase3
Client: api-compradores
Client Secret: Configurado no Keycloak (veja no painel administrativo do cliente).
```

### Como Obter o Token de Acesso
1. Faça uma requisição POST para o endpoint de token do Keycloak:
```POST http://localhost:8080/realms/postech-fase3/protocol/openid-connect/token```

2. Envie os seguintes parâmetros no corpo da requisição (formato x-www-form-urlencoded):
```
grant_type: password
client_id: api-compradores
client_secret: O segredo do cliente configurado no Keycloak.
username: O nome de usuário registrado no Keycloak.
password: A senha do usuário.
```

Exemplo de requisição com curl:
```
curl -X POST http://localhost:8080/realms/postech-fase3/protocol/openid-connect/token \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=password" \
-d "client_id=api-compradores" \
-d "client_secret=SEU_CLIENT_SECRET" \
-d "username=usuario_teste" \
-d "password=senha_teste"
```

3. A resposta será como:
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 300,
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    ...
}
```

4. Copie o valor do campo access_token.

### Como Usar o Token de Acesso
Inclua o token de acesso no cabeçalho Authorization das requisições para rotas protegidas. O formato deve ser:
```Authorization: Bearer SEU_ACCESS_TOKEN```

Exemplo de requisição com curl:
```
curl -X GET http://localhost:3000/veiculos/viewer \
-H "Authorization: Bearer SEU_ACCESS_TOKEN"
```

## Rotas Protegidas
As seguintes rotas requerem autenticação com o token de acesso:
- Veículos
```
GET /veiculos/viewer
GET /veiculos/available
GET /veiculos/sold
POST /veiculos/create
PUT /veiculos/update/:id
```

- Vendas
```
GET /vendas/viewer
POST /vendas/create
POST /vendas/buy
```

- Usuarios
```
GET /usuarios/viewer
POST /usuarios/create
```

### Logout
Para realizar o logout, acesse a rota: 

```GET http://localhost:3000/logout```

Isso redirecionará para o Keycloak e, em seguida, para a URL configurada no redirect_uri.

-----------------------------------------------------------------------------------------------------

## Como Utilizar as rotas existentes da API

### Veiculos
1. Listar todos os veículos cadastrados

  Rota: ```GET /veiculos/viewer```

  Exemplo de uso:

  ```curl -X GET http://localhost:3000/veiculos/viewer```

2. Listar todos os veículos disponíveis
Rota: GET /veiculos/available
Exemplo de uso:
```curl -X GET http://localhost:3000/veiculos/available```

3. Listar todos os veículos vendidos
Rota: GET /veiculos/sold
Exemplo de uso:
```curl -X GET http://localhost:3000/veiculos/sold```

4. Cadastrar um veículo
Rota: POST /veiculos/create
Corpo da requisição (JSON):
```
{
  "marca": "Toyota",
  "modelo": "Corolla",
  "ano": 2023,
  "cor": "Branco",
  "preco": 120000
}
```
Exemplo de uso:
```curl -X POST http://localhost:3000/veiculos/create -H "Content-Type: application/json" -d '{"marca":"Toyota","modelo":"Corolla","ano":2023,"cor":"Branco","preco":120000}'```

5. Editar um veículo pelo ID
Rota: PUT /veiculos/update/:id
Parâmetro de rota: :id (ID do veículo a ser atualizado)
Corpo da requisição (JSON):
{
  "modelo": "Novo Modelo"
}
Exemplo de uso:
curl -X PUT http://localhost:3000/veiculos/update/1 -H "Content-Type: application/json" -d '{"modelo":"Novo Modelo"}'

### Vendas
1. Listar todas as vendas
Rota: GET /vendas/viewer
Exemplo de uso:
curl -X GET http://localhost:3000/vendas/viewer

2. Registra uma venda
Rota: POST /vendas/create
Corpo da requisição (JSON):
{
  "veiculoId": 1,
  "usuarioId": "2"
}
Exemplo de uso:
curl -X POST http://localhost:3000/vendas/create \
-H "Content-Type: application/json" \
-d '{"veiculoId": 1, "usuarioId": 2}'


3. Comprar um veículo
Rota: POST /vendas/buy
Corpo da requisição (JSON):
{
  "veiculoId": 1,
  "usuarioId": "2"
}
Exemplo de uso:
curl -X POST http://localhost:3000/vendas/buy \
-H "Content-Type: application/json" \
-d '{"veiculoId": 1, "usuarioId": 2}'

OBS: Quando uma compra é veita através dessa rota, 
um registro de venda é feito automaticamente acionando a rota vendas/create.

Voce pode encontrar o metodo correspondente em no caminho relativo abaixo
src\controllers\vendas\controller.js

### Usuarios
1. Listar todos os usuários cadastrados
Rota: GET /usuarios/viewer
Exemplo de uso:
curl -X GET http://localhost:3000/usuarios/viewer

2. Cadastrar um usuário
Rota: POST /usuarios/create
Corpo da requisição (JSON):
{
  "nome": "João Silva",
  "email": "joao.silva@email.com"
}
Exemplo de uso:
curl -X POST http://localhost:3000/usuarios/create -H "Content-Type: application/json" -d '{"nome":"João Silva","email":"joao.silva@email.com"}'