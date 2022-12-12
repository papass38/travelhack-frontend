import { Button, StyleSheet, Text, View } from 'react-native';

export default function TripScreen() {
    return (
        <View style={styles.container}>
            <Text>trips page</Text>
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