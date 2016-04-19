import React, {Component, StyleSheet, View, ScrollView, TouchableHighlight, Text} from 'react-native';

// App
import UserService from '../services/UserService';
import LoginForm from './LoginForm';

const styles = StyleSheet.create({
    page: {
        paddingTop: 65
    }
});

export default class SideBar extends Component {
    constructor () {
        super();

        this.state = {
            loggedIn: false
        };
    }
    componentWillMount() {
        let loggedIn = UserService.isAuth();
        this.setState({loggedIn});
    }
    _login(username, password) {
        UserService.login(username, password).then(() => {
            this.setState({loggedIn: true})
        });
    }
    _createAccount(username, password) {
        UserService.createAccount(username, password).then(() => {
            this.setState({loggedIn: true})
        });
    }
    _logout() {
        UserService.logout();
        this.setState({loggedIn: false});
    }
    render() {
        let userData = this.state.loggedIn ? UserService.getUser() : {};

        return (
            <View style={styles.page}>
                <Text>Sidebar</Text>
                <Text>User is auth : {this.state.loggedIn ? 'Logged' : 'Not logged'}</Text>
                <Text>{!!userData ? userData.userEmail: ''}</Text>
                {
                    !this.state.loggedIn ?
                        (
                           <LoginForm login={this._login.bind(this)} createAccount={this._createAccount.bind(this)}/>
                        ) :
                        (
                            <TouchableHighlight onPress={this._logout.bind(this)}>
                                <Text>Log me out</Text>
                            </TouchableHighlight>
                        )
                }
            </View>
        )
    }
}