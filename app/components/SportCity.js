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
        resizeMode: 'cover',
        position: 'relative',
        width: dim.width
    },
    categoryTextWrapper: {
        borderWidth: 2,
        borderColor: 'black',
        position: 'absolute',
        top: dim.height / 4 - 25,
        left: 100,
        width: 150,
        paddingTop: 20,
        paddingBottom: 20
    },
    categoryText: {
        color: 'black',
        backgroundColor: '#00000000',
        width: 150,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold'
    }
});

export default class SportCity extends Component {
    constructor() {
        super();
        this.state = {

        };
    }
    _goToCities() {
        Actions.cityList();
    }
    _goToSportList() {
        Actions.sportList();
    }
    render() {
        return (
            <View style={styles.page}>
                <TouchableOpacity onPress={this._goToCities.bind(this)} style={{flex: 1}}>
                    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                        <Image source={require('../../assets/city.jpeg')} style={styles.category}/>
                        <View style={styles.categoryTextWrapper}>
                            <Text style={[styles.categoryText]}>Cities</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._goToSportList.bind(this)} style={{flex: 1}}>
                    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                        <Image source={require('../../assets/sport.jpeg')} style={styles.category}/>
                        <View style={styles.categoryTextWrapper}>
                            <Text style={[styles.categoryText]}>Sports</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}