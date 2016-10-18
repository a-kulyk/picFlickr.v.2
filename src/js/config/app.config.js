function AppConfig ($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
    'ngInject';

    // $locationProvider.html5Mode(true);

    $stateProvider
        .state('app', {
            url: '/',
            templateUrl: 'home/home.html',
            // controller: 'HomeCtrl',
            // controllerAs: 'main',
            title: 'Home'
        });

    $urlRouterProvider.otherwise('/');
}

export default AppConfig;
