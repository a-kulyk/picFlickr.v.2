import angular from 'angular';
import Clipboard from './clipboard.service';
import FlickrService from './flickr.service';
import Paginator from './paginator.service';

const servicesModule = angular
	.module('app.services', [])
	.service('Clipboard', Clipboard)
	.service('FlickrService', FlickrService)
	.service('Paginator', Paginator);

export default servicesModule;
