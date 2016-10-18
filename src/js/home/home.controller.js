class HomeCtrl {
    constructor ($state, $stateParams, $scope, $location, $anchorScroll, $log, Clipboard, MyConfig, FlickrService) {
        'ngInject';

        this.$state = $state;
        this.$scope = $scope;
        this.$location = $location;
        this.$anchorScroll = $anchorScroll;
        this.FlickrService = FlickrService;
        this.$log = $log;
        this.Clipboard = Clipboard;
        this.MyConfig = MyConfig;
        this.title = $state.current.title;
        this.req = $stateParams.search_request;
        this.page = $stateParams.page || MyConfig.one;
        this.search(this.req, this.page);
    }
    search (req, page) {
        this.FlickrService.search(req, page)
            .then(() => {
                const result = this.FlickrService.getPhotos();

                Object.assign(this, result);
                console.log(this.pageNav);
            });
    }
}

export default HomeCtrl;
