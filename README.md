## Como Executar o Projeto (Sem Docker)

Se você não conseguir utilizar o Docker, siga estas instruções para executar a aplicação manualmente.

### Pré-requisitos
* **Node.js e npm** instalados.
* **PostgreSQL** instalado e rodando localmente na sua máquina.

### Passos para Executar

1.  **Clone o Repositório**
    ```sh
    git clone [https://github.com/vhramoss/Node-Project.git](https://github.com/vhramoss/Node-Project.git)
    cd Node-Project
    ```

2.  **Configurar e Executar o Backend**
    * Certifique-se de que o seu serviço do PostgreSQL local está ativo.
    * Crie um banco de dados chamado `task-management`. Você pode fazer isso com um cliente como DBeaver ou PgAdmin, ou via linha de comando:
        ```sql
        CREATE DATABASE "task-management";
        ```
    * Navegue até a pasta `backend`:
        ```sh
        cd backend
        ```
    * Crie um arquivo `.env` na pasta `backend` e preencha-o com suas credenciais locais do PostgreSQL:
        ```
        # Exemplo de arquivo .env
        DB_TYPE=postgres
        DB_HOST=localhost
        DB_PORT=5432
        DB_USERNAME=seu_usuario_do_postgres
        DB_PASSWORD=sua_senha_do_postgres
        DB_DATABASE=task-management
        ```
    * Instale as dependências:
        ```sh
        npm install
        ```
    * Inicie o servidor de desenvolvimento:
        ```sh
        npm run start:dev
        ```
    O backend estará acessível em `http://localhost:3000`.

3.  **Configurar e Executar o Frontend**
    * Em um novo terminal, navegue até a pasta do frontend:
        ```sh
        cd ../frontend
        ```
    * Instale as dependências:
        ```sh
        npm install
        ```
    * Inicie o servidor de desenvolvimento:
        ```sh
        npm run dev
        ```
    O frontend estará acessível em `http://localhost:5173`.
