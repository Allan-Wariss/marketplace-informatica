<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Um framework <a href="http://nodejs.org" target="_blank">Node.js</a> progressivo para construir aplicações server-side eficientes e escaláveis.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="Versão NPM" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Licença" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="Downloads NPM" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Apoiadores no Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Patrocinadores no Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Doe" /></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Apoie-nos"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Siga-nos no Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

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
| Produtos | `Product` | CRUD de produtos |... Etc

### Como testar rotas protegidas no Swagger

1. Faça login em `POST /auth/login` com seu e-mail e senha
2. Copie o `access_token` retornado
3. Clique no botão **Authorize** (cadeado) no topo da página
4. Cole o token no campo e clique em **Authorize**
5. Agora todas as requisições incluirão o token automaticamente

> Rotas públicas (não precisam de token): `POST /users`, `GET /product`, `GET /product/search/:titulo`, `GET /category`, `GET /category/search/:nome`, `POST /auth/login`



## Testes

```bash
# testes unitários
$ npm run test

# testes e2e
$ npm run test:e2e

# cobertura de testes
$ npm run test:cov
```

## Deploy

Quando estiver pronto para fazer o deploy da aplicação NestJS em produção, confira a [documentação de deploy](https://docs.nestjs.com/deployment) para mais informações.

Se estiver buscando uma plataforma em nuvem, confira o [Mau](https://mau.nestjs.com), a plataforma oficial para deploy de aplicações NestJS na AWS:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

## Recursos úteis

- [Documentação do NestJS](https://docs.nestjs.com)
- [Canal do Discord](https://discord.gg/G7Qnnhy) para dúvidas e suporte
- [Cursos oficiais](https://courses.nestjs.com/) para aprofundamento
- [NestJS Mau](https://mau.nestjs.com) para deploy na AWS
- [NestJS Devtools](https://devtools.nestjs.com) para visualizar o grafo da aplicação em tempo real
- [Suporte empresarial](https://enterprise.nestjs.com) para projetos que precisam de apoio dedicado
- [X (Twitter)](https://x.com/nestframework) e [LinkedIn](https://linkedin.com/company/nestjs) para novidades
- [Vagas de emprego](https://jobs.nestjs.com) relacionadas ao NestJS

## Suporte

O Nest é um projeto open source licenciado sob MIT. Ele cresce graças aos patrocinadores e apoiadores. Se quiser contribuir, [leia mais aqui](https://docs.nestjs.com/support).

## Contato

- Autor — [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Site — [https://nestjs.com](https://nestjs.com/)
- Twitter — [@nestframework](https://twitter.com/nestframework)

## Licença

Nest é licenciado sob [MIT](https://github.com/nestjs/nest/blob/master/LICENSE).
