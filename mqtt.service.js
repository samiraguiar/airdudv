const mqtt = require("mqtt");
const uuid = require('uuid');
const topicoEnvio = 'comandos';
const topicoRecebimento = 'consultas';

const comandos = {
    abrirReservatorio: 'ABRIR',
    fecharReservatorio: 'FECHAR',
    aguar: 'AGUAR',
    obterDashboard: 'DASHBOARD',
    obterPlantas: 'PLANTA',
    obterAbastecimento: 'ABASTECIMENTO'
};

module.exports = class MqttService {
    constructor() {
        this.client  = mqtt.connect('mqtt://iot.eclipse.org');

        this.client.on('connect', () => {
            this.client.subscribe(topicoRecebimento);
        });

        this.client.on('message', this.onMessage);

        this.subscribers = {};
    }

    enviarMensagem(client, mensagem) {
        let guid = uuid.v4();

        return new Promise((resolve, reject) => {
            client.publish(topicoEnvio, mensagem);

            this.subscribers[guid] = function(data) {
                resolve(data);
                delete this.subscribers[guid];
            };
        });
    }

    abrirReservatorio() {
        return this.enviarMensagem(this.client, comandos.abrirReservatorio);
    }

    fecharReservatorio() {
        return this.enviarMensagem(this.client, comandos.fecharReservatorio);
    }

    aguar() {
        return this.enviarMensagem(this.client, comandos.aguar);
    }

    obterDashboard() {
        return this.enviarMensagem(this.client, comandos.obterDashboard);
    }

    obterPlantas() {
        return this.enviarMensagem(this.client, comandos.obterPlantas);
    }

    obterAbastecimento() {
        return this.enviarMensagem(this.client, comandos.obterAbastecimento);
    }

    onMessage(topic, message) {
        if (topic === topicoRecebimento) {
            console.log(String.fromCharCode.apply(null, message));

            if (message.guid) {
                this.subscribers[guid](message);
            }
        }
    }
}