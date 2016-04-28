import realm from '../database/Realm';

export default class MapService {
    URL_CSV = "http://91.121.75.171:9200/_search";
    URL = 'https://ge.ch/sitgags1/rest/services/VECTOR/SITG_OPENDATA_04/MapServer/6592/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=SPORT%2C+TYPE%2C+COMMUNE%2C+NCOM%2C+CODE%2C+LIEN_FICHE_DESCRIPTIVE%2C+LIEN_PHOTOS&returnGeometry=true&returnTrueCurves=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson';
    URL_SPORTS = 'https://ge.ch/sitgags1/rest/services/VECTOR/SITG_OPENDATA_04/MapServer/6592/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=SPORT&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=true&resultOffset=&resultRecordCount=&f=pjson';
    URL_CITIES = 'https://ge.ch/sitgags1/rest/services/VECTOR/SITG_OPENDATA_04/MapServer/6592/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=COMMUNE%2C+SPORT&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=COMMUNE&outStatistics=%5B%0D%0A++%7B%0D%0A++++%22statisticType%22%3A+%22count%22%2C%0D%0A++++%22onStatisticField%22%3A+%22SPORT%22%2C%0D%0A++++%22outStatisticFieldName%22%3A+%22NBSPORT%22%0D%0A++%7D%0D%0A%5D&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson';
    static URL_TRANSFORM = 'http://geodesy.geo.admin.ch/reframe/lv95towgs84';

    static init() {
        let service = new MapService();

        if (!realm.objects('Playground').length) {
            return service._initPlaygrounds().then(() => { return service._initSport()}).then(() => {return service._initCity()});
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
                    return root.hits.hits.map(function(el) {
                        return {
                            SPORT: el._source.SPORT,
                            TYPE: el._source.TYPE,
                            COMMUNE: el._source.COMMUNE,
                            NCOM: el._source.NCOM,
                            LIEN_FICHE_DESCRIPTIVE: el._source.LIEN_FICHE_DESCRIPTIVE,
                            LIEN_PHOTOS: el._source.LIEN_PHOTOS,
                            E: Number.isNaN(el._source.E) ? 0 : +el._source.E,
                            N: Number.isNaN(el._source.N) ? 0 : +el._source.N
                        }
                    });
                })(res);

                realm.write(() => {
                    data.forEach(p => {
                        if (p.SPORT !== 'SPORT')
                            realm.create('Playground', {
                                sport: p.SPORT,
                                commune: p.COMMUNE,
                                type: p.TYPE,
                                ncom: p.NCOM,
                                lienFicheDesc: p.LIEN_FICHE_DESCRIPTIVE,
                                lienPhotos: p.LIEN_PHOTOS,
                                x: p.E,
                                y: p.N,
                            })
                    })
                });
                resolve();
            });
        })
    };

    _initCity() {
        return new Promise(resolve => {
            fetch(this.URL_CITIES).then(res => res.json()).then(res => {
                realm.write(() => {
                    res.features.forEach(c => {
                        realm.create('City', {
                            name: c.attributes.COMMUNE,
                            nbSport: c.attributes.NBSPORT,
                        })
                    })
                });
                resolve();
            });
        });
    };

    _initSport() {
        return new Promise(resolve => {
            fetch(this.URL_SPORTS).then(res => res.json()).then(res => {
                realm.write(() => {
                    res.features.forEach(s => {
                        realm.create('Sport', {
                            name: s.attributes.SPORT
                        })
                    })
                })
                resolve();
            });
        });
    };

    static countSport() {
        return realm.objects('Playground').length;
    }
    static getAllSport() {
        return Promise.resolve(realm.objects('Sport'));
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