function GalleryConfig ($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('gallery', {
            url: '/gallery/:search_request/:id',
            controller: 'GalleryCtrl',
            controllerAs: 'vm',
            templateUrl: 'gallery/gallery.html',
            title: 'Gallery',
            resolve: { currentPhotoIndex }
        });

    // Resolving to get all photo's data
    function currentPhotoIndex ($stateParams, FlickrService) {
        // console.log('in GalleryConfig');
        console.log(FlickrService.getPhotos().photos.findIndex(photo => photo.id === $stateParams.id));
        return FlickrService.getPhotos().photos.findIndex(photo => photo.id === $stateParams.id);
    }
}

export default GalleryConfig;
