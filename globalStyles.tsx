import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 4,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  disabledButton: {
    backgroundColor: "#c9c9c9",
  },
});
