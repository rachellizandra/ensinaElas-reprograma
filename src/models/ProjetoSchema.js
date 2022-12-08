const mongoose = require('mongoose');

const projetoSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    nome: {
        type: String, 
        required: true
    },
    site: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    descricao: {
        type: String, 
        required: true
    },
    palavras_chave: []
}, { timestamps : true })

module.exports = mongoose.model("projeto", projetoSchema)