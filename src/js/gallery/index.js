import angular from 'angular';
import uiRouter from 'angular-ui-router';

const galleryModule = angular.module('app.gallery', [uiRouter]);

// Include our UI-Router config settings
import GalleryConfig from './gallery.config';
galleryModule.config(GalleryConfig);

import GalleryCtrl from './gallery.controller';
galleryModule.controller('GalleryCtrl', GalleryCtrl);

export default galleryModule;
