import React, {Component, StyleSheet, View, Image, Text, Dimensions, TouchableOpacity, Animated} from 'react-native';
import {Actions} from 'react-native-router-flux'


//App
const dim = Dimensions.get('window');
const styles = StyleSheet.create({
    page: {
        paddingTop: 20,
        flex: 1,
        flexDirection: 'column'
    },
    category: {
        flex: 1,
        resizeMode: 'contain',
        position: 'relative'
    },
    categoryText: {
        color: 'black',
        backgroundColor: '#00000000',
        position: 'absolute',
        width: 150,
        padding: 20,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: 'black'
    }
});

export default class SportCity extends Component {
    constructor() {
        super();
        this.state = {
            opacityCity: new Animated.Value(1),
            opacitySport: new Animated.Value(1),
        };
    }
    _goToCities() {
        Animated.spring(                          // Base: spring, decay, timing
            this.state.opacityCity,                 // Animate `bounceValue`
            {
                toValue: 0.1                          // Bouncier spring
            }
        ).start(
            () => {
                this.state.opacityCity.setValue(1);
                Actions.cityList();
            }
        );
    }
    _goToSportList() {
        Animated.spring(                          // Base: spring, decay, timing
            this.state.opacitySport,                 // Animate `bounceValue`
            {
                toValue: 0.1                          // Bouncier spring
            }
        ).start(
            () => {
                this.state.opacitySport.setValue(1);
                Actions.sportList();
            }
        );    }
    render() {
        return (
            <View style={styles.page}>
                <TouchableOpacity onPress={this._goToCities.bind(this)} style={{flex: 1}}>
                    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                        <Image source={require('../../assets/city.jpeg')} style={styles.category}/>
                        <Animated.Text style={[styles.categoryText, {top: 150, left: 100, opacity: this.state.opacityCity}]}>Cities</Animated.Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._goToSportList.bind(this)} style={{flex: 1}}>
                    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                        <Image source={require('../../assets/sport.jpeg')} style={styles.category}/>
                        <Animated.Text style={[styles.categoryText, {top: 150, left: 100, opacity: this.state.opacitySport}]}>Sports</Animated.Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}