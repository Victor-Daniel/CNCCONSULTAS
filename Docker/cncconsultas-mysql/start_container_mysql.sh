#!/bin/bash

# Caminho do projeto MySQL
MYSQL_PATH="/home/daniel/Projetos/CNCCONSULTAS/Docker/mysql"

# Nome da rede
NETWORK_NAME="CNCCONSULTAS"

echo "🔍 Verificando se a rede $NETWORK_NAME já existe..."
if ! docker network ls | grep -q "$NETWORK_NAME"; then
  echo "🌐 Criando rede $NETWORK_NAME..."
  docker network create $NETWORK_NAME
else
  echo "✅ Rede $NETWORK_NAME já existe."
fi

echo "🐬 Subindo container MySQL..."
cd $MYSQL_PATH
docker compose up -d --build

echo "✅ MySQL rodando na porta 3306 (rede interna: $NETWORK_NAME)"