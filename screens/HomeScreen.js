import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text>home page</Text>
            <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('TabNavigator')}>
            <Text style={styles.textButton}>Sign in</Text>
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
  });