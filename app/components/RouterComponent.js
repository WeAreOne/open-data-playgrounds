import React, {Component, View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

// App
import SportCity from './SportCity';
import SportList from './SportList';
import CityList from './CityList';
import ResultList from './ResultList';
import ResultDetail from './ResultDetail';
import SideBar from './SideBar';
import Dashboard from './Dashboard';
import SplashScreen from './SplashScreen';
import SearchHistory from './SearchHistory';

// Service
import MapService from '../services/MapService';
import UserService from '../services/UserService';

const styles = StyleSheet.create({
    navBar: {
        backgroundColor:'white',
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
    }
})
export default class RouterComponent extends Component{
    constructor() {
        super();
        this.state = {
            isLoading: true
        };
    }
    componentWillMount() {
        UserService.auth();
        let splash = new Promise(resolve => {
            setTimeout(resolve, 7000);
        });
        let data = new Promise(resolve => {
            MapService.init().then(() => {
                resolve();
            });
        });
        Promise.all([data, splash]).then(() => {
            this.setState({isLoading: false});
        });
    }
    _history(){
        Actions.searchHistory();
    }

    _hamburger() {
        return (
            <TouchableOpacity onPress={this._history} style={styles.menu_icon_ios}>
                <Icon name="history" size={23} color="#000" />
            </TouchableOpacity>
        );
    }
    render(){
        var router =  (
            <Router>
                <Scene key="root" navigationBarStyle={styles.navBar}>
                    <Scene key="dashboard" component={Dashboard} initial={true} hideNavBar={true} title="App"/>
                    <Scene key="sportCity" component={SportCity} title="Find a playground" renderRightButton={this._hamburger.bind(this)}/>
                    <Scene key="sportList" component={SportList} title="Choose a sport" />
                    <Scene key="cityList" component={CityList} title="Choose a city" />
                    <Scene key="resultList" component={ResultList} title="Your results"/>
                    <Scene key="resultDetail" component={ResultDetail} title="Result Detail"/>
                    <Scene key="searchHistory" component={SearchHistory} title="History"/>
                    <Scene key="drawer" title="Sign in / Sign Up" component={SideBar} direction="vertical"/>
                </Scene>
            </Router>
        );
        return this.state.isLoading ? (<SplashScreen />) : router;
    }
}