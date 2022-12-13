import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ProfilScreen({navigation}) {
    return (
        <View style={styles.container}>
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('TabNavigator')}>
            <Text style={styles.textButton}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Favorites')}>
            <Text style={styles.textButton}>Favoris</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.textButton}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('To Do')}>
            <Text style={styles.textButton}>To Do</Text>
        </TouchableOpacity>
        </View>
    )
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
  });