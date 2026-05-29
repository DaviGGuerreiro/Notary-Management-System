# 🏛️ Cartório Digital - Sistema de Gestão

Sistema completo (Fullstack) para gestão de usuários e serviços de um cartório, permitindo o controle de status e o acompanhamento de requisições.

## ✨ Funcionalidades

* Cadastro, edição e remoção de usuários
* Controle de perfis (Administrador / Atendente)
* Senhas armazenadas com hash seguro via **bcryptjs**
* Cadastro e acompanhamento de serviços cartoriais
* Filtro de serviços por status e tipo
* Autenticação com redirecionamento de rotas

## 🛠️ Tecnologias e Bibliotecas Utilizadas

O projeto foi dividido em duas partes principais: Frontend (Interface) e Backend (API).

### Frontend
* **React** (Biblioteca principal de UI)
* **Vite** (Bundler e ambiente de desenvolvimento rápido)
* **TypeScript** (Tipagem estática para JavaScript)
* **React Router DOM** (Gerenciamento de rotas e navegação)
* **Axios** (Cliente HTTP para comunicação com a API)

### Backend
* **Node.js** com **Express** (Framework web para a API)
* **TypeScript** (Tipagem estática)
* **Prisma ORM** (Comunicação e modelagem do banco de dados)
* **CORS** (Controle de acesso à API)
* **bcryptjs** (Hash seguro de senhas)

---

## ⚙️ Como rodar o projeto localmente

### Pré-requisitos
**Ferramentas Locais:**
Certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [Git](https://git-scm.com/)
**Banco de Dados (Nuvem):**
* Conta no [Neon](https://neon.tech/): O projeto utiliza o **PostgreSQL** hospedado no Neon. Para rodar a aplicação, você precisará de uma conta gratuita para gerar uma string de conexão (`DATABASE_URL`) em segundos.

### 1. Clonando o Repositório
```bash
git clone https://github.com/DaviGGuerreiro/Notary-Management-System.git
cd Notary-Management-System
```

### 2. Configurando e Rodando o Backend (API)
Abra um terminal e navegue até a pasta do backend:
```bash
cd backend
```

Variáveis de Ambiente:
Crie um arquivo chamado .env na raiz da pasta backend usando o .env.example como base. Ele deve conter:
```bash
PORT=3000
DATABASE_URL="postgresql://usuario:senha@host.neon.tech/nomedobanco?sslmode=require"
```

Instalação e Execução:
```bash
# Instale as dependências
npm install

# Gere o cliente do Prisma e crie as tabelas do banco de dados
npx prisma generate
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

A API estará rodando em http://localhost:3000.

### 3. Rodando o Frontend (Interface)
Abra outro terminal e navegue até a pasta do frontend:
```bash
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível no seu navegador, geralmente no endereço http://localhost:5173.