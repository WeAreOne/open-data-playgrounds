import React, {
    Component, StyleSheet, View, ScrollView, ListView, Text,
    TextInput, Dimensions, TouchableHighlight, TouchableOpacity,
    Image, Platform, Animated} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

//App
import MapService from '../services/MapService';
import SearchService from '../services/SearchService';
import Separator from './Separator';

const styles = StyleSheet.create({
    page: {flex: 1, paddingTop: 65, backgroundColor: 'transparent'},
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
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
        fontSize: 20
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'cover'
    },
    number: {
        fontWeight: '300',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
        color: 'white',
        fontSize: 25
    },
    confirm_screen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000D',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default class CityList extends Component {
    constructor() {
        super();
        this.state = {
            showLoader: true,
            filter: '',
            cities: [],
            confirm: false,
            opacity: new Animated.Value(0)
        }
    }
    componentWillMount() {
        MapService.getAllCity().then( cities =>  this.setState({showLoader: false, cities: cities.sorted('name')}));
    }
    _goToCityDetail(city) {
        SearchService.setCity(city);
        this.setState({confirm: true});
        Animated.timing(          // Uses easing functions
            this.state.opacity,    // The value to drive
            {toValue: 1}            // Configuration
        ).start(() => {
            Actions.pop();
        });
    }
    render() {
        let cities = this.state.cities;
        if(this.state.filter) {
            cities = cities.filtered(`name BEGINSWITH[c] "${this.state.filter}"`);
        }
        let confirm = this.state.confirm ? (<Animated.View style={[styles.confirm_screen, {opacity: this.state.opacity}]}>
            <Icon name="done" size={50} color="white"/>
        </Animated.View>) : (<View></View>);

        return (
            <View style={styles.page}>
                <Image source={{uri: 'background', isStatic: true}} style={styles.background}/>

                <Spinner visible={this.state.showLoader} color="red" />
                <View style={{height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', flexDirection: 'row'}}>
                    <Icon name="search" size={25} style={{width: 30, height: 30}} />
                    <TextInput
                        style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginTop: 5}}
                        onChangeText={(filter) => this.setState({filter})}
                        placeholder="Search city"
                        value={this.state.filter}
                    />
                </View>

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
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                    <Separator style={{backgroundColor: '#FFF9'}}/>
                                </View>
                            )
                        })
                    }
                    </View>
                </ScrollView>

                {confirm}
            </View>
        )
    }
}