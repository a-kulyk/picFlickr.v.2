class AppHeaderCtrl {
    constructor ($state, MyConfig) {
        'ngInject';

        this._$state = $state;
        this.appName = MyConfig.appName;
    }
    search (req) {
        this._$state.go('search', {'search_request': req});
    }
}

const AppHeader = {
    templateUrl: 'layout/header.html',
    controller: AppHeaderCtrl
};

export default AppHeader;
