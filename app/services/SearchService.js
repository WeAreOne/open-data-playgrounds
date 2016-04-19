export default class SearchService {
    static search = {
        city: {name: 'ANY CITY'},
        sport: {name: 'ANY SPORT'}
    };

    static setCity(city) {
        this.search.city = city;
    }

    static setSport(sport) {
        this.search.sport = sport;
    }

    static clear() {
        this.search = {
            city: {name: 'ANY CITY'},
            sport: {name: 'ANY SPORT'}
        };
    }
}