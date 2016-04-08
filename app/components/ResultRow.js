import React, {Component, StyleSheet, View, ScrollView, TouchableHighlight, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux';

//App
import MapService from '../services/MapService';
import CoordinateMap from './CoordinateMap';

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#DDD',
        shadowColor: '#DDD',
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 2,
            height: 2
        },
        elevation: 2,
        margin: 10,
        marginBottom: 20,
        flex: 1
    },
    map: {
        height: 150,
        flex: 1
    },
    rowContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
        flex: 1
    },
    separator: {
        marginTop: 5,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    icon_container: {
        flex: 1,
        height: 60,
        justifyContent: 'center'
    }
});

export default class ResultRow extends Component {
    constructor() {
        super();
        this.state = {
            point: {
                northing: 0,
                easting: 0
            }
        }
    }
    componentWillMount() {
        console.log(this.props.row);
        MapService.transform(this.props.row.geometry).then(point => this.setState({point}));
    }
    _resultDetail(row) {
        Actions.resultDetail({data: row, title: row.attributes.COMMUNE});
    }
    render() {
        let map = this.state.point.northing ? (<View style={styles.map}><CoordinateMap point={this.state.point} /></View>) : (<View />);
        return (
            <TouchableHighlight onPress={this._resultDetail.bind(this, this.props.row)}  style={styles.container}>
                <View>
                    {map}
                    <View style={styles.rowContainer}>
                        <View style={{flex: 5}}>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>{this.props.row.attributes.SPORT.toUpperCase()}</Text>
                            <Text>{this.props.row.attributes.TYPE}</Text>
                            <Text>
                                {this.props.row.attributes.COMMUNE} ({this.props.row.attributes.NCOM})
                            </Text>
                        </View>
                        <View style={styles.icon_container}>
                            <Icon name="my-location" size={23} color="#000" />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}