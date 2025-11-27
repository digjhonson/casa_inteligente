// ### CONFIGURANDO O BROKER MQTT PARA O NAVEGADOR
const MQTT_URL = "wss://test.mosquitto.org:8081";

// ### Configurando o ID do cliente MQTT 
const clienteId = 'web-casa-inteligente-diego';

// ### Criando o cliente MQTT do navegador, POREM ainda não estamos conectados ao BROKER
const cliente = mqtt.connect(MQTT_URL, {
    clienteId,
    clean: true,
    connectTimeout: 4000,
});

// ################# Variaveis dos dispositivos
const lampSalaInput = document.getElementById("lamp-sala");
const lampSalaTexto = document.getElementById("lamp-sala-texto");
const cortSalaInput = document.getElementById("cort-sala");
const cortSalaTexto = document.getElementById("cort-sala-texto");
const portSalaInput = document.getElementById("port-sala");
const portSalaTexto = document.getElementById("port-sala-texto");
const lampCozinhaInput = document.getElementById("lamp-cozinha");
const lampCozinhaTexto = document.getElementById("lamp-cozinha-texto");
const exausCozinhaInput = document.getElementById("exaus-cozinha");
const exausCozinhaTexto = document.getElementById("exaus-cozinha-texto");
const lampVarandaInput = document.getElementById("lamp-varanda");
const lampVarandaTexto = document.getElementById("lamp-varanda-texto");
const varVarandaInput = document.getElementById("var-varanda");
const varVarandaTexto = document.getElementById("var-varanda-texto");
const portVarandaInput = document.getElementById("port-varanda");
const portVarandaTexto = document.getElementById("port-varanda-texto");
const irVarandaInput = document.getElementById("ir-varanda");
const irVarandaTexto = document.getElementById("ir-varanda-texto");

// ################# Alterando estado dos dispositivos

// pegando o evento de mudança do botão (ligado/desligado)
lampSalaInput.addEventListener("change", () => {
    // verifica de o botão esta como ligado
    const ligado = lampSalaInput.checked === true;

    if (ligado === true){
        console.log("Lampada ligada");
        lampSalaTexto.innerHTML = "Ligado";
    } else {
        console.log("Lampada desligada");
        lampSalaTexto.innerHTML = "Desligado";
    }
});

cortSalaInput.addEventListener("change", () => {
    // verifica de o botão esta como ligado
    const ligado = cortSalaInput.checked === true;

    if (ligado === true){
        cortSalaTexto.innerHTML = "Aberta";
    } else {
        cortSalaTexto.innerHTML = "Fechada";
    }
});

portSalaInput.addEventListener("change", () => {
    // verifica de o botão esta como ligado
    const ligado = portSalaInput.checked === true;

    if (ligado === true){
        portSalaTexto.innerHTML = "Aberta";
    } else {
        portSalaTexto.innerHTML = "Fechada";
    }
});

lampCozinhaInput.addEventListener("change", () => {
    // verifica de o botão esta como ligado
    const ligado = lampCozinhaInput.checked === true;

    if (ligado === true){
        lampCozinhaTexto.innerHTML = "Ligada";
    } else {
        lampCozinhaTexto.innerHTML = "Desligada";
    }
});

exausCozinhaInput.addEventListener("change", () => {
    // verifica de o botão esta como ligado
    const ligado = exausCozinhaInput.checked === true;

    if (ligado === true){
        exausCozinhaTexto.innerHTML = "Ligada";
    } else {
        exausCozinhaTexto.innerHTML = "Desligada";
    }
});

lampVarandaInput.addEventListener("change", () => {
    // verifica de o botão esta como ligado
    const ligado = lampVarandaInput.checked === true;

    if (ligado === true){
        lampVarandaTexto.innerHTML = "Ligada";
    } else {
        lampVarandaTexto.innerHTML = "Desligada";
    }
});

varVarandaInput.addEventListener("change", () => {
    // verifica de o botão esta como ligado
    const ligado = varVarandaInput.checked === true;

    if (ligado === true){
        varVarandaTexto.innerHTML = "Aberto";
    } else {
        varVarandaTexto.innerHTML = "Fechado";
    }
});

portVarandaInput.addEventListener("change", () => {
    // verifica de o botão esta como ligado
    const ligado = portVarandaInput.checked === true;

    if (ligado === true){
        portVarandaTexto.innerHTML = "Aberto";
    } else {
        portVarandaTexto.innerHTML = "Fechado";
    }
});

irVarandaInput.addEventListener("change", () => {
    // verifica de o botão esta como ligado
    const ligado = irVarandaInput.checked === true;

    if (ligado === true){
        irVarandaTexto.innerHTML = "Ligada";
    } else {
        irVarandaTexto.innerHTML = "Desligada";
    }
});



// ### chamando um evento do JS do tipo "DOMContentLoaded", que é o evento que acontece 
//      após toda a minha página de HTML ser carregada
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página carregada com sucesso ✅... Conectando ao Mosquitto!");

    // ### Estabelecendo a conexão com o broker mqtt
    cliente.on("connect", () => {
        console.log("Conexão estabelecida com Sucesso ✅!");
        console.log("Cliente conectado: ", clienteId);

        // ### criando um topico para acessar mensagens do MQTT
        const topicoTeste = 'teste/ingrid';

        // ### recebendo mensagens do topico criado
        cliente.subscribe(topicoTeste);
    });

    // ### Preparando mensagem de erro caso algo aconteça
    cliente.on("error", (erro) => {
        console.error("Erro ao conectar ao Broker MQTT 🚫!");
        console.error(erro);
    });

    // ### Recebendo as mensagem dos tópicos assinados no MQTT pelo cliente
    cliente.on("message", (topico, mensagem) => {
        console.log("Topico recebido: ", topico);
        console.log("Mensagem recebida: ", mensagem);
    });
});