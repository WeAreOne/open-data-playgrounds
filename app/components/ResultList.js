import React, {Component, StyleSheet, View, ListView, ScrollView, TouchableHighlight, Text, Image} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

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
});
export default class ResultList extends Component {
    constructor() {
        super();
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            showLoader: true
        };
    }

    componentDidMount() {
        let search = SearchService.search;
        MapService.search(search).then(
            results => {
                let dataSource = this.ds.cloneWithRows(results);
                this.setState(
                    {
                        showLoader: false,
                        dataSource
                    });
            }
        )
    }
    render() {
        let list = this.state.dataSource ? (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <ResultRow row={rowData}/>}
                pageSize={5}
                renderFooter={() => {
                    return (
                        <Text>Show me more</Text>
                    );
                }}
            />
        ): (<View></View>);
        return (
            <View style={styles.page}>
                <Spinner visible={this.state.showLoader} color="red"/>
                <Image source={{uri: 'city_bg_portrait', isStatic: true}} style={styles.background}/>
                {list}
            </View>
        )
    }
}