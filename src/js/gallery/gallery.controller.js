class GalleryCtrl {
    constructor ($state, $stateParams, $location, Clipboard, MyConfig, FlickrService, currentPhotoIndex) {
        'ngInject';

        this.$state = $state;
        this.req = $stateParams.search_request;
        this.FlickrService = FlickrService;
        this.Clipboard = Clipboard;
        this.MyConfig = MyConfig;
        this.currIndex = currentPhotoIndex;
        this.fade = false;
        this.currPage = FlickrService.getPhotos().currPage;
        this.currentPhoto = FlickrService.getPhotos().photos[this.currIndex];
        this.availableSizes = FlickrService.getAvailableSizes();
        this.size = FlickrService.getSize();
        this.openPhoto();
    }
    openPhoto () {
        this.currentPhotoSrc = this.FlickrService.getLink();
        // this.currentPhotoSrc = `https://farm${this.currPhoto.farm}.static.flickr.com/${this.currPhoto.server}/${this.currPhoto.id}_${this.currPhoto.secret}_z.jpg`;
    }
    next () {
        if (this.currIndex === this.FlickrService.getPhotos().photos.length - this.MyConfig.one)
            this.FlickrService.search(this.req, this.currPage + this.MyConfig.one)
                .then(() => {
                    const firstPhoto = this.FlickrService.getPhotos().photos[this.MyConfig.zero];

                    this.fade = true;
                    this.$state.go('gallery', {
                        'search_request': this.req,
                        'farm': firstPhoto.farm,
                        'server': firstPhoto.server,
                        'id': firstPhoto.id,
                        'secret': firstPhoto.secret
                    });
                });
        else {
            const nextPhoto = this.FlickrService.getPhotos().photos[this.currIndex + this.MyConfig.one];

            this.$state.go('gallery', {
                'search_request': this.req,
                'farm': nextPhoto.farm,
                'server': nextPhoto.server,
                'id': nextPhoto.id,
                'secret': nextPhoto.secret
            });
        }
    }
    previous () {
        if (this.currIndex === this.MyConfig.zero) {
            if (this.currPage === this.MyConfig.one) return;
            this.FlickrService.search(this.req, this.currPage - this.MyConfig.one)
                .then(() => {
                    const lastPhoto = this.FlickrService.getPhotos().photos[this.MyConfig.perPage - this.MyConfig.one];

                    this.$state.go('gallery', {
                        'search_request': this.req,
                        'farm': lastPhoto.farm,
                        'server': lastPhoto.server,
                        'id': lastPhoto.id,
                        'secret': lastPhoto.secret
                    });
                });
        } else {
            const prevPhoto = this.FlickrService.getPhotos().photos[this.currIndex - this.MyConfig.one];

            this.$state.go('gallery', {
                'search_request': this.req,
                'farm': prevPhoto.farm,
                'server': prevPhoto.server,
                'id': prevPhoto.id,
                'secret': prevPhoto.secret
            });
        }
    }
    copyLink () {
        this.Clipboard.toClipboard(this.currentPhotoSrc);
    }
    onChange (size) {
        this.FlickrService.setSize(size);
        this.openPhoto(this.currIndex);
    }
}

export default GalleryCtrl;
