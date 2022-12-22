import * as Font from "expo-font";

export default useFonts = async () => {
   await Font.loadAsync({
      "Ubuntu-Regular": require('../assets/fonts/Ubuntu-Regular.ttf'),
      'Ubuntu-Bold': require('../assets/fonts/Ubuntu-Bold.ttf')
    });
};