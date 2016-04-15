import React, {Component, View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';


// App
import SportCity from './SportCity';
import SportList from './SportList';
import CityList from './CityList';
import CityDetail from './CityDetail';
import ResultList from './ResultList';
import ResultDetail from './ResultDetail';
import SideBar from './SideBar';

// Service
import MapService from '../services/MapService';


const styles = StyleSheet.create({
    navBar: {
        backgroundColor:'#FFF',
        shadowColor: '#555',
        shadowOpacity: 0.8,
        shadowOffset : {
            width: 1,
            height: 1
        },
        elevation: 2
    },
    menu_icon_ios: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        paddingTop: 10
    },
    menu_icon_android: {
         alignSelf: 'flex-end',
         justifyContent: 'center',
         paddingTop: 20,
         paddingRight: 10,
    }
})
export default class RouterComponent extends Component{
    constructor() {
        super();
        MapService.init().then( () => {
            console.log('>>>>>>>>>>>>>>> end');
        });
    }
    _options(){
        Actions.drawer();
    }

    _hamburger() {
        return (
            <TouchableOpacity onPress={this._options} style={styles.menu_icon_ios}>
                <Icon name="menu" size={23} color="#000" />
            </TouchableOpacity>
        );
    }
    render(){
        return (
            <Router>
                <Scene key="root" navigationBarStyle={styles.navBar} renderRightButton={this._hamburger.bind(this)}>
                    <Scene key="sportCity" component={SportCity} initial={true} hideNavBar={true} title="App"/>
                    <Scene key="sportList" component={SportList} title="Choose a sport" background="sports.jpg"/>
                    <Scene key="cityList" component={CityList} title="Choose a city"/>
                    <Scene key="cityDetail" component={CityDetail} title="City Detail"/>
                    <Scene key="resultList" component={ResultList} title="Result List"/>
                    <Scene key="resultDetail" component={ResultDetail} title="Result Detail"/>
                    <Scene key="drawer" title="ODPlayground" component={SideBar} direction="vertical"/>
                </Scene>
            </Router>
        )
    }
}