const InstituicaoSchema = require("../models/InstituicaoSchema");

const criarInstituicao = async (request, response) => {

    const { nome, sobre, cnpj, telefone, endereco, site } = request.body

    if (!endereco) {
        return response.status(400).send({
            message: "Endereço não foi preenchido!"
        })
    }

    try {

        const buscarCnpj = await InstituicaoSchema.find({ cnpj })

        if (buscarCnpj.length !== 0) {
            return response.status(400).json({ Prezados: `Este número de CNPJ já existe no nosso banco de dados` });
        }

        //Regras de negócio: Não aceitará CNPJ com menos de 14 caracteres
        if(String(cnpj).length > 14 || String(cnpj).length < 14){
            response.status(400).json({
                message:`CNPJ deve ter 14 caracteres.`
            })
        }

        const instituicao = new InstituicaoSchema({
            nome: nome,
            sobre: sobre,
            cnpj: cnpj,
            telefone: telefone,
            endereco: endereco,
            site: site
        })


        const salvarInstituicao = await instituicao.save()

        response.status(201).json({
            instituicao: salvarInstituicao
        })

    } catch (error) {
        response.status(400).json({
            message: error.message
        })
    }
}


const buscarInstituicao = async (req, res) => {
    
    const { nome, cnpj } = req.query;
    let query = { };


    //validação para caso venha um nome
    if (nome) query.nome = new RegExp(nome, 'i');
    if (cnpj) query.cnpj  = new RegExp(cnpj , 'i');

    try{
        const instituicoes = await InstituicaoSchema.find(query);
        res.status(200).json({
            statusCode: 200,
            message: 'Instituições carregadas com sucesso!',
            quantidade: instituicoes.length,
            instituicoes: instituicoes
        })

    }catch(error){
        res.status(500).json({
            statusCode: 500,
            mensagem: error.message
        })
    }
}


const buscarInstituicaoPorId = async (req, res) => {
    
    const id = req.params.id

    try {
        const buscarInstituicao = await InstituicaoSchema.findById(id)

        if (!buscarInstituicao) {
            return res.status(404).json({
                message: "Instituição não encontrada!"
            })
        }

        res.status(200).json({
            message: "Instituição encontrada",
            buscarInstituicao})

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const atualizarInstituicao = async(req, res) => {

    const { id } = req.params
    
    const { nome, sobre, cnpj, telefone, endereco, site } = req.body

    try {

        if(id.length > 24 || id.length < 24) {
            res.status(404).json({
                message:`Número de ID incorreto, por favor, digite novamente.`
            })
        }

        if (String(cnpj).length > 14 || String(cnpj).length < 14){
            res.status(404).json({
                message:`CNPJ inválido, digite novamente.`
            })
        }

        const encontraPorId = await InstituicaoSchema.findById(req.params.id)

        if (!encontraPorId) {
            return res.status(404).send({
                message: "Nenhum cadastro encontrado para o id buscado!"
            })
        }

        encontraPorId.nome = nome || encontraPorId.nome
        encontraPorId.sobre = sobre || encontraPorId.sobre
        encontraPorId.cnpj = cnpj || encontraPorId.cnpj
        encontraPorId.telefone = telefone || encontraPorId.telefone
        encontraPorId.endereco = endereco || encontraPorId.endereco
        encontraPorId.site = site|| encontraPorId.site

        const instituicaoAtualizada = await encontraPorId.save()

        res.status(200).json({
            message: "Instituição atualizada com sucesso!",
            instituicao: instituicaoAtualizada
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}


const deletarInstituicao = async (req, res) => {
    try {

        const buscarInstituicaoPorId = await InstituicaoSchema.findById(req.params.id)

        if (!buscarInstituicaoPorId) {
            return res.status(404).send({
                message: "Nenhum cadastro encontrado para o buscado"
            })
        }

        await buscarInstituicaoPorId.delete()

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
    criarInstituicao,
    buscarInstituicao,
    buscarInstituicaoPorId,
    atualizarInstituicao, 
    deletarInstituicao
}