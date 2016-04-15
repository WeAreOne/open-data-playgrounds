import React, {Component, StyleSheet, View, ScrollView, TouchableHighlight, Text} from 'react-native';
import UserService from '../services/UserService';

const styles = StyleSheet.create({
    page: {
        paddingTop: 65
    }
})

export default class SideBar extends Component {
    constructor () {
        super();

        this.state = {
        };
    }
    _login() {
        UserService.login().then(userData => console.log(userData));
    }
    _logout() {
        UserService.logout();
    }
    render() {
        let isAuth = UserService.isAuth();

        return (
            <View style={styles.page}>
                <Text>Sidebar</Text>
                <Text>User is auth : {isAuth ? 'Logged' : 'Not logged'}</Text>
                <TouchableHighlight onPress={this._login.bind(this)}>
                    <Text>Log me in</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={this._logout.bind(this)}>
                    <Text>Log me out</Text>
                </TouchableHighlight>
            </View>
        )
    }
}