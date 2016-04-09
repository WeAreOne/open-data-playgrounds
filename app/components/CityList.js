import React, {
    Component, StyleSheet, View, ScrollView, ListView, Text,
    TextInput, Dimensions, TouchableHighlight, TouchableOpacity,
    Image} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

//App
import MapService from '../services/MapService';
import Separator from './Separator';

const styles = StyleSheet.create({
   page: {
       paddingTop: 65
   },
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
        margin: 2
    },
    filterText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    filterActive: {
        backgroundColor: 'black'
    },
    filterTextActive: {
        color: 'white'
    },
    input: {
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 5
    },
    row: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center'
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
        Actions.cityDetail({data: city, title: city.name.toUpperCase()})
    }
    render() {
        let cities = this.state.cities;
        if(this.state.filter) {
            cities = cities.filtered(`name BEGINSWITH[c] "${this.state.filter}"`);
        }
        return (
            <ScrollView style={styles.page}>
                <Spinner visible={this.state.showLoader} color="red" />
                <TextInput
                    style={styles.input}
                    onChangeText={(filter) => this.setState({filter})}
                    value={this.state.filter}
                    placeholder="Search a city"
                />
                <Separator />

                <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                    <TouchableOpacity style={[styles.filter, styles.filterActive]}>
                        <Text style={[styles.filterText, styles.filterTextActive]}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filter}>
                        <Text style={styles.filterText}>Favorites</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.resultList}>
                {
                    cities.map((c,i) => {
                        return (
                            <View key={i} style={{flex: 1}}>
                                <TouchableHighlight style={{flex: 1}} onPress={this._goToCityDetail.bind(this, c)}>
                                    <View style={styles.row}>
                                        <View style={styles.row}>
                                            <Image source={require('../../assets/city-icon.png')} style={{width: 45, height: 45, margin: 5, resizeMode:'stretch', marginRight: 5}}/>
                                            <Text style={{fontSize: 13}}>{c.name.toUpperCase()}</Text>
                                        </View>
                                        <View style={[styles.row, {justifyContent: 'flex-end'}]}>
                                            <Text>
                                                <Text style={{fontWeight: 'bold'}}>{c.nbSport}</Text> PLAYGROUNDS
                                            </Text>
                                            <Icon name="favorite-border" color="black" size={25}/>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        )
                    })
                }
                </View>
            </ScrollView>
        )
    }
}