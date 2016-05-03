import realm from '../database/Realm';

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
    static history () {
        return Promise.resolve(realm.objects('SearchHistory'));
    }
    static save() {
        realm.write(() => {
            realm.create('SearchHistory', {city: this.search.city.name, sport: this.search.sport.name, date: new Date()});
        });
    }
}