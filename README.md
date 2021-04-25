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

[Collection](./docs/Account Management.postman_collection.json)
[Environments](./docs/Account Management.postman_environment.json)

![Coverage](./docs/coverage.png)

## Heroku

Endpoint: https://account-management-dock.herokuapp.com/

É possível testar a collection do postman, com o endpoint do heroku. Devido ao plano de desenvolvimento, o dyno fica de stand-by após 30 minutos. Então, ao sair do stand-by há uma lentidão inicial, depois o funcionamento fica correto novamente.

