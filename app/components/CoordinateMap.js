import React, {Component, StyleSheet, View, ScrollView, Text} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});
export default class CoordinateMap extends Component {
    render() {
        return (
            <View style={{height: 150}}>
                <MapView
                    style={ styles.map }
                    initialRegion={{
                              latitude: +this.props.point.northing,
                              longitude: +this.props.point.easting,
                              latitudeDelta: 0.0052,
                              longitudeDelta: 0.0052,
                            }}
                >
                    <MapView.Marker
                        key={0}
                        coordinate={{latitude: +this.props.point.northing, longitude: +this.props.point.easting}}
                        color="black"
                    />
                </MapView>
            </View>
        )
    }
}