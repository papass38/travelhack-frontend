import { Button, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function WishlistScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.navigate("Favorites")}>
            <Ionicons
              name="chevron-back"
              size={50}
              color="#20B08E"
            />
            <Text style={styles.text}>Favorites</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        width: '35%',
      },
      text: {
        color: "#20B08E",
        fontSize: 30,
      },
    });