import React, {Component, StyleSheet, View, ScrollView, TouchableHighlight, Text, Image, Platform} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

// App
import UserService from '../services/UserService';
import MapService from '../services/MapService';
import LoginForm from './LoginForm';

const styles = StyleSheet.create({
    page: {
        paddingTop: 65,
        flex: 1,
        backgroundColor: 'transparent'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'cover',
    },
    title: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '100',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : undefined,
        padding: 15
    },
    logout: {
        marginTop: 50,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    logout_text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '300',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    }
});

export default class SideBar extends Component {
    constructor () {
        super();

        this.state = {
            loggedIn: false,
            loading: false
        };

        this.debug = false;
    }
    componentWillMount() {
        let loggedIn = UserService.isAuth();
        this.setState({loggedIn});
    }
    _login(username, password) {
        this.setState({loading: true});
        UserService.login(username, password).then(() => {
            this.setState({loggedIn: true, loading: false})
        });
    }
    _createAccount(username, password) {
        this.setState({loading: true});
        UserService.createAccount(username, password).then(() => {
            this.setState({loggedIn: true, loading: false})
        });
    }
    _logout() {
        UserService.logout();
        this.setState({loggedIn: false});
    }
    _emptydb() {
        MapService.emptyDb();
    }
    render() {
        let empty = this.debug ? (<TouchableHighlight onPress={this._emptydb} style={styles.logout}>
            <Text style={styles.logout_text}>EMPTY DB</Text>
        </TouchableHighlight>) : null;
        return (
            <View style={styles.page}>
                <Spinner visible={this.state.loading} color="red" />
                <Image source={{uri: 'city_bg_portrait', isStatic: true}} style={styles.background}/>

                <Text style={styles.title}>
                    {this.state.loggedIn ? 'Already logged in' : 'Log in'}
                </Text>
                {
                    !this.state.loggedIn ?
                        (
                           <LoginForm login={this._login.bind(this)} createAccount={this._createAccount.bind(this)}/>
                        ) :
                        (
                            <TouchableHighlight onPress={this._logout.bind(this)} style={styles.logout}>
                                <Text style={styles.logout_text}>Log me out</Text>
                            </TouchableHighlight>
                        )
                }
                {
                    empty
                }
            </View>
        )
    }
}