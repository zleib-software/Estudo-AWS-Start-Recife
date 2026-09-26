# AWS Simulado — Backend API

API monolítica Node.js + Express + MongoDB para o simulado AWS Cloud Practitioner (CLF-C02).

## Pré-requisitos

- **Node.js** ≥ 18
- **MongoDB** rodando localmente ou URI de um Atlas (M0 gratuito funciona)

## Setup rápido

```bash
cd backend
npm install

# Copie e edite o .env
cp .env.example .env
# Edite MONGODB_URI, API_KEY, etc.

# Popule o banco com as 26 questões iniciais
npm run seed

# Inicie em modo desenvolvimento (auto-reload)
npm run dev
```

O servidor sobe em `http://localhost:3001` por padrão.

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|---|:---:|---|
| `MONGODB_URI` | Sim | URI de conexão MongoDB |
| `PORT` | Não | Porta do servidor (default: 3001) |
| `CORS_ORIGIN` | Sim | Origem(s) do front-end, separadas por vírgula |
| `API_KEY` | Sim | Chave para proteger rotas de escrita |
| `ANTHROPIC_API_KEY` | Não | Necessária apenas para importação de PDF via LLM |

## Endpoints

### Públicos (leitura)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/api/domains` | Metadados dos 4 domínios CLF-C02 |
| GET | `/api/questions` | Lista questões. Query: `domainId`, `count` |
| GET | `/api/questions/:id` | Busca questão por ID |

### Protegidos (header `x-api-key`)

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/questions` | Criar questão |
| PUT | `/api/questions/:id` | Editar questão |
| DELETE | `/api/questions/:id` | Desativar questão (soft-delete) |
| POST | `/api/questions/import/preview` | Upload de PDF → preview das questões |
| POST | `/api/questions/import/confirm` | Confirmar e gravar lote de questões |

### Exemplos de uso

```bash
# Listar todas as questões
curl http://localhost:3001/api/questions

# 10 questões aleatórias do domínio 2
curl "http://localhost:3001/api/questions?domainId=2&count=10"

# Criar questão manualmente
curl -X POST http://localhost:3001/api/questions \
  -H "Content-Type: application/json" \
  -H "x-api-key: SUA_CHAVE" \
  -d '{"domainId":1,"question":"Enunciado aqui...","options":["A","B","C","D"],"answer":2,"explanation":"Porque..."}'

# Import PDF — passo 1: preview
curl -X POST http://localhost:3001/api/questions/import/preview \
  -H "x-api-key: SUA_CHAVE" \
  -F "file=@simulado.pdf"

# Import PDF — passo 2: confirmar
curl -X POST http://localhost:3001/api/questions/import/confirm \
  -H "Content-Type: application/json" \
  -H "x-api-key: SUA_CHAVE" \
  -d '{"questions":[...],"source":"simulado.pdf"}'
```

## Importação de PDF

O fluxo é em **duas etapas** para evitar sujar o banco com dados mal parseados:

1. **Preview** (`POST /api/questions/import/preview`): envia o PDF via multipart, o backend extrai o texto e tenta parsear com regex. Se o regex extrair menos de 3 questões, faz fallback automático para a LLM (Claude claude-haiku-4-5-20251001 via tool_use com schema estruturado).
2. **Confirm** (`POST /api/questions/import/confirm`): você revisa o JSON do preview, ajusta o que precisar, e envia de volta para gravação no banco.

## Estrutura de pastas

```
backend/
├── src/
│   ├── config/          # DB, env, domínios fixos
│   ├── controllers/     # Handlers de rota
│   ├── middlewares/      # Auth, validação, erros, upload
│   ├── models/          # Schema Mongoose
│   ├── routes/          # Definição de rotas Express
│   ├── schemas/         # Schemas Zod (validação)
│   ├── services/        # Lógica de negócio, PDF, parser
│   ├── scripts/         # Seed e dados iniciais
│   ├── app.js           # Configuração Express
│   └── server.js        # Entry point
├── .env.example
├── package.json
└── README.md
```
