#!/bin/sh

# Aguarda o banco de dados estar acessível
echo "Esperando o banco de dados (db:5432)..."

until nc -z db 5432; do
  echo "Banco ainda não está pronto. Aguardando..."
  sleep 2
done

echo "Banco de dados está pronto. Iniciando o servidor NestJS..."

npm run start:dev
