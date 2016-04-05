/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';
import RouterComponent from './app/components/RouterComponent';

class ODPlaygrounds extends Component {
    render() {
        return (
            <View style={styles.container}>
                <RouterComponent />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

AppRegistry.registerComponent('ODPlaygrounds', () => ODPlaygrounds);
