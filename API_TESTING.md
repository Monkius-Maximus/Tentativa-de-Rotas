# API Testing Guide

This guide provides examples for testing the SGMP API endpoints.

## Prerequisites

1. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Testing Endpoints

### Health Check
```bash
curl http://localhost:3000/
```

### Unidades (Apartments/Units)

#### Get all units
```bash
curl http://localhost:3000/api/unidades
```

#### Get unit by ID
```bash
curl http://localhost:3000/api/unidades/1
```

#### Create a new unit
```bash
curl -X POST http://localhost:3000/api/unidades \
  -H "Content-Type: application/json" \
  -d '{
    "bloco": 1,
    "numero_ap": 103,
    "andar": 1,
    "metragem": 75.5,
    "vaga_garagem": 1
  }'
```

#### Update a unit
```bash
curl -X PUT http://localhost:3000/api/unidades/1 \
  -H "Content-Type: application/json" \
  -d '{
    "bloco": 1,
    "numero_ap": 101,
    "andar": 1,
    "metragem": 80.0,
    "vaga_garagem": 2
  }'
```

#### Delete a unit
```bash
curl -X DELETE http://localhost:3000/api/unidades/1
```

### Áreas Comuns (Common Areas)

#### Get all common areas
```bash
curl http://localhost:3000/api/areas-comuns
```

#### Create a new common area
```bash
curl -X POST http://localhost:3000/api/areas-comuns \
  -H "Content-Type: application/json" \
  -d '{
    "nome_area": "Sauna",
    "capacidade_max": 10
  }'
```

### Usuários (Users)

#### Get all users
```bash
curl http://localhost:3000/api/usuarios
```

#### Get user by CPF
```bash
curl http://localhost:3000/api/usuarios/11111111111
```

#### Create a new user
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "12345678901",
    "prim_nome": "João",
    "segun_nome": "Silva",
    "terce_nome": "Santos",
    "telefone": "81999999999",
    "email": "joao.silva@example.com"
  }'
```

### Moradores (Residents)

#### Get all residents
```bash
curl http://localhost:3000/api/moradores
```

#### Create a new resident
```bash
curl -X POST http://localhost:3000/api/moradores \
  -H "Content-Type: application/json" \
  -d '{
    "cpf_morador": "12345678901",
    "respons_familiar": true,
    "propriet_imovel": true,
    "id_unidade": 1
  }'
```

### Ordens de Serviço (Service Orders)

#### Get all service orders
```bash
curl http://localhost:3000/api/ordens-servico
```

#### Get service order by ID
```bash
curl http://localhost:3000/api/ordens-servico/1
```

#### Create a new service order
```bash
curl -X POST http://localhost:3000/api/ordens-servico \
  -H "Content-Type: application/json" \
  -d '{
    "data_abertura": "2024-11-22",
    "situacao": "Pendente",
    "descricao_prob": "Torneira vazando no banheiro",
    "cpf_morador": "11111111111",
    "cpf_sindico": "11111111111"
  }'
```

#### Update service order status
```bash
curl -X PUT http://localhost:3000/api/ordens-servico/1 \
  -H "Content-Type: application/json" \
  -d '{
    "situacao": "Em andamento",
    "data_conclusao": null
  }'
```

### Reservas (Reservations)

#### Get all reservations
```bash
curl http://localhost:3000/api/reservas
```

#### Create a new reservation
```bash
curl -X POST http://localhost:3000/api/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "id_area": 1,
    "cpf_morador": "11111111111",
    "data_reserva": "2024-12-01",
    "hora_reserva": "2024-12-01T14:00:00",
    "situacao": "PENDENTE"
  }'
```

#### Update reservation status
```bash
curl -X PUT http://localhost:3000/api/reservas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "situacao": "APROVADO"
  }'
```

### Funcionários (Employees)

#### Get all employees
```bash
curl http://localhost:3000/api/funcionarios
```

#### Get employee by CPF
```bash
curl http://localhost:3000/api/funcionarios/57294836011
```

### Síndicos (Condo Managers)

#### Get all condo managers
```bash
curl http://localhost:3000/api/sindicos
```

#### Create a new condo manager
```bash
curl -X POST http://localhost:3000/api/sindicos \
  -H "Content-Type: application/json" \
  -d '{
    "cpf_sindico": "11111111111",
    "inicio_mandato": "2025-01-01",
    "fim_mandato": "2025-12-31"
  }'
```

### Finanças (Finances)

#### Get all finance records
```bash
curl http://localhost:3000/api/financas
```

#### Create a new finance record
```bash
curl -X POST http://localhost:3000/api/financas \
  -H "Content-Type: application/json" \
  -d '{
    "cpf_sindico": "11111111111",
    "item_limpeza": "Desinfetante",
    "item_manutencao": "Pintura",
    "receita": 30000,
    "despesas": 10000,
    "impostos": 1500
  }'
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful GET, PUT requests
- `201 Created` - Successful POST requests
- `204 No Content` - Successful DELETE requests
- `400 Bad Request` - Invalid input (e.g., invalid ID format, invalid dates)
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors

## Notes

- All POST and PUT requests require `Content-Type: application/json` header
- Date fields should be in ISO 8601 format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`
- CPF fields should be 11 characters (numbers only)
- Numeric IDs are validated - non-numeric values will return 400 error
