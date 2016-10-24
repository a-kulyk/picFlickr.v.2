import angular from 'angular';
import uiRouter from 'angular-ui-router';
import GalleryConfig from './gallery.config';
import GalleryCtrl from './gallery.controller';

const galleryModule = angular
    .module('app.gallery', [uiRouter])
    .config(GalleryConfig)
    .controller('GalleryCtrl', GalleryCtrl);

export default galleryModule;
