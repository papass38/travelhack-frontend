
import { Button, StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';

export default function WelcomeScreen({ navigation }) {

return (
<View style={styles.container}>
<ImageBackground source={require('../assets/welcome-background.png')} style={styles.background}/>

<SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome to Travel Hack !</Text>
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Sign in')}>
            <Text style={styles.textButton}>Get started</Text>
        </TouchableOpacity>
        </SafeAreaView>
</View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        resizeMode: 'repeat',
    },
    button: {
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 80,
        paddingRight:80,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    textButton: {
        color: '#20b08e',
        fontSize: 20,
        fontWeight: 'bold',
    },
    title: {
        fontSize: '50',
        flex: 1,
        fontWeight: 'bold',
        fontFamily: 'Ubuntu-Regular',
    },
});
