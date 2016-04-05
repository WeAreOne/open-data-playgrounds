import React, {Component, StyleSheet, View, ScrollView, TouchableHighlight, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay';

//App
import MapService from '../services/MapService'

const styles = StyleSheet.create({
    page: {
        paddingTop: 65,
        flex: 1
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 5
    },
    separator: {
        marginTop: 5,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
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
    _resultDetail(row) {
        Actions.resultDetail({data: row, title: row.attributes.COMMUNE});
    }
    render() {
        return (
            <ScrollView style={styles.page}>
                <Spinner visible={this.state.showLoader} color="red"/>
                {
                    this.state.results.map((r,i) => {
                        return (
                            <TouchableHighlight key={i} onPress={this._resultDetail.bind(this, r)}>
                                <View>
                                    <View style={styles.rowContainer}>
                                        <View style={{flex: 5}}>
                                            <Text>{r.attributes.SPORT}</Text>
                                            <Text>{r.attributes.TYPE}</Text>
                                            <Text>{r.attributes.COMMUNE}</Text>
                                            <Text>{r.attributes.NCOM}</Text>
                                        </View>
                                        <View style={{flex: 1, height: 60, justifyContent: 'center'}}>
                                            <Icon name="keyboard-arrow-right" size={23} color="#000" />
                                        </View>
                                    </View>
                                    <View style={styles.separator}></View>
                                </View>
                            </TouchableHighlight>
                        )
                    })
                }
            </ScrollView>
        )
    }
}