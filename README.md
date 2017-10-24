# stack-evaluation

> Aplicativo web para avaliação e classificação das habilidades de um candidato para a vaga de desenvolvedor

## Objetivo

  > Enviar um e-mail ao candidato que realizou o cadastro agradecendo o cadastro e informando como o mesmo foi classificado

  - Front-End
  - Back-End
  - Mobile
  - Genérico

## Classificação

 > Para que o candidato seja classificado para um stack, ele deve se auto avaliar com nota igual ou superior a sete nas tecnologias utilizadas na stack.

### Front-End

  - HTML, CSS, Javascript

  > Todas iguais ou superior a 7

### Back-End

  - Django, Phyton
  
  > Todas iguais ou superior a 7

### Mobile

  - Andoid, IOS

  > Uma ou mais com nota superior a 7

## Conteúdo do e-mail

  - Assunto: Obrigado por se cadastrar
  - Conteúdo: Obrigado por se candidatar, assim que tivermos uma vaga disponível para programador `DESCRICAO_STACK` entraremos em contato.
  - `DESCRICAO_STACK`: irá constar o nome da stack que o candidato possui habilidades, podendo ser mais de uma ou nenhuma
  - Será enviado um e-mail para cada stack que o usuário se enquadre
  - Caso não se enquadre em nenhuma, o e-mail será genérico sem a descrição da stack

## Sobre o projeto

 > O envio do e-mail e classificação do candidato será realizado utilizando [Firebase Cloud Functions](https://firebase.google.com/docs/functions/)
 