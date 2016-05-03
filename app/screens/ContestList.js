import React, {Component, View, Text, StyleSheet, TouchableHighlight, Image, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';


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
    button: {
        flexDirection: 'row',
        justifyContent:'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        margin: 10,
        padding: 10,
        backgroundColor: '#0009'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10
    }
});
export default class ContestList extends Component {
    _newContest() {
        Actions.contestNew();
    }
    render() {
        return (
            <View style={styles.page}>
                <Image source={{uri: 'background', isStatic: true}} style={styles.background}/>

                <TouchableHighlight onPress={this._newContest.bind(this)}>
                    <View style={styles.button}>
                        <Icon name="add-box" size={25} color="white" />
                        <Text style={styles.buttonText}>CREATE CONTEST</Text>
                    </View>
                </TouchableHighlight>
                <Text>Contest List</Text>
            </View>
        );
    }
}