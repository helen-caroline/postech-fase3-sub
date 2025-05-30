##

## keycloak

Ao acessar o dashboard de primeira vez utilize a senha admin para o usuario admin depois importe os arquivos na pasta keycloak na raiz do projeto.
- keycloak\import
    realm: keycloak\import\realm-export.json
    client: keycloak\import\api-veiculos.json

Para importar o realm voce precisar seguir o seguintes passos:
1. Manage realms
2. Create realm
3. Browser > selecione o arquivo: realm-export.json
5. clique em Create no botão inferior.

Configure o Realm:
1. em `Realm Settings` na aba superior clique em `Login`
2. em `Email settings` certifique-se que as opções estão habilitadas:
    Email as username = On
    Login with email = On

Para importar o client voce precisar seguir o seguintes passos:
1. Clients
2. ao lado de create client clique em import client
3. Browser > selecione o arquivo: api-veiculos.json
4. clique em Save no botão inferior.

OBS: em credentials voce pode encontrar o client secret onde vai usar o valor para configurar seu .env

Para iniciar com os testes vamos criar o usuario valid_ser, siga os passos abaixo dentro do Keycloak
1. Users
2. Create new user
propriedades [propriedades marcadas com * são obrigatorias]: 
    A. Email verified: Habilitado
    B. * Username: valid_user
    C. email: valid_user@email.com
    D. First Name: Valid
    E. Last Name: User

3. clique em Create no botao inferior
4. após criar o usuario vá para `credentials` e clique em `Set Password` defina a senha do usuario
    A. Set password for valid_user
    password: `admin321`
    confirme a senha.
    B. desabilite o Temporary: para senha temporaria.

5. !Importante! ao consluir as etapas acima voce precisa definir as roles do seu Client : api-veiculos
    A. va para clientes e clique no cliente criado: api-veiculos
    B. selecione na aba superior o Service accounts roles
    C. clique em Assign roles e defina a quantidade de itens por paginas para 100
    D. marque a caixa de seleção para todos os tipos de roles e clique em Assign: personalize conforme o necessario.
        Roles obrigarias:
            - relm-management: manage-realm
            - relm-management: manage-users
            - relm-management: create-client

6. Após os passo acima as rotas da API estão habilitadas para o uso em conexão com o keycloak
    
