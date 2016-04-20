import React, {Component, StyleSheet, View, ScrollView, TouchableHighlight, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 15
    },
    input: {
        height: 40,
        flex: 1,
        borderColor: 'white',
        borderWidth: 1,
        color: 'white',
        fontWeight: '100',
        paddingLeft: 10,
    },
    button : {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        borderWidth: 1,
        borderColor: 'white',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_text: {
        fontWeight: 'bold',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
});

export default class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }
    _login() {
        this.props.login(this.state.username, this.state.password);
    }
    _createAccount() {
        this.props.createAccount(this.state.username, this.state.password);
    }
    render() {
        return (
            <View style={styles.page}>
                <View style={{flexDirection: 'row', flex: 1, marginBottom: 15}}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        placeholder="Mail"
                        placeholderTextColor="#FFF9"
                    />
                </View>

                <View style={{flexDirection: 'row', flex: 1, marginBottom: 15}}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor="#FFF9"
                    />
                </View>

                <View style={{flexDirection: 'row', flex: 1}}>
                    <TouchableHighlight onPress={this._login.bind(this)} style={styles.button}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name="check" color="white" size={23}/>

                            <Text style={styles.button_text}>
                                Log me in
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this._createAccount.bind(this)} style={styles.button}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name="save" color="white" size={23}/>
                            <Text style={styles.button_text}>
                                Create account
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}