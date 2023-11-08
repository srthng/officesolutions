const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")

const port = 3000
const app = express()
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())


mongoose.connect("mongodb://127.0.0.1:27017/officesolutions", {
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
    DataFabricacao : {type: Date},
    QuantidadeEstoque : {type: Number},
})

const Produto = mongoose.model("produto", produtoSchema)


app.post("/cadastrousuario", async (req , res)=>{
    const email = req.body.email;
    const senha = req.body.senha;

   

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


app.post("/cadastroprodutoescritorio", async (req , res)=>{
    const id = req.body.id;
    const Descricao = req.body.Descricao;
    const Fornecedor = req.body.Fornecedor;
    const DataFabricacao = req.body.DataFabricacao;
    const QuantidadeEstoque = req.body.QuantidadeEstoque;

  
    const produtoescritorio = new Produto({
        id : id,
        Descricao : Descricao,
        Fornecedor : Fornecedor,
        DataFabricacao : DataFabricacao,
        QuantidadeEstoque : QuantidadeEstoque


    });
    if(QuantidadeEstoque>=50){
        res.json({ error: null, msg: "Erro, a quantidade no estoque já está em 50, não foi possível cadastrar"});
    } else if(QuantidadeEstoque<=0){
        res.json({ error: null, msg: "Erro, digite um número maior que 0 para cadastrar"});
    } else{
        try{
            const newProdutoescritorio = await produtoescritorio.save();
    
            res.json({ error: null, msg: "Cadastro de produto feito com sucesso", produtoId: newProdutoescritorio._id });
        }
        catch(error){
            res.status(400).json({error});
        }
    }
})


app.get("/cadastrousuario", async (req, res) => {
    res.sendFile(__dirname + "/cadastrousuario.html");
  });
  
  app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
  app.get("/cadastroprodutoescritorio", async (req, res) => {
    res.sendFile(__dirname + "/cadastroprodutoescritorio.html");
  });
app.listen(port, ()=>{
    console.log(`servidor rodando na porta ${port}`)
})