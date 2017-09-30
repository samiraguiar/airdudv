class DashboardController {
    constructor($scope, safeApply, apiService) {
        this.$scope = $scope;
        this.safeApply = safeApply;
        this.apiService = apiService;

        this.obterInformacoesDashboard();
    }

    obterData() {
        let dataAtual = new Date();

        let dia = obterValorComPadding(dataAtual.getDay() + 1);
        let mes = obterValorComPadding(dataAtual.getMonth() + 1);
        let ano = dataAtual.getFullYear();

        let hora = obterValorComPadding(dataAtual.getHours());
        let minuto = obterValorComPadding(dataAtual.getMinutes());

        return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
    }

    obterInformacoesDashboard() {
        this.apiService.obterDadosDashboard().then(data => {
            this.informacoes = data;
        });
    }

    $onDestroy() {
        clearInterval(this.idAtualizadorScope);
    }

    $postLink() {
        this.idAtualizadorScope = setInterval(() => {
            this.safeApply(this.$scope);
        }, 1000);
    }

    static get $inject() {
        return [
            '$scope',
            'safeApply',
            'apiService'
        ];
    }
}

class DashboardComponent {
    constructor() {
        this.templateUrl = './app/dashboard/dashboard.component.html';
        this.controller = DashboardController;
        this.controllerAs = 'dashboardCtrl';
    }
}

export function register(appModule) {
    appModule.component('dashboard', new DashboardComponent());
}

var obterValorComPadding = (valor) => {
    return valor >= 10 ? valor.toString() : '0' + valor;
}