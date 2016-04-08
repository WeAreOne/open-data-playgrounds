import React, {Component, StyleSheet, View, ListView, ScrollView, TouchableHighlight, Text} from 'react-native';
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
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            results: [],
            showLoader: true
        };
    }
    componentDidMount() {
        MapService.getBySport(this.props.data.name).then(
            results => {
                let dataSource = this.ds.cloneWithRows(results.features);
                this.setState(
                    {
                        results: results.features,
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
            />
        ): (<View></View>);
        return (
            <View style={styles.page}>
                <Spinner visible={this.state.showLoader} color="red"/>
                {list}
            </View>
        )
    }
}