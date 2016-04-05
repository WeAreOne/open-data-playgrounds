import React, {Component, View, Text, Image, Dimensions, TouchableHighlight, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Carousel from 'react-native-carousel';
import Spinner from 'react-native-loading-spinner-overlay';

//APP
import MapService from '../services/MapService';

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
    text: {
        position: 'absolute',
        top: 100,
        textAlign:'center',
        fontSize: 23,
        color: 'black',
        width: dim.width / 3 + 50,
        left: dim.width / 3 - 25,
        borderWidth: 2,
        paddingTop: 15,
        paddingBottom: 15,
        fontWeight: 'bold',
        backgroundColor: '#00000010'
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
        height: dim.height
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
            {name: 'Gymnastique', fontColor: 'white'}
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
        let image;
        switch(sport.name.toLowerCase()) {
            case 'basketball':
                image = require('../../assets/sports/basketball.jpg');
                break;
            case 'tennis':
                image = require('../../assets/sports/tennis.jpg');
                break;
            case 'football':
                image = require('../../assets/sports/football.jpg');
                break;
            case 'gymnastique':
                image = require('../../assets/sports/gym.jpg');
                break;
        }
        return image;
    }
    render() {
        return (
            <View style={styles.page}>
                <Spinner visible={this.state.showLoader} color="red" />
                <Carousel width={375} hideIndicators={true} animate={false}>
                    {
                        this.state.sports.map(
                            (sport,i) => {
                                return (
                                    <View key={i} style={styles.container}>
                                        <TouchableHighlight onPress={this._result.bind(this, sport)}>
                                            <View style={styles.categoryContainer}>
                                                <Image source={this._getPicture(sport)} style={styles.categoryImage} />
                                                <Text style={[styles.text,
                                                    {color: sport.fontColor||'black', borderColor: sport.fontColor||'black'}]}>
                                                        {sport.name}
                                                </Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                )
                            }
                        )
                    }
                </Carousel>
            </View>
        )
    }
}