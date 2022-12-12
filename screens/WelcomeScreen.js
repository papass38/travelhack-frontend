import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
 return (
   <View style={styles.container}>
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Sign in')}>
            <Text style={styles.textButton}>Slide to access Travelhack</Text>
        </TouchableOpacity>

        

        
   </View>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        width: '80%',
        backgroundColor: 'red',
        borderRadius: 10,
    },
    textButton: {
        color: 'white',
        fontSize: 20,
    },
    signInBtn: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        width: '80%',
        backgroundColor: 'black',
        borderRadius: 10,
    },
    signupBtn: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        width: '80%',
        backgroundColor: 'black',
        borderRadius: 10,
    }
  });