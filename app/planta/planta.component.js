class PlantaController {
    constructor(apiService) {
        apiService.obterDadosPlantas().then(data => {
            this.informacoes = data;
        });
    }

    alternarInformacao(index) {
        this.informacoes[index].exibir = !this.informacoes[index].exibir;
    }

    static get $inject() {
        return [
            'apiService'
        ];
    }
}

class PlantaComponent {
    constructor() {
        this.templateUrl = './app/planta/planta.component.html';
        this.controller = PlantaController;
        this.controllerAs = 'plantaCtrl';
    }
}

export function register(appModule) {
    appModule.component('planta', new PlantaComponent());
}