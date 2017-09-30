export class AppInitialization {
    constructor($urlMatcherFactory, $transitions, $rootScope) {
        $urlMatcherFactory.caseInsensitive(true);
        $urlMatcherFactory.strictMode(false);

        $transitions.onSuccess({ to: '**' }, function(trans) {
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