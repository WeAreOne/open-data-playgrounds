export default class MapService {
    static URL = 'https://ge.ch/sitgags1/rest/services/VECTOR/SITG_OPENDATA_04/MapServer/6592/query?where=@{where}&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=SPORT%2C+TYPE%2C+COMMUNE%2C+NCOM%2C+LIEN_FICHE_DESCRIPTIVE%2C+LIEN_PHOTOS&returnGeometry=true&returnTrueCurves=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson';
    static URL_SPORTS = 'https://ge.ch/sitgags1/rest/services/VECTOR/SITG_OPENDATA_04/MapServer/6592/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=SPORT&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=true&resultOffset=&resultRecordCount=&f=pjson';
    static URL_TRANSFORM = 'http://geodesy.geo.admin.ch/reframe/lv95towgs84';

    static getAll() {
        let allUrl = this.URL.replace(/@{where}/g, '1=1');
        return fetch(allUrl).then(res => res.json());
    }
    static getBySport(sport) {
        let sportUrl = this.URL.replace(/@{where}/g, `Sport='${sport}'`);
        return fetch(sportUrl).then(res => res.json());
    }
    static getAllSport() {
        return fetch(this.URL_SPORTS).then(res => res.json());
    }
    static transform(point) {
        return fetch(this.URL_TRANSFORM+`?easting=${point.x}&northing=${point.y}&format=json`)
            .then(res => res.json());
    }
}