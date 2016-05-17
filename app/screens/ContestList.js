import React, {Component, View, Text, StyleSheet, TouchableHighlight, Image, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';

//App
import ContestService from '../services/ContestService';
import ContestListDetail from '../components/contests/ContestListDetail' ;
import Separator from '../components/Separator' ;

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
    button: {
        flexDirection: 'row',
        justifyContent:'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        margin: 10,
        padding: 10,
        backgroundColor: '#0009'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10
    }
});
export default class ContestList extends Component {
    constructor() {
        super();
        this.state = {
            contests: []
        }
    }
    componentWillMount() {
        ContestService.list().then(contests => {
            this.setState({contests});
        });
    }
    _newContest() {
        Actions.contestNew();
    }
    render() {
        return (
            <View style={styles.page}>
                <Image source={{uri: 'background', isStatic: true}} style={styles.background}/>

                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontStyle: 'italic'}}>Contact us at <Text style={{fontWeight: 'bold'}}>odp-events@weareone.ch</Text> to add your event
                    </Text>
                </View>

                <Separator style={{marginRight: 15, marginLeft: 15, backgroundColor: 'white'}}/>

                <ContestListDetail contests={this.state.contests} />
            </View>
        );
    }
}