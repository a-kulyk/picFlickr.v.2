class HomeCtrl {
    constructor ($state, $stateParams, $location, $anchorScroll, MyConfig, FlickrService) {
        'ngInject';

        this.$state = $state;
        this.$location = $location;
        this.$anchorScroll = $anchorScroll;
        this.FlickrService = FlickrService;
        this.MyConfig = MyConfig;
        this.req = $stateParams.search_request || MyConfig.defaultRequest;
        this.page = $stateParams.page;
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
        const photo = this.photos[index];

        this.$state.go('gallery', {'search_request': this.req, 'farm': photo.farm, 'server': photo.server, 'id': photo.id, 'secret': photo.secret});
    }
    goTop () {
        this.$anchorScroll();
    }
}

export default HomeCtrl;
