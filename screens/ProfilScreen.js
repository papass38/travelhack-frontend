import { Button, StyleSheet, Text, View } from 'react-native';

export default function ProfilScreen() {
    return (
        <View style={styles.container}>
            <Text>profil page</Text>
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