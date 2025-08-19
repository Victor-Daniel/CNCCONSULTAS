#!/bin/bash

# Nome do serviço
CONTAINER_NAME="cncconsultas_web"

# Caminho do projeto no WSL
PROJECT_PATH="/home/daniel/Projetos/CNCCONSULTAS"

# Reconstruir a imagem
echo "Construindo a imagem Docker..."
docker-compose build

# Para e remove container antigo se existir
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Removendo container antigo..."
    docker rm -f $CONTAINER_NAME
fi

# Ajusta permissões no host (para evitar problemas com volumes bind)
echo "Ajustando permissões..."
sudo chown -R $USER:$USER $PROJECT_PATH
sudo chmod -R 777 $PROJECT_PATH

# Inicia container
echo "Iniciando container..."
docker-compose up -d

echo "Container iniciado com sucesso!"
echo "Projeto sincronizado em /var/www/html e configuração em /etc/cncconsultas-config"
echo "Acesse via http://localhost:80"