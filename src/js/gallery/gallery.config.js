function GalleryConfig ($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('gallery', {
            url: '/gallery/:search_request/:farm/:server/:id/:secret',
            controller: 'GalleryCtrl',
            controllerAs: 'vm',
            templateUrl: 'gallery/gallery.html',
            title: 'Gallery',
            resolve: { currentPhotoIndex }
        });

    // Resolving to get all photo's data
    function currentPhotoIndex ($stateParams, FlickrService, MyConfig) {
        const index = FlickrService.getPhotos().photos.findIndex(photo => photo.id === $stateParams.id);

        if (index < MyConfig.zero) {
            FlickrService.search($stateParams.search_request);
            return MyConfig.zero;
        }
        return FlickrService.getPhotos().photos.findIndex(photo => photo.id === $stateParams.id);
    }
}

export default GalleryConfig;
