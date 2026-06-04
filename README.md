
## BACK-END
Iniciando o Back-End
## Descrição

Repositório base do framework [Nest](https://github.com/nestjs/nest) com TypeScript — Marketplace de Informática.

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Variáveis de ambiente

Crie o arquivo `back/.env` com base no exemplo abaixo:

```env
DATABASE_URL="file:./dev.db"

JWT_SECRET=sua-chave-secreta-longa-e-segura

REDIS_HOST=localhost
REDIS_PORT=6379
```

> Para gerar um `JWT_SECRET` seguro, execute:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

## Redis (Docker)

O projeto utiliza Redis para armazenar sessões JWT. Inicie o container antes de rodar a aplicação:

```bash
# Iniciar o Redis
docker run -d --name redis-marketplace -p 6379:6379 redis:alpine

# Parar o Redis
docker stop redis-marketplace

# Iniciar novamente (após parar)
docker start redis-marketplace

# Ver logs
docker logs redis-marketplace

# Acessar o Redis CLI
docker exec -it redis-marketplace redis-cli
```

## Instalação

```bash
$ npm install
```

## Rodando o projeto

```bash
# modo desenvolvimento
$ npm run start

# modo watch (reinicia automaticamente ao salvar)
$ npm run start:dev

# modo produção
$ npm run start:prod
```

## Documentação da API (Swagger)

Com o servidor rodando, acesse a documentação interativa em:

```
http://localhost:3000/swagger
```

A documentação lista todos os endpoints organizados por módulo:

| Módulo | Tag | Descrição |
|--------|-----|-----------|
| Autenticação | `Auth` | Login e logout |
| Usuários | `Users` | Cadastro e gerenciamento de usuários |
| Categorias | `Category` | CRUD de categorias |
| Produtos | `Product` | CRUD de produtos |
| Carrinho | `Carrinho` | Gerenciar carrinho de compras |
| Pedido | `Pedido` | Finalizar compra e consultar pedidos |

### Como testar rotas protegidas no Swagger

1. Faça login em `POST /auth/login` com seu e-mail e senha
2. Copie o `access_token` retornado
3. Clique no botão **Authorize** (cadeado) no topo da página
4. Cole o token no campo e clique em **Authorize**
5. Agora todas as requisições incluirão o token automaticamente

> Rotas públicas (não precisam de token): `POST /users`, `GET /product`, `GET /product/search/:titulo`, `GET /category`, `GET /category/search/:nome`, `POST /auth/login`

## FRONT-END
Iniciando o Front-End

