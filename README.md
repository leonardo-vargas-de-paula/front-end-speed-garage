# FrontSpeedGarage

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

# Deploy do front end
Deploy feito na [Vercel](https://front-end-speed-garage.vercel.app/). Atualmente sem funcionalidades de banco, mas funciona se inicializar o json-server localmente (mais explicações adiante).

# Link do repositório

[https://github.com/leonardo-vargas-de-paula/front-end-speed-garage](https://github.com/leonardo-vargas-de-paula/front-end-speed-garage)

# Banco

Atualmente o protótipo está utilizando [json-server](https://www.npmjs.com/package/json-server) para realizar o teste e implementação de algumas funcionalidades.

Utilize o comando a seguir para inicializar a API fake:

```bash
json-server --watch db.json
```

# Servidor local

Caso queira iniciar um server local para visualizar o projeto, utilize o seguinte comando:

```bash
ng serve
```

# Possíveis erros

Caso o json server não funcione mesmo rodando o projeto localmente pode-se trocar a porta que ele utiliza:

```bash
json-server --watch db.json --port <PORTA>
```
E troque a porta na url em review.service.ts:

```bash
private apiUrl = 'http://localhost:<PORTA>/review';
```

Se mesmo assim não funcionar, pare de rodar o programa, feche a IDE que está utilizando e inicie novamente o banco de dados e o projeto.
