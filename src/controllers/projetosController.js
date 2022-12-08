const ProjetoSchema = require("../models/ProjetoSchema");

const criarProjeto = async (request, response) => {

    const { nome, site, email, descricao, palavras_chave } = request.body

    if (!nome) {
        return response.status(400).send({
            message: "O nome do projeto não preenchido"
        })
    }

    if (!site) {
        return response.status(400).send({
            message: "O site não preenchido"
        })
    }

    try {

        const projeto = new ProjetoSchema({
            nome: nome,
            site: site,
            email: email,
            descricao: descricao,
            palavras_chave: palavras_chave
        })


        const salvarProjeto = await projeto.save()

        response.status(201).json({
            projeto: salvarProjeto
        })

    } catch (error) {
        response.status(400).json({
            message: error.message
        })
    }
}


const buscarProjeto = async (req, res) => {
    
    const { nome, palavras_chave } = req.query;
    let query = { };


    //validação para caso venha um nome
    if (nome) query.nome = new RegExp(nome, 'i');
    if (palavras_chave) query.palavras_chave = new RegExp(palavras_chave, 'i');

    try{
        const projetos = await ProjetoSchema.find(query);
        res.status(200).json({
            statusCode: 200,
            message: 'Projetos carregados com sucesso!',
            quantidade: projetos.length,
            projetos: projetos
        })

    }catch(error){
        res.status(500).json({
            statusCode: 500,
            mensagem: error.message
        })
    }
}


const buscarProjetoPorId = async (req, res) => {
    
    const id = req.params.id

    try {
        const buscarProjeto = await ProjetoSchema.findById(id)

        if (!buscarProjeto) {
            return res.status(404).json({
                message: "Projeto não encontrado!"
            })
        }

        res.status(200).json({
            message: "Projeto encontrado!",
            buscarProjeto})

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const atualizarProjeto = async(req, res) => {

    const { nome, site, email, descricao, palavras_chave } = req.body

    try {
        const encontraPorId = await ProjetoSchema.findById(req.params.id)

        if (!encontraPorId) {
            return res.status(404).send({
                message: "Nenhum cadastro encontrado para o id buscado!"
            })
        }

        encontraPorId.nome = nome || encontraPorId.nome
        encontraPorId.site = site|| encontraPorId.site
        encontraPorId.email = email || encontraPorId.email
        encontraPorId.descricao = descricao || encontraPorId.descricao
        encontraPorId.palavras_chave = palavras_chave || encontraPorId.palavras_chave

        const projetoAtualizado = await encontraPorId.save()

        res.status(200).json({
            message: "Projeto atualizado com sucesso!",
            projeto: projetoAtualizado
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}


const deletarProjeto = async (req, res) => {
    try {

        const buscarProjetoPorId = await ProjetoSchema.findById(req.params.id)

        if (!buscarProjetoPorId) {
            return res.status(404).send({
                message: "Nenhum cadastro encontrado para o projeto buscado"
            })
        }

        await buscarProjetoPorId.delete()

        res.status(200).send({
            message: "Cadastro removido"
        })
        
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}


module.exports = {
    criarProjeto,
    buscarProjeto,
    buscarProjetoPorId,
    atualizarProjeto, 
    deletarProjeto
}