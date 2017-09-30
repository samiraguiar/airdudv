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

export function register(appModule) {
    appModule.service('safeApply', safeApplyService);
}