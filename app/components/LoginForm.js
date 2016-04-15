import React, {Component, StyleSheet, View, ScrollView, TouchableHighlight, Text, TextInput} from 'react-native';

export default class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }
    render() {
        return (
            <View>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <Text style={{width: 100}}>Mail</Text>
                    <TextInput
                        style={{height: 40, flex: 1, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                    />
                </View>

                <View style={{flexDirection: 'row', flex: 1}}>
                    <Text style={{width: 100}}>Password</Text>
                    <TextInput
                        style={{height: 40, flex: 1,borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                </View>

                <View style={{flexDirection: 'row', flex: 1}}>
                    <TouchableHighlight onPress={this.props.login} style={{flex: 1}}>
                        <Text>Log me in</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.props.createAccount} style={{flex: 1}}>
                        <Text>Create account</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}