# Fila de Espera Cypress

Este repositório contém testes automatizados usando Cypress para um sistema de fila de espera. Ele demonstra como configurar e rodar testes tanto em modo gráfico quanto em modo headless.

## Pré-requisitos

Antes de começar, certifique-se de que você tem o Node.js e o npm instalados em sua máquina. Se você não tiver o Node.js e o npm, pode instalá-los visitando [nodejs.org](https://nodejs.org/).

## Clonando o Repositório

Para obter uma cópia local do código, clone o repositório usando HTTPS ou SSH:

**HTTPS:**

```bash
git clone https://github.com/Niliotiii/fila-de-espera-cypress.git
```

**SSH**

```bash
git clone git@github.com:Niliotiii/fila-de-espera-cypress.git
```

Após clonar o repositório, entre no diretório do projeto:

```bash
cd fila-de-espera-cypress
```

## Instalação

Execute o seguinte comando para instalar as dependências necessárias:

```bash
npm install
```

Além disso, instale globalmente o ntl para facilitar a execução dos scripts disponíveis:

```bash
npm install -g ntl
```

## Executando os Testes

Você pode executar os testes de duas maneiras: através da interface gráfica do Cypress ou em modo headless.

### Interface Gráfica

Para abrir a interface gráfica do Cypress:

```bash
ntl
```

Escolha a opção: **cypress:open**

### Modo Headless

Para executar os testes em modo headless (sem interface gráfica):

```bash
ntl
```

Escolha a opção: **cypress:run**