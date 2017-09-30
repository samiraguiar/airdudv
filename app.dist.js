webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_router__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_initialization__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_services_safeApply__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_services_api_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard_component__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__abastecimento_abastecimento_component__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__abastecimento_abastecimento_info_component__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__planta_planta_component__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__planta_planta_info_component__ = __webpack_require__(12);
__webpack_require__(1);













let appModule = angular.module('app', ['ui.router', 'angularCSS']).config(__WEBPACK_IMPORTED_MODULE_0__app_router__["a" /* AppRouter */]).run(__WEBPACK_IMPORTED_MODULE_1__app_initialization__["a" /* AppInitialization */]);

__WEBPACK_IMPORTED_MODULE_2__common_services_safeApply__["a" /* register */](appModule);
__WEBPACK_IMPORTED_MODULE_3__common_services_api_service__["a" /* register */](appModule);

__WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard_component__["a" /* register */](appModule);
__WEBPACK_IMPORTED_MODULE_5__abastecimento_abastecimento_component__["a" /* register */](appModule);
__WEBPACK_IMPORTED_MODULE_6__abastecimento_abastecimento_info_component__["a" /* register */](appModule);
__WEBPACK_IMPORTED_MODULE_7__planta_planta_component__["a" /* register */](appModule);
__WEBPACK_IMPORTED_MODULE_8__planta_planta_info_component__["a" /* register */](appModule);

angular.bootstrap(angular.element(document.getElementsByTagName('body')), [appModule.name], { strictDi: true });

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const states = [{
    name: 'root',
    url: '/',
    redirectTo: 'dashboard'
}, {
    name: 'dashboard',
    url: '/dashboard',
    template: '<dashboard></dashboard>',
    data: {
        pageTitle: "Dashboard",
        pageDescription: "Dashboard com as medições atuais"
    }
}, {
    name: 'planta',
    url: '/planta',
    template: '<planta></planta>',
    data: {
        pageTitle: "Plantas",
        pageDescription: "Medições das plantas"
    }
}, {
    name: 'abastecimento',
    url: '/abastecimento',
    template: '<abastecimento></abastecimento>',
    data: {
        pageTitle: "Abastecimento",
        pageDescription: "Informações atuais de abastecimento"
    }
}];

class AppRouter {
    constructor($locationProvider, $stateProvider) {
        $locationProvider.html5Mode(true);
        states.forEach(function (state) {
            $stateProvider.state(state);
        });
    }

    static get $inject() {
        return ['$locationProvider', '$stateProvider'];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AppRouter;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AppInitialization {
    constructor($urlMatcherFactory, $transitions, $rootScope) {
        $urlMatcherFactory.caseInsensitive(true);
        $urlMatcherFactory.strictMode(false);

        $transitions.onSuccess({ to: '**' }, function (trans) {
            var targetState = trans.$to();

            $rootScope.currentRoute = targetState.name;
            $rootScope.pageTitle = targetState.data.pageTitle;
            $rootScope.pageDescription = targetState.data.pageDescription;
        });
    }

    static get $inject() {
        return ['$urlMatcherFactory', '$transitions', '$rootScope'];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AppInitialization;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = register;
function safeApplyService() {
    return function ($scope, fn) {
        let phase = $scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn) {
                $scope.$eval(fn);
            }
        } else {
            if (fn) {
                $scope.$apply(fn);
            } else {
                $scope.$apply();
            }
        }
    };
}

function register(appModule) {
    appModule.service('safeApply', safeApplyService);
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = register;
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

function register(appModule) {
    appModule.service('apiService', ApiService);
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = register;
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
        return ['$scope', 'safeApply', 'apiService'];
    }
}

class DashboardComponent {
    constructor() {
        this.templateUrl = './app/dashboard/dashboard.component.html';
        this.controller = DashboardController;
        this.controllerAs = 'dashboardCtrl';
    }
}

function register(appModule) {
    appModule.component('dashboard', new DashboardComponent());
}

var obterValorComPadding = valor => {
    return valor >= 10 ? valor.toString() : '0' + valor;
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = register;
class AbastecimentoController {
    constructor(apiService) {
        apiService.obterDadosAbastecimento().then(data => {
            this.informacoes = data;
        });
    }

    alternarInformacao(index) {
        this.informacoes[index].exibir = !this.informacoes[index].exibir;
    }

    static get $inject() {
        return ['apiService'];
    }
}

class AbastecimentoComponent {
    constructor() {
        this.templateUrl = './app/abastecimento/abastecimento.component.html';
        this.controller = AbastecimentoController;
        this.controllerAs = 'abastecimentoCtrl';
    }
}

function register(appModule) {
    appModule.component('abastecimento', new AbastecimentoComponent());
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = register;
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
        return ['apiService'];
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

function register(appModule) {
    appModule.component('abastecimentoInfoComponent', new AbastecimentoInfoComponent());
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = register;
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
        return ['apiService'];
    }
}

class PlantaComponent {
    constructor() {
        this.templateUrl = './app/planta/planta.component.html';
        this.controller = PlantaController;
        this.controllerAs = 'plantaCtrl';
    }
}

function register(appModule) {
    appModule.component('planta', new PlantaComponent());
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = register;
class PlantaInfoController {
    constructor(apiService) {
        this.apiService = apiService;
    }

    obterEstiloBorda() {
        return {
            'border-color': this.model ? this.model.borda : ''
        };
    }

    aguarPlanta() {
        this.apiService.aguarPlanta().then(() => {
            alert('planta aguada');
        });
    }

    static get $inject() {
        return ['apiService'];
    }
}

class PlantaInfoComponent {
    constructor() {
        this.templateUrl = './app/planta/planta-info.component.html';
        this.controller = PlantaInfoController;
        this.controllerAs = 'plantaInfoCtrl';
        this.css = './app/planta/planta-info.component.css';

        this.bindings = {
            model: '<'
        };
    }
}

function register(appModule) {
    appModule.component('plantaInfoComponent', new PlantaInfoComponent());
}

/***/ })
],[2]);