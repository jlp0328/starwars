'use strict';

import './node_modules/angular-material/angular-material.css';

import angular from 'angular';

// Components

import {characterPanelConfig} from './app/components/character-panel/character-panel.component'
import {characterDetailsConfig} from './app/components/character-details/character-details.component'
import {headerConfig} from './app/components/header/header.component'

// Services

import StarWarsService from './app/components/starwars.service';

const app = angular.module('starwars', ['ngMaterial', 'ui.router', 'ngAnimate'])

  app.component('characterPanel', characterPanelConfig);
  app.component('characterDetails', characterDetailsConfig);
  app.component('header', headerConfig);

  app.service('starWarsService', StarWarsService);

  app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

    $stateProvider.state('home', {
      url: '/home',
      template:'<div class="pink-text empty-container">Select a character from the left-hand menu to find out more information</div>'
    })
    .state('character', {
      url: '/character/:name',
      template: '<character-details></character-details>',
      data: {
          character: null
      }
    })

    $urlRouterProvider.otherwise('/home');
}])