class AbastecimentoController {
    constructor(apiService) {
        apiService.obterDadosAbastecimento().then((data) => {
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

class AbastecimentoComponent {
    constructor() {
        this.templateUrl = './app/abastecimento/abastecimento.component.html';
        this.controller = AbastecimentoController;
        this.controllerAs = 'abastecimentoCtrl';
    }
}

export function register(appModule) {
    appModule.component('abastecimento', new AbastecimentoComponent());
}