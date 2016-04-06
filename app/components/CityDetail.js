import React,
{Component, StyleSheet, View, Text} from 'react-native';

export default class CityDetail extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Text>{this.props.data.name}</Text>
        )
    }
}