# Sistema de Gestão de Entregas - LAP Informática

![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Projeto desenvolvido para a Unidade Curricular de **Projeto Aplicado II** do Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas do [CENTRO UNIVERSITÁRIO SENAI SANTA CATARINA](https://sc.senai.br/unisenai).

## 📝 Índice

- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [🎯 Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🏛️ Arquitetura da Solução](#️-arquitetura-da-solução)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [📈 Modelagem do Sistema](#-modelagem-do-sistema)
- [🧑‍💻 Equipe](#-equipe)

## 📖 Sobre o Projeto

A **LAP Informática** é uma empresa de Juiz de Fora focada em serviços de entrega rápida via motoboys para fortalecer o comércio local. Atualmente, a empresa enfrenta desafios devido ao seu processo totalmente manual, baseado em atendimentos telefônicos e no conhecimento empírico dos atendentes para calcular fretes. Isso resulta em demoras, estimativas imprecisas e ineficiência operacional.

Este projeto visa solucionar esses problemas através do desenvolvimento de um **Sistema de Gestão de Entregas**. A solução proposta é uma plataforma web que automatiza todo o processo, desde a solicitação do cliente até a confirmação da entrega. O sistema garante mais rastreabilidade, eficiência e uma significativa redução de custos operacionais.

## 🎯 Funcionalidades

A plataforma é composta por três módulos principais, atendendo aos diferentes perfis de usuário:

### 👤 Cliente
* Solicitar entregas informando peso, dimensões e CEPs de origem e destino.
* Obter o cálculo automático do frete com base em peso, distância e tempo estimado.
* Acompanhar o status do pedido em tempo real (Pedido efetuado, Pedido aceito, A caminho, Entregue) e receber notificações.
* Confirmar o recebimento da entrega através de assinatura digital e CPF.
* Gerenciar entregas que falharam, podendo optar por reagendamento ou cancelamento.

### 🏍️ Motoboy
* Visualizar e aceitar os pedidos de entrega disponíveis na plataforma.
* Registrar a conclusão de uma entrega, coletando a assinatura digital e o CPF do receptor.
* Registrar uma entrega falha, anexando uma foto do local e uma justificativa como evidência.
* Receber notificações sobre novos pedidos na sua área.

### ⚙️ Administrador
* Gerenciar o cadastro de clientes e motoboys na plataforma.
* Acessar relatórios e históricos completos de pedidos, entregas, falhas e valores cobrados.
* Auditar o ciclo de vida de um pedido, com registros de data e hora para cada ação realizada.

## 🛠️ Tecnologias Utilizadas

A solução foi desenvolvida utilizando tecnologias modernas para garantir performance, segurança e escalabilidade.

* **Frontend**
    * [Next.js](https://nextjs.org/) 
    * [TypeScript](https://www.typescriptlang.org/) 
    * [Tailwind CSS](https://tailwindcss.com/) 
    * [Material-UI](https://mui.com/) 
    * [Mirage JS](https://miragejs.com/) 
* **Backend**
    * [Node.js](https://nodejs.org/) (com [Express](https://expressjs.com/)) 
* **Banco de Dados**
    * [PostgreSQL](https://www.postgresql.org/) 
    * [PostGIS](https://postgis.net/) (para cálculos geográficos) 
* **APIs Externas**
    * [Google Maps API](https://maps.google.com/) (para cálculo de rotas e distâncias) 
    * [Serpro API](https://www.serpro.gov.br/) (para validação de CNH) 

## 🏛️ Arquitetura da Solução

A aplicação é um **website com design responsivo (mobile-first)** e um dashboard interativo. A arquitetura é baseada em serviços, com um frontend independente que se comunica com uma API backend. O grande diferencial é o uso da extensão **PostGIS** no banco de dados PostgreSQL, que permite a realização de cálculos geográficos precisos para a precificação automática e dinâmica do frete, baseando-se em distância, peso e tempo.

## 🚀 Como Executar o Projeto

Siga os passos abaixo para executar o projeto em seu ambiente local.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org/en/)
* [PostgreSQL](https://www.postgresql.org/download/) 

### Rodando o Backend (API)

```bash
# Clone este repositório
$ git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)

# Acesse a pasta do backend
$ cd seu-repositorio/back

# Instale as dependências
$ npm install

# Inicie o servidor
$ npm run dev
# O servidor iniciará na porta:3333 - acesse http://localhost:3333

Em um outro terminal:
# Acesse a pasta do frontend
$ cd seu-repositorio/front

# Instale as dependências
$ npm install

# Inicie o servidor
$ npm run dev
# O servidor iniciará na porta:3000 - acesse http://localhost:3000

```

📈 Modelagem do Sistema
Diagrama de Entidade e Relacionamento (DER)
O diagrama abaixo representa a estrutura do banco de dados, com suas principais entidades e relacionamentos.

![Diagrama ER](![DER_Final](https://github.com/user-attachments/assets/28efbb5a-435c-40f2-a2e2-fbf82ead02bd)
)

Diagrama de Caso de Uso (Use Case)
Este diagrama ilustra as interações dos diferentes atores com as funcionalidades do sistema.

![Diagrama de Caso de Uso]([./docs/use-case.png](https://lucid.app/lucidchart/2cb7e043-0f4b-45cd-aa09-4679f27c9bf3/edit?invitationId=inv_6e41ae99-224d-47d4-8084-6ebac29f45fe))

🧑‍💻 Equipe
Este projeto foi elaborado e desenvolvido por:

Bruno Goulart Garcia, 
Tiago Martins Rodrigues Joao, 
Bernardo Gomez Karsten, 
Caire de Marco Maia 
