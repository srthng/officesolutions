const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")

const port = 3000
const app = express()
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())


mongoose.connect('mongodb://localhost:27017', {
    useNewURlParser : true,
    useUnifiedTopology : true
})

const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type: String}
})

const Usuario = mongoose.model("usuario", UsuarioSchema)

const produtoSchema = new mongoose.Schema({
    id : {type : String, required : true},
    Descrição : {type : String},
    Fornecedor : {type: String},
    DataFabricação : {type: String},
    QuantidadeEstoque : {type: String},
})

const Produto = mongoose.model("produto", produtoSchema)


app.post("/cadastrousuario", async (req , res)=>{
    const email = req.body.email;
    const senha = rqe.body.senha

   

    const usuario = new Usuario({
        email : email,
        senha : senha
    })
    
    try{
        const newUsuario = await usuario.save();
    
        res.json({error : null, msg : "Cadastro de usuario feito com sucesso", usuarioId : newUsuario._id})
    }
    catch(error){
        res.status(400).json({error});
    }
});


app.post("/produtoescritorio", async (req , res)=>{
    const id = req.body.id;
    const Descrição = req.body.Descrição;
    const Fornecedor = req.body.Fornecedor;
    const DataFabricação = req.body.DataFabricação;
    const QuantidadeEstoque = req.body.QuantidadeEstoque;

  
    const produtoescritorio = new produtoescritorio({
        id : id,
        Descrição : Descrição,
        Fornecedor : Fornecedor,
        DataFabricação : DataFabricação,
        QuantidadeEstoque : QuantidadeEstoque

    });
    
    try{
        const newProduto = await produtoescritorio.save();
    
        res.json({error : null, msg : "Cadastro de usuario feito com sucesso", usuarioId : newProduto._id})
    }
    catch(error){
        res.status(400).json({error});
    }
})



app.listen(port, ()=>{
    console.log(`servidor rodando na porta ${port}`)
})