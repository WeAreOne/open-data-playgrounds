import React, {Component, View, Text} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';


// App
import SportCity from './SportCity';
import SportList from './SportList';
import CityList from './CityList';
import ResultList from './ResultList';
import ResultDetail from './ResultDetail';

export default class RouterComponent extends Component{
    render(){
        return (
            <Router>
                <Scene key="root" navigationBarStyle={{ backgroundColor:'transparent' }}>
                    <Scene key="sportCity" component={SportCity} initial={true} hideNavBar={true} title="App"/>
                    <Scene key="sportList" component={SportList} title="Choose a sport" background="sports.jpg"/>
                    <Scene key="cityList" component={CityList} title="Choose a city"/>
                    <Scene key="resultList" component={ResultList} title="Result List"/>
                    <Scene key="resultDetail" component={ResultDetail} title="Result Detail"/>
                </Scene>
            </Router>
        )
    }
}