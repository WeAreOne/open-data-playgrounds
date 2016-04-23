import React, {Component, StyleSheet, View, ScrollView, Text} from 'react-native';


export default class InfoDetailTab extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.data.sport}</Text>
                <Text>{this.props.data.commune}</Text>
                <Text>{this.props.data.type}</Text>
                <Text>{this.props.data.ncom}</Text>
                <Text>{this.props.data.lienFicheDesc}</Text>
                <Text>{this.props.data.lienPhotos}</Text>
            </View>
        );
    }
}