'use strict'

import template from './character-details.html';
import './character-details.css';
import isEmpty from 'lodash/isEmpty';

export class CharacterDetailsComponent {
    static get $inject() {return ['starWarsService','$state', '$scope']}

    constructor(starWarsService, $state, $scope){
        this.starWarsService = starWarsService;
        this.$state = $state;
        this.$scope = $scope
        this.person = this.$state.current.data.character;
        this.movies = this.person.films
        this.movieDetails = [];
    }

    $onInit(){
        this.getFilms();
    }

    getFilms(){
       this.starWarsService.getAllFilmData(this.movies).then((results) => {
            this.movieDetails = results;
            this.$scope.$applyAsync();
        });
 
    }

}

export const characterDetailsConfig = {
    template: template,
    controller: CharacterDetailsComponent
  }
  