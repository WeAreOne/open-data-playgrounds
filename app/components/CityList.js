import React, {
    Component, StyleSheet, View, ScrollView, ListView, Text,
    TextInput, Dimensions, TouchableHighlight, TouchableOpacity,
    Image} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

//App
import MapService from '../services/MapService';
import SearchService from '../services/SearchService';
import Separator from './Separator';

const styles = StyleSheet.create({
   page: {flex: 1, paddingTop: 65},
    separator: {
        height: 1,
        backgroundColor: 'black',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    resultList: {
        flex:1,
        justifyContent:'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    filter: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        margin: 2,
        backgroundColor: 'transparent',
        borderColor: 'white',
    },
    filterText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    filterActive: {
        backgroundColor: 'black',
        borderColor: 'black',

    },
    filterTextActive: {
        color: 'white'
    },
    input: {
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 5,
        color: 'white'
    },
    row: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60
    },
    city_name: {
        color: 'white',
        fontWeight: '300',
        fontSize: 20
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'contain'
    },
    number: {
        fontWeight: '300',
        color: 'white',
        fontSize: 25
    }
});

export default class CityList extends Component {
    constructor() {
        super();
        this.state = {
            showLoader: true,
            filter: '',
            cities: []
        }
    }
    componentWillMount() {
        MapService.getAllCity().then( cities =>  this.setState({showLoader: false, cities: cities.sorted('name')}));
    }
    _goToCityDetail(city) {
        SearchService.setCity(city);
        Actions.pop();
    }
    render() {
        let cities = this.state.cities;
        if(this.state.filter) {
            cities = cities.filtered(`name BEGINSWITH[c] "${this.state.filter}"`);
        }
        return (
            <View style={styles.page}>
                <Image source={require('../../assets/city-bg-portrait.jpeg')} style={styles.background}/>

                <Spinner visible={this.state.showLoader} color="red" />
                <TextInput
                    style={styles.input}
                    onChangeText={(filter) => this.setState({filter})}
                    value={this.state.filter}
                    placeholder="Search a city"
                />
                <Separator />

                <View style={{height: 25, flexDirection: 'row', marginBottom: 10}}>
                    <TouchableOpacity style={[styles.filter, styles.filterActive]}>
                        <Text style={[styles.filterText, styles.filterTextActive]}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filter}>
                        <Text style={styles.filterText}>Favorites</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <View style={styles.resultList}>
                    {
                        cities.map((c,i) => {
                            return (
                                <View key={i} style={{flex: 1}}>
                                    <TouchableHighlight style={{flex: 1}} onPress={this._goToCityDetail.bind(this, c)}>
                                        <View style={styles.row}>
                                            <View style={styles.row}>
                                                <Text style={styles.city_name}>
                                                    {c.name.toUpperCase()}
                                                </Text>
                                            </View>
                                            <View style={[styles.row, {justifyContent: 'flex-end'}]}>
                                                <Text>
                                                    <Text style={styles.number}>{c.nbSport}</Text>
                                                    <Icon name="place" color="white" size={20}/>
                                                </Text>
                                                <Text>
                                                    <Text style={styles.number}>0</Text>
                                                    <Icon name="favorite" color="white" size={20}/>
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                    <View style={{height:1, backgroundColor: '#FFFFFF90'}}></View>
                                </View>
                            )
                        })
                    }
                    </View>
                </ScrollView>
            </View>
        )
    }
}