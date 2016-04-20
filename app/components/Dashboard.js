import React, {Component, StyleSheet, View, ListView, ScrollView, TouchableHighlight, Text, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';

// App
import Separator from './Separator';
import MapService from '../services/MapService';
import EventService from '../services/EventService';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        flex: 1,
        padding: 5,
        paddingTop: 15
    },
    row: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    row_tiles: {
        flexDirection: 'row'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'cover',
    },
    tile: {
        flex: 1,
        margin: 5,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    news: {
        margin: 5
    },
    news_row: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center'
    },
    number: {
        fontSize: 35,
        fontWeight: '300',
        color: 'white'
    },
    text: {
        fontSize: 20,
        fontWeight: '100',
        color: 'white'
    }
})

export default class Dashboard extends Component {
    _sportList() {
        Actions.sportCity();
    }
    render() {
        let nbSport = MapService.countSport();
        let nbEvent = EventService.countEvent();

        return (
            <View style={styles.page}>
                <Image source={{uri: 'city_bg_portrait', isStatic: true}} style={styles.background}/>

                <View style={[styles.row, styles.row_tiles]}>
                    <TouchableHighlight  style={styles.tile} onPress={this._sportList.bind(this)}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.number}>{nbSport}</Text>
                            <Text style={styles.text}> PLAYGROUNDS</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight  style={styles.tile}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.number}>{nbEvent}</Text>
                            <Text style={styles.text}> EVENTS</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={[styles.row, styles.tile, {flex: 0.5}]}>
                    <Text style={styles.text}>Profile</Text>
                </View>

                <View style={[styles.row, styles.news]}>
                    <Text style={[styles.text, {fontWeight: '300'}]}>
                        News
                    </Text>
                    <ScrollView>
                        <View style={styles.news_row}>
                            <Text style={{flex: 1, fontWeight: 'bold', color: 'white'}}>11/08</Text>
                            <Text style={{flex: 5, color: 'white'}}>Lancement de la 1ere version.</Text>
                        </View>
                        <Separator style={{backgroundColor: 'white'}}/>

                        <View style={styles.news_row}>
                            <Text style={{flex: 1, fontWeight: 'bold', color: 'white'}}>10/08</Text>
                            <Text style={{flex: 5, color: 'white'}}>Récuperation des données Suisse.</Text>
                        </View>
                        <Separator style={{backgroundColor: 'white'}}/>
                    </ScrollView>
                </View>
            </View>
        );
    }
}