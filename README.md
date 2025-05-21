# postech-fase3-sub
Trabalho fase 3 , substitutiva

## Veiculos
1. Listar todos os veículos cadastrados
Rota: GET /veiculos/viewer
Exemplo de uso:
curl -X GET http://localhost:3000/veiculos/viewer

2. Listar todos os veículos disponíveis
Rota: GET /veiculos/available
Exemplo de uso:
curl -X GET http://localhost:3000/veiculos/available

3. Listar todos os veículos vendidos
Rota: GET /veiculos/sold
Exemplo de uso:
curl -X GET http://localhost:3000/veiculos/sold

4. Cadastrar um veículo
Rota: POST /veiculos/create
Corpo da requisição (JSON):
{
  "marca": "Toyota",
  "modelo": "Corolla",
  "ano": 2023,
  "cor": "Branco",
  "preco": 120000
}
Exemplo de uso:
curl -X POST http://localhost:3000/veiculos/create -H "Content-Type: application/json" -d '{"marca":"Toyota","modelo":"Corolla","ano":2023,"cor":"Branco","preco":120000}'

5. Editar um veículo pelo ID
Rota: PUT /veiculos/update/:id
Parâmetro de rota: :id (ID do veículo a ser atualizado)
Corpo da requisição (JSON):
{
  "modelo": "Novo Modelo"
}
Exemplo de uso:
curl -X PUT http://localhost:3000/veiculos/update/1 -H "Content-Type: application/json" -d '{"modelo":"Novo Modelo"}'

## Vendas
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

# Usuarios
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