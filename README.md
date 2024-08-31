# Serviço de Gestão de Consumo de Água e Gás

Este projeto é um serviço back-end para gerenciar a leitura de medidores de água e gás utilizando tecnologia de IA. A API é desenvolvida com Node.js e TypeScript e utiliza Docker para containerização. O serviço inclui endpoints para upload de imagens, confirmação de leituras e listagem de medições.

## Estrutura do Projeto

O projeto utiliza as seguintes tecnologias e ferramentas:

- **Node.js** e **TypeScript**: Para o desenvolvimento da API.
- **Express**: Para criação do servidor e roteamento.
- **Docker**: Para containerização.
- **Dotenv**: Para carregamento das variáveis de ambiente.
- **Express-async-errors**: Para tratamento de erros assíncronos.

## Como usar

1.  Clone o repositório com o comando `git clone https://github.com/tinted-dragon/desafio-shopper-backend.git`.
2.  Entre na pasta do projeto com o comando `cd desafio-shopper-backend`.
3.  Suba os containers com o comando `docker-compose up -d --build`.

## Funcionalidades

### Endpoints da API

1.  **POST `/upload`**

    **Descrição**: Recebe uma imagem codificada em base64 e informações relacionadas, utiliza uma IA para obter a leitura e salva os dados no banco.

    **Corpo da Requisição**:

    ```json
    {
      "image": "base64",
      "customer_code": "string",
      "measure_datetime": "datetime",
      "measure_type": "WATER" ou "GAS"
    }
    ```

    **Corpo da Resposta**:

    ```json
    {
      "image_url": "string",
      "measure_value": "integer",
      "measure_uuid": "string"
    }
    ```

2.  **PATCH `/confirm`**

    **Descrição**: Confirma a leitura de um medidor.

    **Corpo da Requisição**:

    ```json
    {
      "measure_uuid": "string",
      "confirmed_value": "integer"
    }
    ```

    **Corpo da Resposta**:

    ```json
    {
      "message": "string"
    }
    ```

3.  **GET `/:customer_code/list`**

    **Descrição**: Retorna uma lista de medidores de água ou gás de um cliente. O parâmetro `measure_type` pode ser `WATER` ou `GAS`.

    **Corpo da Requisição**:

    ```json
    {
      "customer_code": "string",
      "measure_type": "WATER" ou "GAS"
    }
    ```

    **Corpo da Resposta**:

    ```json
    {
      “customer_code”: "string",
        “measures”: [
        {
        “measure_uuid”: "string",
        “measure_datetime”: "datetime",
        “measure_type”: "string",
        “has_confirmed”:"boolean",
        “image_url”: "string"
        },
        {
        “measure_uuid”: "string",
        “measure_datetime”: "datetime",
        “measure_type”: "string",
        “has_confirmed”:"boolean",
        “image_url”: "string"
        }
    ]
    }
    ```
