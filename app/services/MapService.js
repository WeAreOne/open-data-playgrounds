import realm from '../database/Realm';

export default class MapService {
    URL_CSV = "http://ge.ch/sitg/geodata/SITG/OPENDATA/6592/CSV_UNI_INSTA_SPORT_LIEUX.zip";
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
            fetch(this.URL).then(res => res.json()).then(res => {
                realm.write(() => {
                    res.features.forEach(p => {
                        realm.create('Playground', {
                            sport: p.attributes.SPORT,
                            commune: p.attributes.COMMUNE,
                            type: p.attributes.TYPE,
                            ncom: p.attributes.NCOM,
                            lienFicheDesc: p.attributes.LIEN_FICHE_DESCRIPTIVE,
                            lienPhotos: p.attributes.LIEN_PHOTOS,
                            x: +p.geometry.x,
                            y: +p.geometry.y,
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
    static search(search) {
        let playgrounds = realm.objects('Playground');
        if (search.city.name !== 'ANY CITY') {
            playgrounds = playgrounds.filtered(`commune ==[c] "${search.city.name}"`)
        }
        if (search.sport.name !== 'ANY SPORT') {
            playgrounds = playgrounds.filtered(`sport ==[c] "${search.sport.name}"`)
        }
        return Promise.resolve(playgrounds);
    }
    static transform(point) {
        return fetch(this.URL_TRANSFORM+`?easting=${point.x}&northing=${point.y}&format=json`)
            .then(res => res.json());
    }
}