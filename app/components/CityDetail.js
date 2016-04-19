import React, {Component, StyleSheet, View, ScrollView, TouchableHighlight, Text, Image} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

//App
import MapService from '../services/MapService';
import ResultRow from './ResultRow';

const styles = StyleSheet.create({
    page: {
        paddingTop: 65,
        flex: 1
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'contain'
    }
});

export default class CityDetail extends Component {
    constructor() {
        super();
        this.state = {
          showLoader: true,
            results: []
        };
    }
    componentWillMount() {
        MapService.getByCity(this.props.data.name).then(res => {
            this.setState({
                results: res,
                showLoader: false
            });
        });
    }
   
    render() {
        return (
            <View style={styles.page}>
                <Image source={require('../../assets/city-bg-portrait.jpeg')} style={styles.background}/>
                <ScrollView>
                    <Spinner visible={this.state.showLoader} color="red"/>
                    {
                        this.state.results.map((row,i) => <ResultRow key={i} row={row}/> )
                    }
                </ScrollView>
            </View>
        )
    }
}