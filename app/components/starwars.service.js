'use strict'

export default class StarWarsService {

    static get $inject() { return ['$http'] }

    constructor($http) {
        this.$http = $http;
        this.currentPage = 1;
        this.url = 'https://swapi.co/api/people/?page='
        this.prevUrl = '';
    }

    getAllCharacterData(){

        return this.$http({
            method: 'GET',
            url: this.url + this.currentPage
        }).then((response) => {
            return response.data.results;
        });
    }

    getAllFilmData(films){
        let filmData = [];
        let filmUrl = this.createRequestArray(films);

        return Promise.all(filmUrl).then((results)=>{
            results.forEach((elem)=> {
                let data = elem.data;
                filmData.push(data);
            })
            return filmData;
        })
    }

    createRequestArray(films){
        let filmUrl = [];

        films.forEach((elem) => {
            filmUrl.push(this.$http({
                method: 'GET',
                url: elem
            }));
        });

        return filmUrl
    }
}