import Firebase from 'firebase';
import realm from '../database/Realm';


export default class UserService {
    static _ref = new Firebase("https://odp-0001.firebaseio.com");

    static auth() {
        let auth = realm.objects('Auth');
        if (auth.length) {
            this._ref.authWithCustomToken(auth[0].token, (error) => {
                if (error) console.log(error);
            })
        }
    }

    static getUser() {
        return realm.objects('Auth')[0];
    }

    static isAuth() {
        return this._ref.getAuth();
    }

    static login(username, password) {
        return new Promise((resolve, reject) => {
            this._ref.authWithPassword({
                email    : username,
                password : password
            },
            function(error, authData) {
                if (error) {
                    reject(error)
                } else {
                    realm.write(() => {
                        realm.delete(realm.objects('Auth'));
                        realm.create('Auth', {
                            token: authData.token,
                            userEmail: authData.password.email,
                            userPhoto: authData.password.profileImageURL
                        })
                    });
                    resolve(authData);
                }
            })
        })
    }
    static createAccount(username, password) {
        return new Promise((resolve, reject) => {
            this._ref.createUser({
                email: username,
                password
            },
            err => {
                if (err) reject(err);
                else {
                    this.login(username, password).then(userData => {
                        resolve(userData);
                    })
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