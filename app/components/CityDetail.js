import React, {Component, StyleSheet, View, ScrollView, TouchableHighlight, Text} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

//App
import MapService from '../services/MapService';
import ResultRow from './ResultRow';

const styles = StyleSheet.create({
    page: {
        paddingTop: 65,
        flex: 1
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
            <ScrollView style={styles.page}>
                <Spinner visible={this.state.showLoader} color="red"/>
                {
                    this.state.results.map((row,i) => <ResultRow key={i} row={row}/> )
                }
            </ScrollView>
        )
    }
}