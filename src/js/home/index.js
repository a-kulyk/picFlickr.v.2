import angular from 'angular';
import HomeConfig from './home.config';
import HomeCtrl from './home.controller';

const homeModule = angular
	.module('app.home', [])
	.config(HomeConfig)
	.controller('HomeCtrl', HomeCtrl);

export default homeModule;
