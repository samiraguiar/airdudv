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

export class AppRouter {
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