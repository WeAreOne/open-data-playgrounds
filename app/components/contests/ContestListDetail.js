import React, {Component, View, Text, StyleSheet, TouchableHighlight, Image, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';

// App
import MapService from '../../services/MapService';

export default class ContestList extends Component {
    render() {
        let contests = Object.keys(this.props.contests).map(ck => {
            let ct = this.props.contests[ck];
            let playground = MapService.getPlaygroundById(ct.playgroundId);
            return (
                <TouchableHighlight key={ck} onPress={this._goToPlayground.bind(this, playground)}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>{this._day(ct.date)}</Text>
                            <Text>{this._month(ct.date)}</Text>
                        </View>
                        <View style={{flex: 5}}>
                            <Text style={{fontWeight: 'bold'}}>{ct.title}</Text>
                            <Text>{ct.description}</Text>
                            <Text>at: {playground.commune} ({playground.sport})</Text>
                        </View>
                    </View>

                </TouchableHighlight>
            );
        });
        return (
            <View>
                {contests}
            </View>
        );
    }
    _day(timestamp) {
        let day =  new Date(timestamp).getDate();
        return day < 10 ? '0'+day : day;
    }
    _month(timestamp) {
        return new Date(timestamp).toLocaleString('en-us', {month: 'short'}).split(' ')[0];
    }
    _goToPlayground(playground) {
        Actions.resultDetail({data: playground, title: playground.commune});
    }
}