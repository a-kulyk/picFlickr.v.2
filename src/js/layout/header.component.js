class AppHeaderCtrl {
    constructor ($state, MyConfig, User) {
        'ngInject';

        this.$state = $state;
        this.MyConfig = MyConfig;
        this.User = User;
        this.appName = MyConfig.appName;
    }
    search (req) {
        this.$state.go('search', {'search_request': req, 'page': this.MyConfig.one});
    }
    login () {
        this.User.facebookLogin();
    }
}

const AppHeader = {
    templateUrl: 'layout/header.html',
    controller: AppHeaderCtrl
};

export default AppHeader;
