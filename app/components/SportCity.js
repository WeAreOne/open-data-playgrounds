import React, {Component, StyleSheet, View, Image, Text, Dimensions, TouchableOpacity, Animated} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';


//App
import SearchService from '../services/SearchService';


const dim = Dimensions.get('window');
const styles = StyleSheet.create({
    page: {
        paddingTop: 20,
        flex: 1,
        flexDirection: 'column'
    },
    category: {
        flex: 1,
        resizeMode: 'cover',
        position: 'relative',
        width: dim.width
    },
    categoryTextWrapper: {
        borderWidth: 2,
        borderColor: 'black',
        position: 'absolute',
        top: dim.height / 4 - 37,
        left: 50,
        width: 250,
        paddingTop: 10,
        paddingBottom: 10
    },
    categoryText: {
        color: 'black',
        backgroundColor: 'transparent',
        width: 250,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    search_container: {flex: 0.2, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'},
    var_text: {
        fontWeight: 'bold',
        color: '#2196F3'
    }
});

export default class SportCity extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    _goToCities() {
        Actions.cityList();
    }
    _goToSportList() {
        Actions.sportList();
    }
    _clearSearch() {
        SearchService.clear();
        this.setState({
            clear: true
        })
    }
    _search() {
        Actions.resultList();
    }
    render() {
        let city = SearchService.search.city.name.toUpperCase();
        let sport = SearchService.search.sport.name.toUpperCase();

        return (
            <View style={styles.page}>
                <TouchableOpacity onPress={this._goToSportList.bind(this)} style={{flex: 1}}>
                    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                        <Image source={{uri: 'sport', isStatic: true}} style={styles.category}/>
                        <View style={styles.categoryTextWrapper}>
                            <Text style={[styles.categoryText]}>
                                {
                                    sport !== 'ANY SPORT' ? sport : 'Select a sport'
                                }
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._goToCities.bind(this)} style={{flex: 1}}>
                    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                        <Image source={{uri: 'city', isStatic: true}} style={styles.category}/>
                        <View style={styles.categoryTextWrapper}>
                            <Text style={[styles.categoryText]}>
                                {
                                    city !== 'ANY CITY' ? city : 'Select a city'
                                }
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.search_container}>
                    <View style={{flexDirection: 'row'}}>
                        <Icon.Button name="times" borderRadius={0} backgroundColor="#000" color="#FFF" style={{borderWidth: 2, borderColor: 'black'}} onPress={this._clearSearch.bind(this)}>
                            Clear
                        </Icon.Button>
                        <Icon.Button name="search" borderRadius={0} backgroundColor="#FFF" color="#000" style={{borderWidth: 2, borderColor: 'black'}} onPress={this._search}>
                            Search
                        </Icon.Button>
                    </View>

                </View>
            </View>
        )
    }
}