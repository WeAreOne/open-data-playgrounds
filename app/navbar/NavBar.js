import React, {Component, View, Text, TouchableHighlight, StyleSheet, Image} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        height: 50,
        justifyContent: 'center'
    }
})

export default class NavBar extends Component {
    render() {
        var image = {uri: ''};
        return (
            <View style={styles.container}>
                <Image source={image} style={{resizeMode: 'cover', height: 50, position: 'absolute'}}/>
                <Text>{this.props.title}</Text>
            </View>
        )
    }
}