# 🎨 School Canteen Frontend

Aplicação web para interação com a cantina escolar, permitindo que **alunos/responsáveis** realizem pedidos e que **administradores** gerenciem o sistema via dashboard.

---

## ⚙️ Tecnologias

- ⚛️ **React** — Biblioteca para construção de interfaces declarativas e reativas.
- ⚡ **Vite** — Empacotador ultrarrápido para desenvolvimento moderno.
- 🎨 **Tailwind CSS** — Utilitário de estilização altamente produtivo e responsivo.
- 🔮 **React Query** — Gerenciamento eficiente e escalável de estado assíncrono.
- 🧪 **Vitest** — Testes unitários rápidos e com excelente DX.
- 🌍 **React Router** — Navegação declarativa entre páginas.
- 🧹 **ESLint + Prettier** — Linting e formatação automática de código.
- 🔗 **Axios** — Cliente HTTP elegante para integração com a API.

---

## 💻 Requisitos Básicos

Antes de rodar o projeto, certifique-se de ter instalado na sua máquina:

- **Docker** (Gerenciador de containers)
- **Node.js** (versão 22 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

Você pode baixar e instalar:

- Node.js (inclui npm): https://nodejs.org/

---

## 📦 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/phsousadev/school-canteen-web.git
```

### 2. Criando o arquivo `.env`

Copie o conteúdo do arquivo `.env.local.example` para um novo arquivo `.env` na raiz do projeto, mantendo as mesmas configurações iniciais:

```bash
cp .env.example .env
```

### 3. Execute Docker 
```bash
docker compose up -d
```
