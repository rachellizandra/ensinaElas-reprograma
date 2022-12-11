const app = require("../app")
const request = require("supertest")
const model = require("../models/InstituicaoSchema")
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET;

describe("Instituicao Controller", () => {

    const token = "bearer " + jwt.sign({ name: "rachel"}, SECRET)

    const instituicaoMock = {
        nome: "Teste1",
        sobre: "Teste2",
        cnpj: "56329864957635",
        telefone: "Teste3",
        endereco: "Teste4",
        site: "Teste5"
    }

    beforeAll(async () => {
        const novaInstituicao = new model(instituicaoMock)
        
        await novaInstituicao.save()

        instituicaoMock.id = novaInstituicao._id
    })

    afterAll(async () => {
        await model.deleteMany()
      })

    test("GET /instituicoes/all", (done) => {
        request(app)
        .get("/instituicoes/all")
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Instituições carregadas com sucesso!")
        })
        .end(err => {
            if (err) return done(err)
            return done()
        })
    })

    test("POST /instituicoes/create", (done) => {

        const novaInstituicao = {
            nome: "AzMina",
            sobre: "AzMina é uma instituição sem fins lucrativos cujo objetivo é combater os diversos tipos de violência que atingem mulheres brasileiras, considerando as diversidades de raça, classe e orientação sexual.",
            cnpj: "56329864957855",
            telefone: "não encontrado",
            endereco: "R. Prof. Rubião Meira, 59 - Pinheiros, São Paulo",
            site: "https://azmina.com.br/"
        }

        request(app)
        .post("/instituicoes/create")
        .set("authorization", token)
        .send(novaInstituicao)
        .expect(201)
        .expect(res => {
            expect(res.body.instituicao.nome).toBe("AzMina")
        })
        .end(err => {
            return done(err)
        })
    });

    test("PATCH /instituicoes/update/:id", (done) => {

        const atualizarInstituicao = {
            nome: "A vida é bela",
            sobre: "teste",
            cnpj: "55569864957896",
            telefone: "59683469",
            endereco: "R. major joao ribeiro pinheiro",
            site: "https://avidaebela.com.br/"
        }

        request(app)
        .patch("/instituicoes/update/" + instituicaoMock.id)
        .set("authorization", token)
        .send(atualizarInstituicao)
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Instituição atualizada com sucesso!")
        })
        .end(err => done(err))
    });

    test('GET /instituicoes/:id ', (done) => {
        request(app)
        .get(`/instituicoes/${instituicaoMock.id}`)
        .set("authorization", token)
        .expect(200)
        .expect(res => {
            expect(res.body.message).toBe("Instituição encontrada")
        })
        .end(err => done(err))
    });

    test("DELETE /instituicoes/:id", (done) => {

        request(app)
        .delete("/instituicoes/delete/" + instituicaoMock.id)
        .set("authorization", token)
        .expect(200)
        .end(err => done(err))

    });

    test('Deve retornar um erro ao não encontrar uma instituição e um 404', (done) => {
        request(app)
        .get("/instituicoes/" + instituicaoMock.id)
        .set("authorization", token)
        .expect(404)
        .expect(res => {
            expect(res.body.message).toBe("Instituição não encontrada!")
        })
        .end(err => done(err))
    });
})
