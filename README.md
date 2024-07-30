# Projeto E-Commerce - Desafio Técnico Natura&Co

Este repositório contém a solução para o desafio técnico da Natura&Co. O objetivo foi desenvolver uma plataforma de e-commerce inspirada no site da Natura, com um frontend moderno e uma API RESTful para gerenciar produtos e carrinho de compras.

## Funcionalidades

- **Listagem de Produtos:** Visualização de uma lista de produtos com suas respectivas informações.
- **Carrinho de Compras:** Adição de produtos ao carrinho e visualização do mesmo.
- **Busca de Produtos:** Funcionalidade para buscar produtos por nome, descrição e categoria.
- **Interface Responsiva:** Design adaptável para diferentes tamanhos de tela.

## Tecnologias Utilizadas

- **Frontend:** React com Material-UI
- **Backend:** Node.js com Express
- **Banco de Dados:** MySQL

- 🛠**Outras Tecnologias:**
- **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
- **[Jest](https://github.com/facebook/jest)**
- **[Dotenv](https://github.com/motdotla/dotenv)**
- **[Express](https://expressjs.com/)**
- **[Typeorm](https://github.com/typeorm/typeorm)**
- **[Celebrate](https://github.com/arb/celebrate)**
- **[Typescript](https://github.com/microsoft/TypeScript)**

## Instalação e Execução

### Clonar o Repositório

```bash
$ cd "diretorio de sua preferencia"
$ git clone https://github.com/soraia-aparecida/api-natura.git
$ cd api-natura
$ touch .env
$ npm install
$ npm run dev
```

### Teste
Para rodar os testes, utilize o comando abaixo:
```bash
$ npm run test
```

### Migrations
Para rodar as migrations, utilize o comando abaixo:
```bash
$ npm run typeorm migration:run
```
