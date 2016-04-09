import realm from '../database/Realm';

export default class MapService {
    static URL = 'https://ge.ch/sitgags1/rest/services/VECTOR/SITG_OPENDATA_04/MapServer/6592/query?where=@where@&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=SPORT%2C+TYPE%2C+COMMUNE%2C+NCOM%2C+CODE%2C+LIEN_FICHE_DESCRIPTIVE%2C+LIEN_PHOTOS&returnGeometry=true&returnTrueCurves=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson';
    static URL_SPORTS = 'https://ge.ch/sitgags1/rest/services/VECTOR/SITG_OPENDATA_04/MapServer/6592/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=SPORT&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=true&resultOffset=&resultRecordCount=&f=pjson';
    static URL_CITIES = 'https://ge.ch/sitgags1/rest/services/VECTOR/SITG_OPENDATA_04/MapServer/6592/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=COMMUNE%2C+SPORT&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=COMMUNE&outStatistics=%5B%0D%0A++%7B%0D%0A++++%22statisticType%22%3A+%22count%22%2C%0D%0A++++%22onStatisticField%22%3A+%22SPORT%22%2C%0D%0A++++%22outStatisticFieldName%22%3A+%22NBSPORT%22%0D%0A++%7D%0D%0A%5D&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson';
    static URL_TRANSFORM = 'http://geodesy.geo.admin.ch/reframe/lv95towgs84';

    static init() {
        /*realm.write(() => {
           realm.deleteAll();
        });*/
        if (!realm.objects('Playground').length) {
            this.getAll().then(res => {
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
                })
            });
        }
        if (!realm.objects('City').length) {
            fetch(this.URL_CITIES).then(res => res.json()).then(res => {
                realm.write(() => {
                    res.features.forEach(c => {
                        realm.create('City', {
                            name: c.attributes.COMMUNE,
                            nbSport: c.attributes.NBSPORT,
                        })
                    })
                })
            });
        }
        if(!realm.objects('Sport').length) {
            fetch(this.URL_SPORTS).then(res => res.json()).then(res => {
                realm.write(() => {
                    res.features.forEach(s => {
                        realm.create('Sport', {
                            name: s.attributes.SPORT
                        })
                    })
                })
            });
        }
    }

    static getAll() {
        let allUrl = this.URL.replace(/@where@/g, '1=1');
        return fetch(allUrl).then(res => res.json());
    }
    static getBySport(pSport) {
        return Promise.resolve(realm.objects('Playground').filtered(`sport == "${pSport}"`));
    }
    static getByCity(pCity) {
        return Promise.resolve(realm.objects('Playground').filtered(`commune == "${pCity}"`));
    }
    static getAllSport() {
        return Promise.resolve(realm.objects('Sport'));
    }
    static getAllCity() {
        return Promise.resolve(realm.objects('City'));
    }
    static transform(point) {
        return fetch(this.URL_TRANSFORM+`?easting=${point.x}&northing=${point.y}&format=json`)
            .then(res => res.json());
    }
}