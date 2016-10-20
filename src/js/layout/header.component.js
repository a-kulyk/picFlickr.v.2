class AppHeaderCtrl {
    constructor ($state, MyConfig) {
        'ngInject';

        this._$state = $state;
        this.MyConfig = MyConfig;
        this.appName = MyConfig.appName;
    }
    search (req) {
        this._$state.go('search', {'search_request': req, 'page': this.MyConfig.one});
    }
}

const AppHeader = {
    templateUrl: 'layout/header.html',
    controller: AppHeaderCtrl
};

export default AppHeader;
