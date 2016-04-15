import Firebase from 'firebase';
import realm from '../database/Realm';


export default class UserService {
    static _ref = new Firebase("https://odp-0001.firebaseio.com");

    static auth() {
        let auth = realm.objects('Auth');
        if (auth.length) {
            this._ref.authWithCustomToken(auth[0].token, (error, authData) => {
                if (error) console.log(error);
            })
        }
    }

    static isAuth() {
        return this._ref.getAuth();
    }

    static login() {
        return new Promise((resolve, reject) => {
            this._ref.authWithPassword({
                email    : "florian@weareone.ch",
                password : "theflop04"
            },
            function(error, authData) {
                if (error) {
                    reject(error)
                } else {
                    realm.write(() => {
                        realm.create('Auth', {
                            token: authData.token
                        })
                    });
                    resolve(authData);
                }
            })
        })
    }

    static logout(){
        this._ref.unauth();
        realm.write(() => {
            realm.delete(realm.objects('Auth'));
        })
    }
}