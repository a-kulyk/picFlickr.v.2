import angular from 'angular';

// Create the module where our functionality can attach to
const servicesModule = angular.module('app.services', []);

// Services
import Clipboard from './clipboard.service';
import FlickrService from './flickr.service';
import Paginator from './paginator.service';
servicesModule.service('Clipboard', Clipboard);
servicesModule.service('FlickrService', FlickrService);
servicesModule.service('Paginator', Paginator);

export default servicesModule;
