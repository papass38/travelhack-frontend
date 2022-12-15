
import { Button, StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';

export default function WelcomeScreen({ navigation }) {
    let touchX
return (
<View style={styles.container}

  >

<ImageBackground source={require('../assets/welcome-background.png')} style={styles.background}/>

<SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome to Travel Hack !</Text>
        <View
        onTouchStart={(e) => {
            touchX = e.nativeEvent.pageX;
          }}
          onTouchEnd={(e) => {
            if (touchX + e.nativeEvent.pageX > 20) {
              navigation.navigate("Sign in");
            }
          }}
            style={styles.button}
            activeOpacity={0.8}
           >
            <Text style={styles.textButton}>Swipe left to get started</Text>
        </View>
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
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Verdana',
    },
    title: {
        fontSize: '50',
        flex: 1,
        fontWeight: 'bold',
        fontFamily: 'Verdana',
        letterSpacing: -1,
    },
});
