import angular from 'angular';
import AppHeader from './header.component';
import AppFooter from './footer.component';

const layoutModule = angular
	.module('app.layout', [])
	.component('appHeader', AppHeader)
	.component('appFooter', AppFooter);

export default layoutModule;
