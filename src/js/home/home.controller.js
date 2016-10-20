class HomeCtrl {
    constructor ($state, $stateParams, $location, $anchorScroll, MyConfig, FlickrService) {
        'ngInject';

        this.$state = $state;
        this.$location = $location;
        this.$anchorScroll = $anchorScroll;
        this.FlickrService = FlickrService;
        this.MyConfig = MyConfig;
        this.req = $stateParams.search_request || MyConfig.defaultRequest;
        this.page = $stateParams.page || MyConfig.one;
        this.currPage = FlickrService.getPhotos().currPage;
        this.allPages = FlickrService.getPhotos().allPages;
        this.search(this.req, this.page);
    }
    search (req, page) {
        this.loading = true;
        this.FlickrService.search(req, page)
            .then(() => {
                this.loading = false;
                const result = this.FlickrService.getPhotos();
console.log(result);
                Object.assign(this, result);
            });
    }
    openPhoto (index) {
        this.currentPhotoId = this.photos[index].id;
        this.$state.go('gallery', {'search_request': this.req, 'id': this.currentPhotoId});
    }
    goTop () {
        this.$anchorScroll();
    }
}

export default HomeCtrl;
