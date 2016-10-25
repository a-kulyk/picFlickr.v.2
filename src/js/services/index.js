import angular from 'angular';
import Clipboard from './clipboard.service';
import FlickrService from './flickr.service';
import Paginator from './paginator.service';
import TokenService from './token.service';
import UserService from './user.service';

const servicesModule = angular
	.module('app.services', [])
	.service('Clipboard', Clipboard)
	.service('FlickrService', FlickrService)
	.service('Paginator', Paginator)
	.service('TokenService', TokenService)
	.service('User', UserService);

export default servicesModule;
