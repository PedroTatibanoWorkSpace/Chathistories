# Chathistories


## Principais Requisitos Atendidos

- **Framework:** NestJS (estrutura modular, escalável e testável)
- **Banco de Dados:** PostgreSQL + TimescaleDB (Hypertable para mensagens, escolhido por sua alta performance em grandes volumes e consultas temporais)
- **Autenticação:** API Key global (header `x-api-key`) e integração via cookie com ChatGuru
- **Modelagem:** Todas entidades relevantes (contas, usuários, telefones, chats, mensagens, delegações, tags, funnel steps) com migrations e relacionamentos
- **Algoritmo de Catalogação:** Batches concorrentes, controle de erros, estatísticas de tempo, timezone tratado com Luxon
- **Catalogação em Tempo Real:** Polling a cada 5 segundos, busca apenas mensagens novas, evita duplicidade, insere em batches
- **Consulta Paginável:** Endpoints para consulta de histórico por telefone, paginado
- **Segurança:** Guard global de API Key, variáveis de ambiente para credenciais
- **Docker:** Deploy facilitado, pronto para Ubuntu
- **Registro de Tempo:** Estatísticas de execução registradas em prompt, poderia escalar para um grafna ou prometheus

---

## Arquitetura

- **Modularização:** Cada entidade (users, phones, chats, messages, etc.) possui seu próprio módulo, DTOs, use cases, repositórios e mapeadores.
- **Arquitetura Hexagonal:** Separação clara entre domínio, aplicação e infraestrutura, facilitando testes, manutenção e integração com futuras features
- **Banco de Dados:**  
  - **PostgreSQL**: robusto, confiável, amplamente utilizado.
  - **TimescaleDB**: extensão para dados temporais, cria hypertables para mensagens a cada 7 dias, garantindo performance e escalabilidade.
- **Agendamento:** Polling de mensagens em tempo real usando `@nestjs/schedule` (cron a cada 5 segundos).
- **Segurança:** Guard global de API Key;
- **Docker:** Compose para banco e app.

---

## Como Rodar o Projeto


### 2. Configure o arquivo de variáveis de ambiente

Crie o arquivo `.env.development` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=chathistories_user
DB_PASSWORD=ch4th1st0r13s_p4ssw0rd
DB_DATABASE=chathistories_db

API_KEY=seu_api_key_aqui

CHATGURU_URL=https://s20.chatguru.app
CHATGURU_EMAIL=seu_email_chatguru
CHATGURU_PASSWORD=sua_senha_chatguru
CHATGURU_COOKIE=<cookie_do_painel_chatguru>

APP_ENV=development
APP_PORT=3000
TZ=America/Sao_Paulo
```

> **Atenção:**  
> - O valor de `CHATGURU_COOKIE` deve ser obtido diretamente do painel do ChatGuru, após login.
> - O valor de `API_KEY` será utilizado no header `x-api-key` para autenticação nas requisições à API.

### 3. Suba o banco e o serviço via Docker

```bash
docker-compose up -d
```

### 4. Instale as dependências

```bash
yarn install
```

### 5. Rode o serviço em modo desenvolvimento

```bash
yarn start:dev
```

---

## Endpoints Principais

### 1. Catalogar histórico completo

Inicia a catalogação de todos os chats e mensagens do passado.

```bash
curl -X POST http://localhost:3000/catalog-history -H "x-api-key: seu_api_key_aqui"
```

### 2. Catalogação em tempo real (Polling)

Habilite/desabilite o polling de mensagens novas:

```bash
# Habilitar polling
curl -X POST http://localhost:3000/catalog-live-messages/enable-cron -H "x-api-key: seu_api_key_aqui"

# Desabilitar polling
curl -X POST http://localhost:3000/catalog-live-messages/disable-cron -H "x-api-key: seu_api_key_aqui"

# Verificar status do polling
curl -X GET http://localhost:3000/catalog-live-messages/cron-status -H "x-api-key: seu_api_key_aqui"
```

### 3. Consulta paginável de mensagens por telefone

```bash
curl -X GET "http://localhost:3000/messages?phone=5511999999999&limit=50&page=1" -H "x-api-key: seu_api_key_aqui"
```

---

## Estrutura dos Módulos

- **accounts/**: Gerenciamento de contas
- **users/**: Usuários do sistema
- **phones/**: Telefones vinculados
- **chats/**: Chats do WhatsApp
- **messages/**: Mensagens (Hypertable TimescaleDB)
- **chat-tags/**: Tags dos chats
- **chat-funnel-steps/**: Etapas do funil de atendimento
- **chat-delegation/**: Delegações de chats para agentes
- **chat-cataloger/**: Use cases de catalogação, integração com ChatGuru

---

## Segurança

- **API Key:** Todas as rotas protegidas por guard global.  
  Envie sempre o header `x-api-key` nas requisições.
- **Variáveis de ambiente:** Nunca exponha credenciais no código.
- **Pronto para expansão:** Fácil adicionar JWT, rate limiting, CORS, etc.

---

## Banco de Dados

- **PostgreSQL:**  
  - Confiável, escalável, fácil de administrar.
- **TimescaleDB:**  
  - Hypertable para mensagens, ideal para grandes volumes e consultas temporais.
  - Migrations criam índices e relacionamentos para máxima performance.

---

## Instalação em Servidor Ubuntu

1. Instale Docker e Docker Compose.
2. Configure o `.env.development` conforme exemplo.
3. Execute:

```bash
docker-compose up -d
```

---

## Monitoramento e Estatísticas

- O tempo total de execução da catalogação é registrado.
- Logs detalhados de erros e execuções.
- Pronto para integração com Prometheus/Grafana.

---

## Observações Técnicas

- **Autenticação via cookie:** O microserviço simula requisições do frontend do ChatGuru, usando cookies para autenticação.
- **Timezone:** Todas as datas são tratadas com Luxon, garantindo integridade temporal.
- **Escalabilidade:** Estrutura pronta para horizontalização e alta concorrência.
