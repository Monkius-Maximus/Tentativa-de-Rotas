# Backend API - SGMP (Sistema Geral de Manutenção Predial)

API RESTful para o Sistema Geral de Manutenção Predial, desenvolvida com Node.js, Express, TypeScript e Prisma ORM.

## 📋 Sobre o Projeto

Este backend fornece endpoints para comunicação com o banco de dados do SGMP, permitindo a gestão completa de:
- Unidades (apartamentos)
- Áreas comuns
- Usuários
- Moradores
- Funcionários (internos e externos)
- Síndicos
- Finanças
- Ordens de serviço
- Reservas de áreas comuns

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Superset JavaScript com tipagem
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Monkius-Maximus/Tentativa-de-Rotas.git
cd Tentativa-de-Rotas
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do banco de dados:
```
DATABASE_URL="postgresql://user:password@localhost:5432/sgmp_db?schema=public"
PORT=3000
NODE_ENV=development
```

4. Gere o cliente Prisma:
```bash
npm run prisma:generate
```

5. Execute as migrações do banco de dados (se necessário):
```bash
npm run prisma:migrate
```

## 🚀 Como Usar

### Modo Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
npm start
```

### Visualizar Banco de Dados (Prisma Studio)
```bash
npm run prisma:studio
```

## 📍 Endpoints da API

A API estará disponível em `http://localhost:3000`

### Unidades
- `GET /api/unidades` - Listar todas as unidades
- `GET /api/unidades/:id` - Buscar unidade por ID
- `POST /api/unidades` - Criar nova unidade
- `PUT /api/unidades/:id` - Atualizar unidade
- `DELETE /api/unidades/:id` - Deletar unidade

### Áreas Comuns
- `GET /api/areas-comuns` - Listar todas as áreas comuns
- `GET /api/areas-comuns/:id` - Buscar área comum por ID
- `POST /api/areas-comuns` - Criar nova área comum
- `PUT /api/areas-comuns/:id` - Atualizar área comum
- `DELETE /api/areas-comuns/:id` - Deletar área comum

### Usuários
- `GET /api/usuarios` - Listar todos os usuários
- `GET /api/usuarios/:cpf` - Buscar usuário por CPF
- `POST /api/usuarios` - Criar novo usuário
- `PUT /api/usuarios/:cpf` - Atualizar usuário
- `DELETE /api/usuarios/:cpf` - Deletar usuário

### Moradores
- `GET /api/moradores` - Listar todos os moradores
- `GET /api/moradores/:cpf` - Buscar morador por CPF
- `POST /api/moradores` - Criar novo morador
- `PUT /api/moradores/:cpf` - Atualizar morador
- `DELETE /api/moradores/:cpf` - Deletar morador

### Funcionários
- `GET /api/funcionarios` - Listar todos os funcionários
- `GET /api/funcionarios/:cpf` - Buscar funcionário por CPF
- `POST /api/funcionarios` - Criar novo funcionário
- `PUT /api/funcionarios/:cpf` - Atualizar funcionário
- `DELETE /api/funcionarios/:cpf` - Deletar funcionário

### Síndicos
- `GET /api/sindicos` - Listar todos os síndicos
- `GET /api/sindicos/:cpf` - Buscar síndico por CPF
- `POST /api/sindicos` - Criar novo síndico
- `PUT /api/sindicos/:cpf` - Atualizar síndico
- `DELETE /api/sindicos/:cpf` - Deletar síndico

### Finanças
- `GET /api/financas` - Listar todas as finanças
- `GET /api/financas/:id` - Buscar finança por ID
- `POST /api/financas` - Criar nova finança
- `PUT /api/financas/:id` - Atualizar finança
- `DELETE /api/financas/:id` - Deletar finança

