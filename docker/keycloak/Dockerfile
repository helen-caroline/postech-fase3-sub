# Use a imagem oficial do Keycloak
FROM quay.io/keycloak/keycloak:latest

# Define o diretório de trabalho
WORKDIR /opt/keycloak

# Configura as credenciais do administrador
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

# Inicializa o Keycloak no modo de desenvolvimento
RUN /opt/keycloak/bin/kc.sh build

# Expõe a porta padrão do Keycloak
EXPOSE 8080

# Comando para iniciar o servidor
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev"]