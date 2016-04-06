import React,
    {Component, StyleSheet, View, ScrollView, ListView, Text,
    TextInput, Dimensions, TouchableHighlight} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';

//App
import MapService from '../services/MapService';

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
    }
});

export default class CityList extends Component {
    constructor() {
        super();
        this.state = {
            showLoader: true,
            cities: []
        }
    }
    componentWillMount() {
        MapService.getAllCity().then(res => {
           let cities = res.features.map(c => {
               return {name: c.attributes.COMMUNE, nbSport: c.attributes.NBSPORT};
           }).sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) ;
           this.setState({showLoader: false, cities})
        });
    }
    _goToCityDetail(city) {
        Actions.cityDetail({data: city, title: city.name.toUpperCase()})
    }
    render() {
        let cities = this.state.cities;
        if(this.state.filter) {
            cities = cities.filter(c => c.name.toLowerCase().startsWith(this.state.filter.toLowerCase()));
        }
        return (
            <ScrollView style={styles.page}>
                <Spinner visible={this.state.showLoader} color="red" />
                <TextInput
                    style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, marginBottom: 10, padding: 5}}
                    onChangeText={(filter) => this.setState({filter})}
                    value={this.state.filter}
                    placeholder="Search a city"
                />
                <View style={styles.separator} />
                <View style={{flex:1, alignItems: 'flex-start', justifyContent:'center', paddingLeft: 10}}>
                {
                    cities.map((c,i) => {
                        return (
                            <View key={i}>
                                <TouchableHighlight onPress={this._goToCityDetail.bind(this, c)}>
                                    <View>
                                        <Text>{c.name.toUpperCase()}</Text>
                                        <Text>{c.nbSport}</Text>
                                    </View>
                                </TouchableHighlight>
                                <View style={styles.separator}></View>
                            </View>
                        )
                    })
                }
                </View>
            </ScrollView>
        )
    }
}