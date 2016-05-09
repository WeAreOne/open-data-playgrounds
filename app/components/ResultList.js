import React, {Component, StyleSheet, View, ListView, ScrollView, TouchableHighlight, Text, Image, Platform} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';

//App
import MapService from '../services/MapService';
import SearchService from '../services/SearchService';
import ResultRow from './ResultRow';

const styles = StyleSheet.create({
    page: {
        paddingTop: 65,
        flex: 1,
        backgroundColor: 'transparent'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'cover'
    },
    noResultText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '100',
        paddingTop: 100
    },
    more_button : {backgroundColor: '#FFF9', height: 50, justifyContent: 'center', alignItems: 'center'}
});
export default class ResultList extends Component {
    constructor() {
        super();
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            showLoader: true,
            noResult: false,
            offset: 0,
            showMore: false,
            size: 5,
            visible: true
        };
    }
    componentDidMount() {
        MapService.search(SearchService.search, this.state.offset, this.state.size).then(
            results => {
                if (results.length) {
                    let dataSource = this.ds.cloneWithRows(results);
                    this.setState({
                        showLoader: false,
                        showMore: results.length >= this.state.size,
                        dataSource,
                        results,
                        visible: true
                    });
                } else {
                    this.setState({noResult: true, showLoader: false});
                }
            }
        )
    }
    _onEndReach() {
        let nOffset = this.state.offset + this.state.size;
        MapService.search(SearchService.search, nOffset, this.state.size).then(
            results => {
                let showMore = results.length >= this.state.size;
                results = this.state.results.concat(results);
                let dataSource = this.ds.cloneWithRows(results);
                this.setState(
                    {
                        showLoader: false,
                        showMore,
                        offset: nOffset,
                        dataSource,
                        results
                    });
            }
        )
    }
    _resultDetail(row) {
        if (Platform.OS === 'android') this.setState({visible: false});
        Actions.resultDetail({data: row, title: row.commune});
        if (Platform.OS === 'android') setTimeout(() => this.setState({visible: true}), 500);
    }
    render() {
        let list = this.state.dataSource && !this.state.noResult && this.state.visible ? (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <ResultRow row={rowData} resultDetail={this._resultDetail.bind(this)}/>}
                renderFooter={() => {
                    return this.state.showMore ? (
                        <TouchableHighlight onPress={this._onEndReach.bind(this)} style={styles.more_button}>
                            <Text style={{fontSize: 24, fontWeight: '100'}}>More</Text>
                        </TouchableHighlight>
                    ): (<View></View>)
                }}
            />
        ): (<View><Text style={styles.noResultText}>No result yet !</Text></View>);
        return (
            <View style={styles.page}>
                <Spinner visible={this.state.showLoader} color="red"/>
                <Image source={{uri: 'background', isStatic: true}} style={styles.background}/>
                {list}
            </View>
        )
    }
}