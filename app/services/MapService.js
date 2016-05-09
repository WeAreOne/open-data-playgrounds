import realm from '../database/Realm';

export default class MapService {
    URL_CSV = "http://91.121.75.171:9200/_search";
    static URL_TRANSFORM = 'http://geodesy.geo.admin.ch/reframe/lv95towgs84';

    static init() {
        let service = new MapService();

        if (!realm.objects('Playground').length) {
            return service._initPlaygrounds();
        } else {
            return Promise.resolve(0);
        }
    }

    static emptyDb() {
       realm.write(() => {
            realm.deleteAll();
       });
    }

    _initPlaygrounds() {
        return new Promise(resolve => {
            let query = {
                "from": 0,
                "size": 3000,
                "query": {
                    "match_all": {}
                }
            };
            fetch(this.URL_CSV, {method: "POST", body: JSON.stringify(query)}).then(res => res.json()).then(res => {
                let data = (function(root) {
                    return root.hits.hits.reduce((arr, el) => {
                        if (el._source.SPORT !== 'SPORT') {
                            arr.push({
                                _id: el._id,
                                sport: el._source.SPORT,
                                type: el._source.TYPE,
                                commune: el._source.COMMUNE,
                                ncom: el._source.NCOM,
                                lienFicheDesc: el._source.LIEN_FICHE_DESCRIPTIVE,
                                lienPhotos: el._source.LIEN_PHOTOS,
                                x: Number.isNaN(el._source.E) ? 0 : +el._source.E,
                                y: Number.isNaN(el._source.N) ? 0 : +el._source.N
                            });
                        }
                        return arr;
                    }, []);
                })(res);
                let sport = (function(root) {
                    return root.hits.hits.reduce((arr, el) => {
                        let sport = el._source.SPORT;
                        if (arr.map(s => s.name).indexOf(sport) === -1 && sport !== 'SPORT') {
                            arr.push({name: sport});
                        }
                        return arr;
                    }, [])
                })(res);
                let city = (function(root) {
                    return root.hits.hits.reduce((arr, el) => {
                        let commune = el._source.COMMUNE;
                        if (arr.map(c => c.name).indexOf(commune) === -1 && commune !== 'COMMUNE') {
                            arr.push({name: commune, nbSport: 1});
                        } else {
                            let index = arr.map(c => c.name).indexOf(commune);
                            if (arr[index]) {
                                arr[index].nbSport += 1;
                            }
                        }
                        return arr;
                    }, [])
                })(res);

                realm.write(() => {
                    console.log('Inserting Playground');
                    data.forEach(p => {
                        realm.create('Playground', p)
                    });

                    console.log('Inserting City');
                    city.forEach(c => {
                        realm.create('City', c)
                    });

                    console.log('Inserting Sport');
                    sport.forEach(s => {
                        realm.create('Sport', s)
                    })
                });
                resolve();
            });
        })
    };

    static countSport() {
        return realm.objects('Playground').length;
    }
    static getAllSport() {
        return Promise.resolve(realm.objects('Sport').sorted('name'));
    }
    static getAllCity() {
        return Promise.resolve(realm.objects('City'));
    }
    static search(search, offset, size) {
        let playgrounds = realm.objects('Playground');
        if (search.city.name !== 'ANY CITY') {
            playgrounds = playgrounds.filtered(`commune ==[c] "${search.city.name}"`)
        }
        if (search.sport.name !== 'ANY SPORT') {
            playgrounds = playgrounds.filtered(`sport ==[c] "${search.sport.name}"`)
        }
        if (offset !== undefined && size) {
            playgrounds = playgrounds.slice(offset, offset + size);
        }
        return Promise.resolve(playgrounds);
    }
    static transform(point) {
        return fetch(this.URL_TRANSFORM+`?easting=${point.x}&northing=${point.y}&format=json`)
            .then(res => res.json());
    }
}