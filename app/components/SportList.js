import React, {Component, View, ScrollView,  Text, Image,
    Dimensions, TouchableHighlight, StyleSheet, Animated,
    TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialIcons';

//APP
import MapService from '../services/MapService';
import PictureService from '../services/PictureService';
import SearchService from '../services/SearchService';

const dim = Dimensions.get('window');
const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingTop: 65,
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
        top: 25,
        width: dim.width - 100,
        left: 50,
        borderWidth: 2,
        borderColor: 'black',
        paddingTop: 7,
        paddingBottom: 7,
        backgroundColor: '#FFF9'
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
        height: 100
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
    },
    searchInput: {height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginTop: 5, backgroundColor: 'white'},
    searchContainer: {height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', flexDirection: 'row'}
});

export default class SportList extends Component {
    constructor() {
        super();
        this.state = {
            sports: [],
            showLoader: true,
            opacity: new Animated.Value(0),
            confirm: false,
            filter: ''
        };
        this.sportsOverride = [
            {name: 'gymnastique', bcolor: '#DDDDDD66'},
        ];
    }
    componentWillMount() {
        MapService.getAllSport().then(sports =>  this.setState({showLoader: false, sports}))
    }
    _result(sport) {
        SearchService.setSport(sport);
        this.setState({confirm: true});

        Animated.timing(          // Uses easing functions
            this.state.opacity,    // The value to drive
            {toValue: 1}            // Configuration
        ).start(() => {
            Actions.pop();
        });
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
        let confirm = this.state.confirm ? (<Animated.View style={[styles.confirm_screen, {opacity: this.state.opacity}]}>
            <Icon name="done" size={50} color="white"/>
        </Animated.View>) : (<View></View>);

        let sports = this.state.sports;
        if(this.state.filter) {
            sports = sports.filtered(`name BEGINSWITH[c] "${this.state.filter}"`);
        }
        return (
            <View style={[styles.page]}>
                <Spinner visible={this.state.showLoader} color="red" />
                <View style={styles.searchContainer}>
                    <Icon name="search" size={25} style={{width: 30, height: 30}} color="white"/>
                    <TextInput
                        style={styles.searchInput}
                        onChangeText={(filter) => this.setState({filter})}
                        placeholder="Search sport"
                        value={this.state.filter}
                    />
                </View>
                <ScrollView style={{flex:1, flexDirection: 'column'}}>
                    {
                        sports.map(
                            (sport,i) => {
                                return (
                                    <View key={i} style={{height: 100}}>
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
                {confirm}
            </View>
        )
    }
}