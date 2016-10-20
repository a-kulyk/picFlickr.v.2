class GalleryCtrl {
    constructor ($state, $stateParams, $location, Clipboard, MyConfig, FlickrService, currentPhotoIndex) {
        'ngInject';

        this.$state = $state;
        this.req = $stateParams.search_request;
        this.FlickrService = FlickrService;
        this.Clipboard = Clipboard;
        this.MyConfig = MyConfig;
        this.currIndex = currentPhotoIndex;
        this.currPage = FlickrService.getPhotos().currPage;
        this.currentPhoto = FlickrService.getPhotos().photos[this.currIndex];
        this.availableSizes = FlickrService.getAvailableSizes();
        this.size = FlickrService.getSize();
        this.openPhoto(currentPhotoIndex);
    }
    openPhoto (index) {
        this.currentPhotoSrc = this.FlickrService.getLink(index);
        // this.currentPhotoSrc = `https://farm${this.currPhoto.farm}.static.flickr.com/${this.currPhoto.server}/${this.currPhoto.id}_${this.currPhoto.secret}_z.jpg`;
    }
    next () {
        if (this.currIndex === this.FlickrService.getPhotos().photos.length - this.MyConfig.one)
            this.FlickrService.search(this.req, this.currPage + this.MyConfig.one)
                .then(() => {
                    const firstPhotoId = this.FlickrService.getPhotos().photos[this.MyConfig.zero].id;

                    this.$state.go('gallery', {'search_request': this.req, 'id': firstPhotoId});
                });
        else {
            const nextPhotoId = this.FlickrService.getPhotos().photos[this.currIndex + this.MyConfig.one].id;

            this.$state.go('gallery', {'search_request': this.req, 'id': nextPhotoId});
        }
    }
    previous () {
        if (this.currIndex === this.MyConfig.zero) {
            if (this.currPage === this.MyConfig.one) return;
            this.FlickrService.search(this.req, this.currPage - this.MyConfig.one)
                .then(() => {
                    const lastPhotoId = this.FlickrService.getPhotos().photos[this.MyConfig.perPage - this.MyConfig.one].id;

                    this.$state.go('gallery', {'search_request': this.req, 'id': lastPhotoId});
                });
        } else {
            const prevPhotoId = this.FlickrService.getPhotos().photos[this.currIndex - this.MyConfig.one].id;

            this.$state.go('gallery', {'search_request': this.req, 'id': prevPhotoId});
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
