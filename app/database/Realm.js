import Realm from 'realm';

const SportSchema = {
    name: 'Sport',
    properties: {
        name: 'string',
        nbCity: {type: 'int', default: 0}
    }
};

const CitySchema = {
    name: 'City',
    properties: {
        name: 'string',
        nbSport: {type: 'int', default: 0}
    }
};

const PlaygroundSchema = {
    name: 'Playground',
    properties: {
        _id: 'string',
        sport: 'string',
        commune: 'string',
        type: 'string',
        ncom: 'string',
        lienFicheDesc: 'string',
        lienPhotos: 'string',
        x: 'float',
        y: 'float'
    }
};

const AuthSchema = {
    name: 'Auth',
    properties: {
        token: 'string',
        userEmail: 'string',
        userPhoto: 'string'
    }
};

const SearchHistorySchema = {
    name: 'SearchHistory',
    properties: {
        sport: 'string',
        city: 'string',
        date: 'date'
    }
};
export default new Realm({schema: [SportSchema, CitySchema, PlaygroundSchema, AuthSchema, SearchHistorySchema]});