### Ordens de Serviço
- `GET /api/ordens-servico` - Listar todas as ordens de serviço
- `GET /api/ordens-servico/:id` - Buscar ordem de serviço por ID
- `POST /api/ordens-servico` - Criar nova ordem de serviço
- `PUT /api/ordens-servico/:id` - Atualizar ordem de serviço
- `DELETE /api/ordens-servico/:id` - Deletar ordem de serviço

### Reservas
- `GET /api/reservas` - Listar todas as reservas
- `GET /api/reservas/:id` - Buscar reserva por ID
- `POST /api/reservas` - Criar nova reserva
- `PUT /api/reservas/:id` - Atualizar reserva
- `DELETE /api/reservas/:id` - Deletar reserva

## 📝 Exemplos de Uso

### Criar uma Unidade
```bash
curl -X POST http://localhost:3000/api/unidades \
  -H "Content-Type: application/json" \
  -d '{
    "bloco": 1,
    "numero_ap": 101,
    "andar": 1,
    "metragem": 72.5,
    "vaga_garagem": 1
  }'
```

### Criar uma Ordem de Serviço
```bash
curl -X POST http://localhost:3000/api/ordens-servico \
  -H "Content-Type: application/json" \
  -d '{
    "data_abertura": "2024-11-22",
    "situacao": "Pendente",
    "descricao_prob": "Vazamento no banheiro",
    "cpf_morador": "11111111111",
    "cpf_sindico": "11111111111"
  }'
```

### Criar uma Reserva
```bash
curl -X POST http://localhost:3000/api/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "id_area": 1,
    "cpf_morador": "11111111111",
    "data_reserva": "2024-12-01",
    "hora_reserva": "2024-12-01T10:00:00",
    "situacao": "PENDENTE"
  }'
```

## 🗄️ Estrutura do Projeto

```
.
├── prisma/
│   └── schema.prisma          # Schema do Prisma (models do banco de dados)
├── src/
│   ├── controllers/           # Controladores das rotas
│   │   ├── unidadeController.ts
│   │   ├── areaComumController.ts
│   │   ├── usuarioController.ts
│   │   ├── moradorController.ts
│   │   ├── funcionarioController.ts
│   │   ├── sindicoController.ts
│   │   ├── financasController.ts
│   │   ├── ordemServicoController.ts
│   │   └── reservaController.ts
│   ├── routes/                # Definição das rotas
│   │   ├── unidadeRoutes.ts
│   │   ├── areaComumRoutes.ts
│   │   ├── usuarioRoutes.ts
│   │   ├── moradorRoutes.ts
│   │   ├── funcionarioRoutes.ts
│   │   ├── sindicoRoutes.ts
│   │   ├── financasRoutes.ts
│   │   ├── ordemServicoRoutes.ts
│   │   └── reservaRoutes.ts
│   ├── prisma.ts              # Configuração do cliente Prisma
│   └── server.ts              # Servidor principal
├── .env.example               # Exemplo de variáveis de ambiente
├── .gitignore                 # Arquivos ignorados pelo Git
├── package.json               # Dependências do projeto
├── tsconfig.json              # Configuração do TypeScript
└── README.md                  # Este arquivo
```

## 🔗 Repositórios Relacionados

- [Banco de Dados SGMP](https://github.com/brunoramossilva/sgmp-db.git)
- [Backend API SGMP](https://github.com/brunoramossilva/sgmp-api.git)

## 📄 Licença

Este projeto é de uso educacional e interno, desenvolvido como parte de disciplina acadêmica.

## 👥 Equipe

| Nome | Função | Contato |
|------|--------|---------|
| Lucas Cabral | Desenvolvedor | lsc9@cin.ufpe.br |
| Flávia Vitória | Desenvolvedora | fves@cin.ufpe.br |
| Gryghor Camonni | Desenvolvedor | gefc@cin.ufpe.br |
| Ágata Giovanna | Desenvolvedora | agma@cin.ufpe.br |
| Bruno Ramos | Desenvolvedor | bgprs@cin.ufpe.br |
| Diogo Rodrigues | Desenvolvedor | dsr@cin.ufpe.br |