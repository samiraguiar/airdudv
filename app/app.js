require('angular');

import { AppRouter } from './app.router';
import { AppInitialization } from './app.initialization';

import * as safeApplyService from './common/services/safeApply';
import * as apiService from './common/services/api.service';

import * as dashboardComponent from './dashboard/dashboard.component';
import * as abastecimentoComponent from './abastecimento/abastecimento.component';
import * as abastecimentoInfoComponent from './abastecimento/abastecimento-info.component';
import * as plantaComponent from './planta/planta.component';
import * as plantaInfoComponent from './planta/planta-info.component';

let appModule = angular.module('app', ['ui.router', 'angularCSS'])
                       .config(AppRouter)
                       .run(AppInitialization);

safeApplyService.register(appModule);
apiService.register(appModule);

dashboardComponent.register(appModule);
abastecimentoComponent.register(appModule);
abastecimentoInfoComponent.register(appModule);
plantaComponent.register(appModule);
plantaInfoComponent.register(appModule);

angular.bootstrap(
    angular.element(document.getElementsByTagName('body')),
    [appModule.name],
    { strictDi: true }
);