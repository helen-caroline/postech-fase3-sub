## Runner

É necessario a configuração do runner no github para o funcionamento do deploy
o runner deve ficar configurado no mesmo servidor da aplicação.

comandos necessarios para permitir a instalação e configuração do runner:
``
apt-get install update -y
apt upgrade -y
apt-get install -y curl vim perl
``
- comandos github para instalação do runner
``
mkdir actions-runner && cd actions-runner &&
curl -o actions-runner-linux-x64-2.324.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.324.0/actions-runner-linux-x64-2.324.0.tar.gz
echo "TOKEN  actions-runner-linux-x64-2.324.0.tar.gz" | shasum -a 256 -c
tar xzf ./app/actions-runner-linux-x64-2.324.0.tar.gz
``
- adicionando um usuario para conseguir rodar as configurações sem modo administrador no container pré iniciado pelo docker compose
``
useradd -m github-runner
chown -R github-runner:github-runner /app/actions-runner
``
- instalação de dependencias do config.sh
``
./bin/installdependencies.sh
``

``
su - github-runner -c 'cd /app/actions-runner && ./config.sh --url https://github.com/USER/postech-fase3-sub --token OUTRO_TOKEN'

America: ``2``
Sao_paulo: ``136``
``
``
su - github-runner -c 'cd /app/actions-runner && ./run.sh'
``
Se tudo der certo voce recebera algo como:
√ Connected to GitHub
Current runner version: '2.324.0'
2025-05-30 20:20:38Z: Listening for Jobs

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


# API

