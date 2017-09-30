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
        return [
            'apiService'
        ];
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

export function register(appModule) {
    appModule.component('plantaInfoComponent', new PlantaInfoComponent());
}