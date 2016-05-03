import React, {Component, View, Text, StyleSheet, TouchableHighlight, Image, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';


// app
import SearchService from '../services/SearchService';
import Separator from './Separator';

// styles
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
        resizeMode: 'cover',
   },
   histoLine: {
       flexDirection: 'row',
       justifyContent: 'space-around',
       alignItems: 'center',
       height: 50
   },
    histoText: {
        color: 'white',
        fontWeight: '300'
    }
});
export default class SearchHistory extends Component {
    constructor() {
        super();
        this.state = {
            histo: []
        }
    }
    componentWillMount() {
        SearchService.history().then((histo) => {
            this.setState({histo});
        })
    }
    _search(histo) {
        SearchService.setCity({name: histo.city});
        SearchService.setSport({name: histo.sport});

        Actions.resultList();
    }
    render() {
        return (
            <View style={styles.page}>
                <Image source={{uri: 'background', isStatic: true}} style={styles.background}/>

                <ScrollView>
                    {
                        this.state.histo.map((h,i) => {
                            return (
                                <View key={i}>
                                    <TouchableHighlight onPress={this._search.bind(this, h)}>
                                        <View style={styles.histoLine}>
                                            <Text style={styles.histoText}>{h.sport}</Text>
                                            <Text style={styles.histoText}>{h.city}</Text>
                                            <Icon name="restore" size={20} color="white"/>
                                        </View>
                                    </TouchableHighlight>
                                    <Separator style={{margin: 5, marginLeft: 15, marginRight: 15, backgroundColor: "white"}} />
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}