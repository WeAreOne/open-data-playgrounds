import React, {Component, View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';


// App
import SportCity from './SportCity';
import SportList from './SportList';
import CityList from './CityList';
import ResultList from './ResultList';
import ResultDetail from './ResultDetail';
import SideBar from './SideBar';
import Dashboard from './Dashboard';

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
        MapService.init().then( () => {
            this.setState({isLoading: false});
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
        var router =  (
            <Router>
                <Scene key="root" navigationBarStyle={styles.navBar}>
                    <Scene key="dashboard" component={Dashboard} initial={true} hideNavBar={true} title="App"/>
                    <Scene key="sportCity" component={SportCity} title="Find a playground" renderRightButton={this._hamburger.bind(this)}/>
                    <Scene key="sportList" component={SportList} title="Choose a sport" renderRightButton={this._hamburger.bind(this)}/>
                    <Scene key="cityList" component={CityList} title="Choose a city" renderRightButton={this._hamburger.bind(this)}/>
                    <Scene key="resultList" component={ResultList} title="Result List" renderRightButton={this._hamburger.bind(this)}/>
                    <Scene key="resultDetail" component={ResultDetail} title="Result Detail" renderRightButton={this._hamburger.bind(this)}/>
                    <Scene key="drawer" title="Sign in / Sign Up" component={SideBar} direction="vertical"/>
                </Scene>
            </Router>
        );
        var loading = (<Spinner visible={true} color="red" />);
        var comp = this.state.isLoading ? loading : router;

        return  comp;
    }
}