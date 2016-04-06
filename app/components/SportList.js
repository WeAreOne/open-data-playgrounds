import React, {Component, View, ScrollView,  Text, Image, Dimensions, TouchableHighlight, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';

//APP
import MapService from '../services/MapService';
import PictureService from '../services/PictureService';

const dim = Dimensions.get('window');
const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    container: {
        width: 375,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    textWrapper: {
        position: 'absolute',
        top: 65,
        width: dim.width / 3 + 50,
        left: dim.width / 3 - 25,
        borderWidth: 2,
        borderColor: 'black',
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#00000010'
    },
    text: {
        textAlign:'center',
        fontSize: 23,
        color: 'black',
        fontWeight: 'bold',
    },
    categoryContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    categoryImage: {
        flex: 1,
        resizeMode: 'cover',
        width: dim.width,
        height: 200
    }
});

export default class SportList extends Component {
    constructor() {
        super();
        this.state = {
            sports: [],
            showLoader: true
        };
        this.sportsOverride = [
            {name: 'gymnastique', bcolor: '#DDDDDD66'},
            {name: 'yoga', bcolor: '#DDDDDD66'},
            {name: 'arts martiaux', bcolor: '#DDDDDD66'},
            {name: 'tennis', bcolor: '#DDDDDD66'},
            {name: 'saut à la perche', bcolor: '#DDDDDD66'},
            {name: 'sambo', bcolor: '#DDDDDD66'},
            {name: 'promenade équestre', bcolor: '#DDDDDD66'},
            {name: 'waterpolo', bcolor: '#DDDDDD66'},
        ];
    }
    componentWillMount() {
        MapService.getAllSport().then(res => {
            let sports = res.features.map(feature => {
                return {name: feature.attributes.SPORT}
            });
            this.setState({showLoader: false, sports});
        })
    }
    _result(sport) {
        Actions.resultList({data: sport, title: sport.name})
    }
    _getPicture(sport) {
        return PictureService.getPicture(sport)
    }
    _getStyle(sport) {
        let sportOverride = this.sportsOverride.filter(s => s.name === sport.name.toLowerCase());
        if (sportOverride.length > 0) {
            return {backgroundColor: sportOverride[0].bcolor}
        }
        return {}
    }
    render() {
        return (
            <View style={styles.page}>
                <Spinner visible={this.state.showLoader} color="red" />
                <ScrollView style={{flex:1, flexDirection: 'column'}}>
                    {
                        this.state.sports.map(
                            (sport,i) => {
                                return (
                                    <View key={i} style={{height: 200}}>
                                        <TouchableHighlight onPress={this._result.bind(this, sport)}>
                                            <View style={styles.categoryContainer}>
                                                <Image source={this._getPicture(sport)} style={styles.categoryImage} />
                                                <View style={[styles.textWrapper, this._getStyle(sport)]}>
                                                    <Text style={styles.text}>{sport.name}</Text>
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                )
                            }
                        )
                    }
                </ScrollView>
            </View>
        )
    }
}