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
    }
});
export default class ContestNew extends Component {
    render() {
        return (
            <View style={styles.page}>
                <Image source={{uri: 'background', isStatic: true}} style={styles.background}/>

                <Text>Contest new</Text>
            </View>
        );
    }
}