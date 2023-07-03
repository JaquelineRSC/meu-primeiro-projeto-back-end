const express = require("express") //aqui estou iniciando o express
const router = express.Router() //aqui estou configurando a primeira parte da rota
const cors = require ('cors') //aqui estou instalando o cors que permite a instegração com o front-end

const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()

const Mulher = require ('./mulherModel')

const app = express() //aqui estou iniciando o app
app.use(express.json())
app.use (cors())

const porta = 3333 //aqui estou criando a porta


//get
async function mostraMulheres(request, response){
 try {
       mulheresVindasDoBancoDeDados = await Mulher.find()

       response.json(mulheresVindasDoBancoDeDados)
 } catch (erro){
       console.log(erro)

 }
}

//post
async function criaMulher(request, response) {
  const novaMulher = new Mulher ({
          nome: request.body.nome,
          imagem: request.body.imagem,
          minibio: request.body.minibio,
          citacao: request.body.citacao       
 })
try{
  const mulherCriada = await novaMulher.save()
  response.status(201).json(mulherCriada) 
} catch (erro){
  console.log(erro)
}
 
}

//PTCH
async function corrigeMulher(request, response){
try {
  const mulherEncontrada = await Mulher.findById(request.params.id)
  if (request.body.name){
    mulherEncontrada.nome = request.body.name
  }
  if(request.body.minibio){
    mulherEncontrada.minibio = request.body.minibio
  }
  if (request.body.imagem){
    mulherEncontrada.imagem = request.body.imagem
  }
  if (request.body.citacao){
    mulherEncontrada.citacao = request.body.citacao
  }
  const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
  response.json (mulherAtualizadaNoBancoDeDados) 
} catch (erro) {
    console.log (erro)
}

}

//Delete
async function deletaMulher (request, response){
 try{
   await Mulher.findByIdAndDelete(request.params.id)
   response.json ({mensagem:'Mulher deletada com sucesso!'})
 }catch (erro){
    console.log (erro)
 }
  

}

app.use(router.get ('/mulheres', mostraMulheres))//configurei rota get/mulheres
app.use(router.post('/mulheres', criaMulher)) //configuração rota post /mulheres
app.use(router.patch ('/mulheres/:id', corrigeMulher)) //configurei rota patch/mulheres /:id
app.use(router.delete('/mulheres/:id', deletaMulher)) // configurei rota delete /mulheres


//porta
function mostraPorta() {
console.log("servidor criado e rodando na porta", porta)
}

app.listen(porta, mostraPorta) //servidor ouvindo a porta