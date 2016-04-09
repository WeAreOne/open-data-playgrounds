import React, {Component, View, Text, StyleSheet} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';


// App
import SportCity from './SportCity';
import SportList from './SportList';
import CityList from './CityList';
import CityDetail from './CityDetail';
import ResultList from './ResultList';
import ResultDetail from './ResultDetail';
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
    }
})
export default class RouterComponent extends Component{
    constructor() {
        super();
        MapService.init();
    }
    render(){
        return (
            <Router>
                <Scene key="root" navigationBarStyle={styles.navBar}>
                    <Scene key="sportCity" component={SportCity} initial={true} hideNavBar={true} title="App"/>
                    <Scene key="sportList" component={SportList} title="Choose a sport" background="sports.jpg"/>
                    <Scene key="cityList" component={CityList} title="Choose a city"/>
                    <Scene key="cityDetail" component={CityDetail} title="City Detail"/>
                    <Scene key="resultList" component={ResultList} title="Result List"/>
                    <Scene key="resultDetail" component={ResultDetail} title="Result Detail"/>
                </Scene>
            </Router>
        )
    }
}