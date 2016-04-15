import React, {Component, StyleSheet, View, ScrollView, TouchableHighlight, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux';

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
    render() {
        return (
            <View style={styles.page}>
                <Text>Sidebar</Text>
            </View>
        )
    }
}