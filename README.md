<h2 align="center"> Projeto: EnsinaElas 👩👩🏻👩🏼👩🏽👩🏾👩🏿 </h2>
<h2 align="center">
  <img src="images\logotipo-animada.mp4" alt="logo ensinaElas" width="50%">
</h2>

## Apresentação :rainbow:

Olá! Meu nome é Rachel Lizandra, tenho 23 anos, sou lésbica, moro em Recife-PE, graduanda em Química Industrial na UFPE e dona de uma gatinha chamada Doja Cat. Amo Paramore, Lady Gaga e Willow. Apaixonada pelos filmes do A24 e RPG. Estou há 1 ano migrando de carreira para área Tech e finalizando o curso de desenvolvimento em Back-end na {Reprograma}.


## Sobre o projeto 👩‍💻

A ideia desse projeto surgiu quando comecei a me questionar a necessidade de nós, mulheres cis, trans ou travestis, termos consciência sobre uma das partes mais importantes do verdadeiro eu: nosso corpo. Sermos orientadas sobre os nossos corpos, do que realmente gostamos e do que podemos aprender sobre ele. O corpo não só como uma representação artística ou objetificação, mas como ele funciona, o que devemos fazer para cuidar, se sentirmos mais livres para expressar e exercermos nossa sexualidade. 

Falando em relação à educação sexual, sobre orientação para prevenção de gravidez precoce e Infecções Sexualmente Transmissíveis (ISTs) em escolas, de acordo com a última pesquisa do instituto Datafolha sobre os temas, realizada com 2.077 pessoas em 130 municípios, os favoráveis à adoção dos conteúdos nas salas de aula ‘venceram’ os contrários. De acordo com os dados: 54% foram a favor, 44% contra e 2% disseram não saber. Porém, mesmo com o crescimento econômico e o sucesso dos indicadores sociais, estes não são suficientes para a promoção dos direitos sexuais das crianças e mulheres jovens.

Este projeto reúne um banco de dados (API) com iniciativas e instituições que realizam oficinas, palestras ou artigos sobre saúde, psicologia e orientações sobre o corpo feminino, despertando de forma positiva, com o objetivo de democratizar e facilitar o acesso de crianças e jovens às informações sobre o tema e seu pertencimento dentro de uma sociedade mais acolhedora. 

## Fontes dos dados 📈

