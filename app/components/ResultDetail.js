import React, {Component, StyleSheet, View, ScrollView, Text} from 'react-native';
import CoordinateMap from './CoordinateMap';
import Icon from 'react-native-vector-icons/MaterialIcons';


// App
import MapService from '../services/MapService';
import Separator from './Separator';

const styles = StyleSheet.create({
    page: {
        paddingTop: 65
    },
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: -1,
        },
        elevation: 1,
        padding: 10,
        marginBottom: 15
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
        let map = this.state.point.easting ? (<CoordinateMap point={this.state.point} />) : (<View></View>);
        return (
            <View style={styles.page}>
                {map}
                <View style={styles.actions}>
                    <Text style={{flex: 1, textAlign: 'center'}}> Report <Icon name="warning" size={25} color="#AAA"/></Text>
                    <Text style={{flex: 1, textAlign: 'center'}}> Share <Icon name="share" size={25} color="#AAA"/></Text>
                    <Text style={{flex: 1, textAlign: 'center'}}> 15 <Icon name="favorite" size={25} color="#AAA"/></Text>
                </View>
                <View style={styles.container}>
                    <View>
                        <Text>{this.props.data.attributes.SPORT}</Text>
                        <Text>{this.props.data.attributes.COMMUNE}</Text>
                        <Text>{this.props.data.attributes.TYPE}</Text>
                        <Text>{this.props.data.attributes.NCOM}</Text>
                        <Text>{this.props.data.attributes.LIEN_FICHE_DESCRIPTIVE}</Text>
                        <Text>{this.props.data.attributes.LIEN_PHOTOS}</Text>
                    </View>

                    <Separator />
                    <Text>Time</Text>
                    <Text>No time yet</Text>

                    <Separator />
                    <Text>Transport</Text>
                    <Text>No transport yet</Text>

                    <Separator />
                    <Text>Events</Text>
                    <Text>No event yet</Text>
                </View>
            </View>
        )
    }
}