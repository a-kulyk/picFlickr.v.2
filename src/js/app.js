import angular from 'angular';
import 'angular-ui-router';
import 'angular-animate';

import constants from './config/app.constants';
import appComponent from './app.component';
import appRun from './config/app.run';

import './config/app.templates';
import './layout';
import './home';
import './services';
import './gallery';

const requires = [
    'ui.router',
    'ngAnimate',
    'templates',
    'app.layout',
    'app.home',
    'app.gallery',
    'app.services'
];

window.app = angular
    .module('app', requires)
    .constant('MyConfig', constants)
    .component('app', appComponent)
    .run(appRun);

angular.bootstrap(document, ['app'], {
    strictDi: true
});
