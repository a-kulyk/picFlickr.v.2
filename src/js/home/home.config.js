function HomeConfig ($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            templateUrl: 'home/home.html',
            title: 'Home'
        })
        .state('search', {
            url: '/:search_request/:page',
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            templateUrl: 'home/home.html',
            title: 'Search'
        });
}

export default HomeConfig;
