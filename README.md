## Account Management

Esse projeto é responsável pelo gerenciamento de contas bancárias.

## Gettings Started

É necessário ter o docker instalado na máquina:
`Docker: 18.06.0+`
`Docker-compose: 1.27.0+`

Para iniciar o sistema, execute o comando: `make init`.
Ele vai criar uma cópia do `.env` baseado no `.env.example`

```bash
# Devido o mapeamento do .env no docker, qualquer mudança no .env, só vai ser
# compartilhada com o container, se executar o `make up`
```

O comando `make up` vai subir os containers da aplicação.

## Docs

É necessário ter o postman na versão que suporte as `Collections 2.1+`.

Dentro do `/docs` está a collection da API, junto com o environments do projeto.
Basta importar os dois arquivos no postman.

## Cobertura de testes
Para executar os testes unitários: `npm run test:unit`
Para executar os testes e2e: `npm run test:e2e`
Para executar a cobertura: `npm run test:cov`

[](./docs/converage.png)
