import React, {
    Component, StyleSheet, View, Text,
    Image, Animated, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const dim = Dimensions.get('window');
const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 25
    },
    logo: {
        height: 65,
        width: dim.width - 50,
        resizeMode: 'contain',
        position: 'relative',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    category: {
        color: '#e20026'
    },
    bigText: {
        fontSize: 28
    },
    timer: {
        fontSize: 28,
        color: '#e20026',
        fontWeight: '200',
        textShadowColor: '#DDD',
        textShadowOffset: {width: 1, height: 1}
    },
    timerContainer: {
        width: 50,
        height: 50,
        padding: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#e20026',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    }
})

export default class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.page}>
                <Image source={{uri: 'weareone', isStatic: true}} style={styles.logo}/>
                <View style={styles.container}>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name="code" size={28} style={{marginRight: 10}}/>
                        <Text style={[styles.category, styles.bigText]}>Web</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name="smartphone" size={28} style={{marginRight: 10}} />
                        <Text style={[styles.category, styles.bigText]}>Mobile</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name="face" size={28} style={{marginRight: 10}} />
                        <Text style={[styles.category, styles.bigText]}>Trainings</Text>
                    </View>
                    <Timer />
                </View>
                <View style={{marginTop: 30, justifyContent: 'center', height: 50}}>
                    <Text style={styles.category}>Contact us for a free quote at contact@weareone.ch.</Text>
                </View>
            </View>
        );
    }
}

class Timer extends Component {
    constructor() {
        super();
        this.state = {
            timer: 5
        }
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({timer: Math.max(0, this.state.timer - 1)})
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <View style={styles.timerContainer}>
                <Text style={styles.timer}>{this.state.timer}</Text>
            </View>
        )
    }
}