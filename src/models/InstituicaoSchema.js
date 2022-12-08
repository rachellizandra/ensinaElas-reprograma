const mongoose = require('mongoose');

const instituicoesSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    nome: {
        type: String, 
        required: true
    },
    sobre: {
        type: String, 
        required: true
    },
    cnpj: {
        type: String, 
        required: true
    },
    telefone: {
        type: String, 
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    site: {
        type: String, 
        required: true
    }
}, { timestamps : true })

module.exports = mongoose.model("instituicoes", instituicoesSchema)