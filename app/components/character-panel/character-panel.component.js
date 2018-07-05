'use strict'

import template from './character-panel.html';
import './character-panel.css';

export class CharacterPanelComponent {
    static get $inject() { return ['starWarsService', '$state'] }

    constructor(starWarsService, $state) {
        this.starWarsService = starWarsService;
        this.$state = $state;
        this.characters = [];
        this.nextTenCharacters = '';
        this.currentPage = this.starWarsService.currentPage;
    }

    $onInit() {
        this.getCharacters();
    }

    getCharacters() {
        this.starWarsService.getAllCharacterData().then((response) => {
            this.characters = response;
        })
    }

    navigateToPage(character){
        this.$state.get('character').data.character = character;
        this.$state.go('character', {name: character.name})
    }

    nextCharacters(){
        this.starWarsService.currentPage++
        this.getCharacters();
    }

    prevCharacters(){
        this.starWarsService.currentPage--
        this.getCharacters();
    }

}

export const characterPanelConfig = {
    template: template,
    controller: CharacterPanelComponent
}
