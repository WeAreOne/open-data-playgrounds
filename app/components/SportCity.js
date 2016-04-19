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
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        position: 'absolute',
        top: dim.height / 4 - 25,
        left: 100,
        width: 150,
        paddingTop: 20,
        paddingBottom: 20
    },
    categoryText: {
        color: 'black',
        backgroundColor: '#00000000',
        width: 150,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
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
                        <Image source={require('../../assets/sport.jpeg')} style={styles.category}/>
                        <View style={styles.categoryTextWrapper}>
                            <Text style={[styles.categoryText]}>Sports</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={this._clearSearch.bind(this)}>
                            <Icon name="times" backgroundColor="#FFF" color="#000" size={17} style={{marginRight: 10}}/>
                        </TouchableOpacity>
                        <Text  style={{marginBottom: 7}}>
                            <Text style={{fontWeight: 'bold'}}> {sport} </Text> in <Text style={{fontWeight: 'bold'}}>{city}</Text>
                        </Text>
                    </View>
                    <Icon.Button name="search" borderRadius={0} backgroundColor="#0009" onPress={this._search}>
                        Search
                    </Icon.Button>
                </View>
                <TouchableOpacity onPress={this._goToCities.bind(this)} style={{flex: 1}}>
                    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                        <Image source={require('../../assets/city.jpeg')} style={styles.category}/>
                        <View style={styles.categoryTextWrapper}>
                            <Text style={[styles.categoryText]}>Cities</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}