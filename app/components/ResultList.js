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
export default class ResultList extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
            showLoader: true
        }
    }
    componentDidMount() {
        MapService.getBySport(this.props.data.name).then(
            results => {
                this.setState({results: results.features, showLoader: false});
            }
        )
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