const app = require("../app")
const request = require("supertest")
const model = require("../models/ProjetoSchema")
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET;

describe("Projeto Controller", () => {

    const token = "bearer " + jwt.sign({ name: "rachel"}, SECRET)

    const projetoMock = {
        nome: "Teste1",
        site: "Teste2",
        email: "56329864957635",
        descricao: "Teste3",
        palavras_chave: ["teste4", "teste5"],
    }

    beforeAll(async () => {
        const novoProjeto = new model(projetoMock)
        
        await novoProjeto.save()

        projetoMock.id = novoProjeto._id
    })

    afterAll(async () => {
        await model.deleteMany() // deletar muitos
      })

    test("GET /projetos/all", (done) => {
        request(app)
        .get("/projetos/all")
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Projetos carregados com sucesso!")
        })
        .end(err => {
            if (err) return done(err)
            return done()
        })
    })

    test("POST /projetos/create", (done) => {

        const novoProjeto = {
            nome: "Polpa",
            site: "Teste8",
            email: "https://polpaedu.wixsite.com/",
            descricao: "Trabalho de Conclusão de Curso apresentado pela aluna Louise Hardy ao Centro de Comunicação e Letras da Universidade Presbiteriana Mackenzie como requisito parcial para a obtenção do grau de Bacharel em Jornalismo, orientado pela Profª. Drª. Valéria Bussola Martins. O Polpa foi criado com o objetivo de ajudar meninas e mulheres a se conhecerem e pensarem em sexo de forma natural e positiva. Além disso, visa ser um produto informativo que deixa claro informações necessárias para a saúde de todas. Este Trabalho de Conclusão de Curso não reflete a opinião da Universidade Presbiteriana Mackenzie. Seu conteúdo e abordagem são de total responsabilidade de seu autor.",
            palavras_chave: ["Anatomia", "Menstruação", "Contraceptivos", "ISTs"],
        }

        request(app)
        .post("/projetos/create")
        .set("authorization", token)
        .send(novoProjeto)
        .expect(201)
        .expect(res => {
            expect(res.body.projeto.nome).toBe("Polpa")
        })
        .end(err => {
            return done(err)
        })
    });

    test("PATCH /projetos/update/:id", (done) => {

        const atualizarProjeto = {
            nome: "Polpa",
            site: "www.tentandotestarupdate.com.br",
            email: "@teste",
            descricao: "TCC",
            palavras_chave: ["Anatomy", "Corpo Feminino"],
        }

        request(app)
        .patch("/projetos/update/" + projetoMock.id)
        .set("authorization", token)
        .send(atualizarProjeto)
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Projeto atualizado com sucesso!")
        })
        .end(err => done(err))
    });

    test('GET /projetos/:id ', (done) => {
        request(app)
        .get(`/projetos/${projetoMock.id}`)
        .set("authorization", token)
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Projeto encontrado!")
        })
        .end(err => done(err))
    });

    test("DELETE /projetos/:id", (done) => {

        request(app)
        .delete("/projetos/delete/" + projetoMock.id)
        .set("authorization", token)
        .expect(200)
        .end(err => done(err))

    });

    test('Deve retornar um erro ao não encontrar uma instituição e um 404', (done) => {
        request(app)
        .get("/projetos/" + projetoMock.id)
        .set("authorization", token)
        .expect(404)
        .expect(res => {
            expect(res.body.message).toBe("Projeto não encontrado!")
        })
        .end(err => done(err))
    });
})