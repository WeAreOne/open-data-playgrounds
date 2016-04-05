import React,
    {Component, StyleSheet, View, ScrollView, Text,
    TextInput, Dimensions, TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

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
               return {name: c.attributes.COMMUNE};
           }).sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) ;
           this.setState({showLoader: false, cities})
        });
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
                {
                    cities.map((c,i) => {
                        return (
                            <View key={i}>
                                <Text>{c.name.toUpperCase()}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
        )
    }
}