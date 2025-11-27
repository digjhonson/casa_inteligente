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















// ### chamando um evento do JS do tipo "DOMContentLoaded", que é o evento que acontece 
//      após toda a minha página de HTML ser carregada
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página carregada com sucesso ✅... Conectando ao Mosquitto!");

    // ### Estabelecendo a conexão com o broker mqtt
    cliente.on("connect", () => {
        console.log("Conexão estabelecida com Sucesso ✅!");
        console.log("Cliente conectado: ", clienteId);

        // ### criando um topico para acessar mensagens do MQTT
        const topicoTeste = 'teste/diego';

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
        console.log("Mensagem recebida: ", mensagem.toString());
    });


    // pegando o evento de mudança do botão (ligado/desligado)
    lampSalaInput.addEventListener("change", () => {

        const TOPICO_LAMP_SALA = 'casa-diego/sala/lamp';

        // verifica de o botão esta como ligado
        const ligado = lampSalaInput.checked === true;

        if (ligado === true) {
            //console.log("Lampada ligada");
            cliente.publish(TOPICO_LAMP_SALA, 'Ligado')
            lampSalaTexto.innerHTML = "Ligado";
        } else {
            //console.log("Lampada desligada");
            cliente.publish(TOPICO_LAMP_SALA, 'Desligado')
            lampSalaTexto.innerHTML = "Desligado";
        }
    });


    cortSalaInput.addEventListener("change", () => {
        const TOPICO_CORT_SALA = 'casa-diego/sala/cort';

        // verifica de o botão esta como ligado
        const ligado = cortSalaInput.checked === true;

        if (ligado === true) {
            cliente.publish(TOPICO_CORT_SALA, 'Ligado')
            cortSalaTexto.innerHTML = "Aberta";
        } else {
            cliente.publish(TOPICO_CORT_SALA, 'Desligado')
            cortSalaTexto.innerHTML = "Fechada";
        }
    });

    portSalaInput.addEventListener("change", () => {
        const TOPICO_PORT_SALA = 'casa-diego/sala/port';
        // verifica de o botão esta como ligado
        const ligado = portSalaInput.checked === true;

        if (ligado === true) {
            cliente.publish(TOPICO_PORT_SALA, 'Ligado')
            portSalaTexto.innerHTML = "Aberta";
        } else {
            cliente.publish(TOPICO_PORT_SALA, 'Desligado')
            portSalaTexto.innerHTML = "Fechada";
        }
    });

    lampCozinhaInput.addEventListener("change", () => {
           const TOPICO_LAMP_COZINHA = 'casa-diego/cozinha/lamp';
    // verifica de o botão esta como ligado
    const ligado = lampCozinhaInput.checked === true;

    if (ligado === true) {
         cliente.publish(TOPICO_LAMP_COZINHA, 'Ligado')
        lampCozinhaTexto.innerHTML = "Ligada";
    } else {
         cliente.publish(TOPICO_LAMP_COZINHA, 'Desligado')
        lampCozinhaTexto.innerHTML = "Desligada";
    }
});

exausCozinhaInput.addEventListener("change", () => {
    const TOPICO_EXAUS_COZINHA = 'casa-diego/cozinha/exaus';
    // verifica de o botão esta como ligado
    const ligado = exausCozinhaInput.checked === true;

    if (ligado === true) {
        cliente.publish(TOPICO_EXAUS_COZINHA, 'Ligado')
        exausCozinhaTexto.innerHTML = "Ligada";
    } else {
         cliente.publish(TOPICO_EXAUS_COZINHA, 'Desligado')
        exausCozinhaTexto.innerHTML = "Desligada";
    }
});

lampVarandaInput.addEventListener("change", () => {
    
    const TOPICO_LAMP_VARANDA = 'casa-diego/varanda/lamp';
    // verifica de o botão esta como ligado
    const ligado = lampVarandaInput.checked === true;

    if (ligado === true) {
        cliente.publish(TOPICO_LAMP_VARANDA, 'Ligado')
        lampVarandaTexto.innerHTML = "Ligada";
    } else {
         cliente.publish(TOPICO_LAMP_VARANDA, 'Desligado')
        lampVarandaTexto.innerHTML = "Desligada";
    }
});

varVarandaInput.addEventListener("change", () => {

     const TOPICO_VAR_VARANDA = 'casa-diego/varanda/var'

    // verifica de o botão esta como ligado
    const ligado = varVarandaInput.checked === true;

    if (ligado === true) {
        cliente.publish(TOPICO_VAR_VARANDA, 'Ligado')
        varVarandaTexto.innerHTML = "Aberto";
    } else {
         cliente.publish(TOPICO_VAR_VARANDA, 'Desligado')
        varVarandaTexto.innerHTML = "Fechado";
    }
});

portVarandaInput.addEventListener("change", () => {

     const TOPICO_port_VARANDA = 'casa-diego/varanda/port'

    // verifica de o botão esta como ligado
    const ligado = portVarandaInput.checked === true;

    if (ligado === true) {
         cliente.publish(TOPICO_PORT_VARANDA, 'Aberta')
        portVarandaTexto.innerHTML = "Aberto";
    } else {
         cliente.publish(TOPICO_PORT_VARANDA, 'Fechada')
        portVarandaTexto.innerHTML = "Fechado";
    }
});

irVarandaInput.addEventListener("change", () => {

     const TOPICO_IR_VARANDA = 'casa-diego/varanda/ir'

    // verifica de o botão esta como ligado
    const ligado = irVarandaInput.checked === true;

    if (ligado === true) {
         cliente.publish(TOPICO_IR_VARANDA, 'Ligada')
        irVarandaTexto.innerHTML = "Ligada";
    } else {
           cliente.publish(TOPICO_IR_VARANDA, 'Desligada')
        irVarandaTexto.innerHTML = "Desligada";
    }
});
});