class ApiService {
    constructor($http) {
        this.$http = $http;
    }

    // -------- Funções de leitura da API ---------------
    obterDadosDashboard() {
        return this.$http.get('/dashboard-data').then(res => {
            return res.data;
        });
    }

    obterDadosAbastecimento() {
        return this.$http.get('/dados-abastecimento').then(res => {
            return res.data;
        });
    }

    obterDadosPlantas() {
        return this.$http.get('/dados-plantas').then(res => {
            return res.data;
        });
    }

    // -------- Funções de escrita na API ---------------
    fecharReservatorio() {
        return this.$http.post('/fechar-abastecimento', {});
    }

    abrirReservatorio() {
        return this.$http.post('/abrir-abastecimento', {});
    }

    aguarPlanta() {
        return this.$http.post('/aguar', {});
    }

    static get $inject() {
        return ['$http'];
    }
}

export function register(appModule) {
    appModule.service('apiService', ApiService);
}