# Library React-Django Application

## Este projeto é uma aplicação para gerenciamento de livros, utilizando Django no backend e React no frontend.

**Pré-requisitos**

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

### Node.js

### Python 3.x

### Git

### PostgreSQL (ou um banco de dados compatível)

## Como Executar a Aplicação

### 1. Clonar o Repositório

git clone https://github.com/Paladinisoares/Library-React-Django.git
cd Library-React-Django

### 2. Configuração do Backend (Django)

Criar e ativar um ambiente virtual (opcional, mas recomendado)

python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate

Instalar dependências

pip install -r backend/requirements.txt

Configurar o banco de dados

Atualize as configurações do banco de dados no arquivo backend/settings.py conforme necessário.

Crie as tabelas no banco de dados:

python backend/manage.py migrate

Criar superusuário (opcional)

python backend/manage.py createsuperuser

Rodar o servidor Django

python backend/manage.py runserver

O backend estará acessível em: http://localhost:8000

### 3. Configuração do Frontend (React)

Instalar dependências

cd frontend
npm install

Rodar o servidor React

npm start

O frontend estará acessível em: http://localhost:3000

Testando a Aplicação

Acesse http://localhost:3000 e interaja com a interface para buscar e cadastrar livros.

O backend (API) estará acessível em http://localhost:8000 e pode ser testado usando ferramentas como Postman ou Curl.
