import React, {Component, StyleSheet, View, ScrollView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// APP
import Separator from '../Separator';

export default class InfoDetailTab extends Component {
    render() {
        return (
            <View style={{paddingTop: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name="description" size={40} style={{flex: 1, paddingLeft: 7}} color="#555"/>
                    <View style={{flex: 3}}>
                        <Text>{this.props.data.sport}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text>{this.props.data.commune} (</Text><Text>{this.props.data.ncom})</Text>
                        </View>
                        <Text>{this.props.data.type}</Text>
                    </View>
                </View>
                <Separator style={{margin: 5}}/>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name="query-builder" size={40} style={{flex: 1, paddingLeft: 7}} color="#555"/>
                    <View style={{flex: 3}}>
                        <Text>No time yet !</Text>
                    </View>
                </View>
                <Separator style={{margin: 5}}/>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name="launch" size={40} style={{flex: 1, paddingLeft: 7}} color="#555"/>
                    <View style={{flex: 3}}>
                        <Text>{this.props.data.lienFicheDesc}</Text>
                        <Text>{this.props.data.lienPhotos}</Text>
                        <Text>ID : {this.props.data._id}</Text>
                    </View>
                </View>
            </View>
        );
    }
}