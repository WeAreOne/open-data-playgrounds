import React, {Component, StyleSheet, View, ScrollView, Text} from 'react-native';
import CoordinateMap from './CoordinateMap';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScrollableTabView from 'react-native-scrollable-tab-view';

// App
import MapService from '../services/MapService';
import Separator from './Separator';
import InfoDetailTab from './SportDetail/InfoDetailTab';
import NewsDetailTab from './SportDetail/NewsDetailTab';

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
        MapService.transform(this.props.data).then(point => this.setState({point}));
    }
    render() {
        let map = this.state.point.easting ? (<CoordinateMap point={this.state.point} />) : (<View></View>);
        return (
            <View style={styles.page}>
                {map}

                <ScrollableTabView>
                    <InfoDetailTab tabLabel="info" {...this.props}/>
                    <NewsDetailTab tabLabel="news" {...this.props}/>
                </ScrollableTabView>
            </View>
        )
    }
}