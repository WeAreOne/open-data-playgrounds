import React, {Component, StyleSheet, View, ScrollView, Text} from 'react-native';
import MapView from 'react-native-maps';


// App
import MapService from '../services/MapService';

const styles = StyleSheet.create({
    page: {
        paddingTop: 65,
        flex: 1
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});
export default class ResultDetail extends Component {
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
        MapService.transform(this.props.data.geometry).then(point => this.setState({point}));
    }
    render() {
        let map;
        if (this.state.point.easting) {
            map = (
                <MapView
                    style={ styles.map }
                    initialRegion={{
                          latitude: +this.state.point.northing,
                          longitude: +this.state.point.easting,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                >
                    <MapView.Marker
                        key={0}
                        coordinate={{latitude: +this.state.point.northing, longitude: +this.state.point.easting}}
                    />
                </MapView>
            )
        }
        return (
            <View style={styles.page}>
                {map}
                <Text>{this.props.data.attributes.SPORT}</Text>
                <Text>{this.props.data.attributes.COMMUNE}</Text>
                <Text>{this.props.data.attributes.TYPE}</Text>
                <Text>{this.props.data.geometry.x}</Text>
                <Text>{this.props.data.geometry.y}</Text>
                <Text>Latitude : {this.state.point.northing}</Text>
                <Text>Longitude : {this.state.point.easting}</Text>
            </View>
        )
    }
}