class AppFooterCtrl {
    constructor (MyConfig) {
        'ngInject';

        this.appName = MyConfig.appName;
    }
}

const AppFooter = {
    controller: AppFooterCtrl,
    templateUrl: 'layout/footer.html'
};

export default AppFooter;
