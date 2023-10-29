import { StyleSheet, Text, View } from "react-native";

import { globalStyles } from "../globalStyles";

const Home = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Home;
