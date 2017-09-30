class AbastecimentoInfoController {
    constructor(apiService) {
        this.apiService = apiService;
    }

    abrir() {
        this.apiService.abrirReservatorio().then(() => {
            this.model.status = true;
            alert('reservatorio aberto');
        });
    }

    fechar() {
        this.apiService.fecharReservatorio().then(() => {
            this.model.status = false;
            alert('reservatorio fechado');
        });
    }

    static get $inject() {
        return [
            'apiService'
        ];
    }
}

class AbastecimentoInfoComponent {
    constructor() {
        this.templateUrl = './app/abastecimento/abastecimento-info.component.html';
        this.controller = AbastecimentoInfoController;
        this.controllerAs = 'abastecimentoInfoCtrl';
        this.css = './app/planta/planta-info.component.css';

        this.bindings = {
            model: '<'
        };
    }
}

export function register(appModule) {
    appModule.component('abastecimentoInfoComponent', new AbastecimentoInfoComponent());
}