- [Revista Educação](https://revistaeducacao.com.br/2019/11/13/projetos-educacao-sexual-escolas/)

- [Revista Educação](https://revistaeducacao.com.br/2019/11/07/educacao-sexual-nas-escolas/)

- [Prazer ela](https://prazerela.com.br/)

- [Uniaids](https://unaids.org.br/2021/01/unaids-e-parceiros-lancam-cartilhas-de-saude-integral-e-sexual-para-travestis-e-mulheres-trans/)


## Arquitetura MVC 📁

```
📁ensinaelas-Reprograma
├── 📁node_modules
├── 📁src
|   ├── 📁config
        ├── 📄mongoConnect.js
│   ├── 📁controllers
        ├── 📄projetosController.js
        ├── 📄instituicoesController.js
        ├── 📄authController.js
        ├── 📄userController.js
|   ├── 📁middlewares
        ├── 📄auth.js
|   ├── 📁models
        ├── 📄ProjetoSchema.json
        ├── 📄InstituicaoSchema.json
        ├── 📄UserSchema.json
│   ├── 📁routes
        ├── 📄projetosRoutes.js
     	├── 📄instituicoesRoutes.js
        ├── 📄usersRoutes.js
        ├── 📄indexRoutes.js
|   ├── 📁test
        ├── 📄projects.test.js
        ├── 📄institutions.test.js
        ├── 📄users.test.js
|   ├── app.js
├── 📄.env
├── 📄.env.example 
├── 📄.gitignore
├── 📄package-lock.json
├── 📄package.json
├── 📄README.md
├── 📄server.js
```

## Tecnologias e dependências 💻

**Base do projeto**

```
Controle de versões: 
Git/GitHub

Editor de código - IDE:
VSCode

Servidor de desenvolvimento back-end em Javascript:
Nodejs
```

**Instalações iniciais**

```
Package.json em JS:
npm init -y

Express, cors e node_modules:
npm i express cors

Nodemon:
npm i -D nodemon
```

**Banco de dados**

```
Mongoose:
npm i mongoose
```

**Autenticação**

```
Jwt:
npm install jsonwebtoken

Bcrypt:
npm install bcrypt
```

**Variaveis de ambiente**

```
Dotenv:
npm install dotenv
```

**Testes**

```
Jest:
npm install jest

Supertest: 
npm install supertest
```

## Coleções 📃

*Models:

- Projetos:
{
​	"_id":
​	"nome":
​	"site":
​	"email":
​	"descricao":
​	"palavras_chave": [ ]
}

- Instituições:
{
​	"_id":
​	"nome":
​	"cnpj":
​	"telefone":
​	"endereco": 
​	"site":
}

- Users:
{
​	"name":
​	"email":
​	"password":
}


## Rotas - EndPoint ➡

| Rotas - Projetos            | Funções                                                      | Status | Auth |
| --------------------------- | ------------------------------------------------------------ | ------ | ---- |
| GET /projects/all           | Acesso a todos os projetos ou os filtrados pelo nome ou palavras-chave (query) | 200    | ❌    |
| GET /projects/:id           | Acesso ao projeto pelo id                                    | 200    | ✔️    |
| POST /projects/create       | Cadastro de novo projeto                                     | 201    | ✔️    |
| PATCH /projects/update/:id  | Alteração de dados do projeto                                | 201    | ✔️    |
| DELETE /projects/delete/:id | Deleta projeto do banco de dados                             | 200    | ✔️    |



| Rotas - Instituições            | Funções                                                      | Status | Auth |
| ------------------------------- | ------------------------------------------------------------ | ------ | ---- |
| GET /institutions/all           | Acesso a todas as instituições ou as filtradas pelo nome ou cnpj (query) | 200    | ❌    |
| GET /institutions/:id           | Acesso a uma instituição pelo id                             | 200    | ✔️    |
| POST /institutions/create       | Cadastro de nova instituição                                 | 201    | ✔️    |
| PATCH /institutions/update/:id  | Alteração de dados da instituição                            | 201    | ✔️    |
| DELETE /institutions/delete/:id | Deleta instituição do banco de dados                         | 200    | ✔️    |



| Rotas - Usuários  | Funções                               | Status | Auth |
| ----------------- | ------------------------------------- | ------ | ---- |
| GET /users        | Acesso a todas os usuárias            | 200    | ✔️    |
| POST /users       | Cadastro de nova usuária              | 201    | ❌    |
| POST /users/login | Login de usuária                      | 200    | ❌    |
| DELETE /users/:id | Exclusão de usuária do banco de dados | 200    | ✔️    |



## Documentação da API 📄

- [Google Docs](https://docs.google.com/document/d/1V8ke1EIvuDcfkJaFZH7byWSHUWKLoV1pq8hZzsE2zAI/edit?usp=sharing)


## Contribuição para o projeto 👩🏾‍🤝‍👩🏼🤝🏽

1. Faça um **fork** do projeto.
2. Realize o clone do projeto através do `git clone <link_do_fork_do_repositorio>`
3. Crie uma nova branch com as suas alterações: `git checkout -b minha-branch`
4. Instale as dependências necessárias à execução da API através do comando `npm install`
5. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "Minhas alterações para contribuição"`
6. Envie as suas alterações: `git push origin minha-branch`


## Autora 🧜‍♀️

<h2 align="center">
  <img src="images\WhatsApp Image 2020-05-24 at 10.19.47.jpeg" alt="foto-autora" width="50%">
</h2>

- [Instagram](https://www.instagram.com/rachel.lizandra/)
- [Linkedin](https://www.linkedin.com/in/rachel-lizandra-96a430169/)
- [Discord](https://discord.com/channels/867748958201315328/@home)

