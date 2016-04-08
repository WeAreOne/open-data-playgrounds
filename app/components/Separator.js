import React, {Component, StyleSheet, View, ScrollView, Text} from 'react-native';

const styles = StyleSheet.create({
    default: {
        height: 1,
        backgroundColor:  'black',
        marginTop: 5,
        marginBottom: 5
    }
})
export default class Separator extends Component {
    render() {
        return <View style={[styles.default, this.props.style]}></View>
    }
}