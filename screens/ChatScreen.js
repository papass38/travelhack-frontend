import { Button, StyleSheet, Text, View } from 'react-native';

export default function ChatScreen() {
    return (
        <View style={styles.container}>
            <Text>chat page</Text>
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