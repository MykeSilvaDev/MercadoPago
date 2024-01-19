

/* (1-392) Importando bibliotecas  */
const express = require("express");
const MercadoPago = require("mercadopago");
/*(2-392) Gerar instâncias no express */
const app = express();

/*(3-392) Vou setar as configurações do mercado pago, fora de qualquer rota
TRUE: aplicação em desenvolvimento
FALSE: aplicação disponível para os clientes comprarem */
MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-2989170179186905-090310-adda21f9112b8a7991d0775cd46b8fb7-214250182"
});

/*(4-392) Criando rota principal da aplicação */
app.get("/", (req, res) => {
    res.send("Olá Mundo");
});


/*(6-392) Essa rota vai mostrar uma venda genérica*/
app.get("/pagar", async (req, res) => {
// Criar objeto json definindo o pagamento
// Vou converter para string abrir aspas e concatenar
var id  = "" + Date.now();
// Email do pagador
var emailDoPagador = "mykegerentedell@outlook.com";

//                   [ SETANDO UM ITEM QUE EU QUERO VENDER]

var dados ={
// Dentro do array de items vou passar uma chave nomeada item que vai receber um objeto
        items: [
// Vou setar um id, posso inserir o nome que eu quiser e precisa ser diferente para cada venda
            item = {
// Pegando id da var = id
                id: id,
// Vou passar a descrição dos produtos que a pessao esta comprando
                title: "2x video games; 3x camisas",
// Quantidade
                quantity: 1,
// Moeda que a pessoa vai pagar
                currency_id: 'BRL',
// Preço tem que ser em float, vou inserir um valor de 150 reais
                unit_price: parseFloat(150)
            }
        ],
// Vou puxar o email de um pagaador que no caso sou eu
        payer:{    
            email: emailDoPagador
         },
// Campo que eu vou consultar quando o mercado pago informar que o pagamento for concluido (PRECISA TER O MESMO ID)
        external_reference: id
    }   

    try{

// Criar variável que vai receber um pagamento
    var pagamento = await MercadoPago.preferences.create(dados);
    console.log(pagamento);
// Vou redirecionar o usuário que gerou o pagamento para a url de checkout
    return res.redirect(pagamento.body.init_point);

    }catch(err){
        return res.send(err.message);
    }
});


/*(5-392) Inserindo a porta do servidor */
app.listen(3000, (req, res) => {
    console.log("Sevidor Ok");
})
