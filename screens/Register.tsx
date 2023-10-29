import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { TAuthParamList } from "../types/paramList/authParamList";

import { globalStyles } from "../globalStyles";

type TRegisterData = {
  confirmPassword: string;
  email: string;
  name: string;
  password: string;
};

const Register = () => {
  const navigation = useNavigation<NavigationProp<TAuthParamList>>();

  const [loginData, setLoginData] = useState<TRegisterData>({
    confirmPassword: "",
    email: "",
    name: "",
    password: "",
  });

  const { confirmPassword, email, name, password } = loginData;

  const handlePressRegisterScreen = () => Keyboard.dismiss();

  const handleChangeLoginData = (key: keyof TRegisterData, value: string) =>
    setLoginData((prevState) => ({
      ...prevState,
      [key]: value,
    }));

  const handlePressGoToLogin = () => navigation.navigate("Login");

  const isRegisterButtonDisabled = !name || !email || !confirmPassword;

  return (
    <TouchableWithoutFeedback onPress={handlePressRegisterScreen}>
      <View style={globalStyles.container}>
        <FontAwesome style={styles.logo} name="feed" size={60} color="black" />
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(name) => handleChangeLoginData("name", name)}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(email) => handleChangeLoginData("email", email)}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(password) =>
              handleChangeLoginData("password", password)
            }
            placeholder="Password"
            textContentType="password"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={(confirmPassword) =>
              handleChangeLoginData("confirmPassword", confirmPassword)
            }
            placeholder="Confirm Password"
            textContentType="password"
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={[
            globalStyles.button,
            styles.registerButton,
            isRegisterButtonDisabled ? globalStyles.disabledButton : null,
          ]}
          disabled={isRegisterButtonDisabled}
        >
          <Text style={globalStyles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.button, styles.loginButton]}
          onPress={handlePressGoToLogin}
        >
          <Text style={globalStyles.buttonText}>Go to login</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    gap: 16,
    marginTop: 32,
    marginBottom: 16,
    width: "80%",
  },
  input: {
    backgroundColor: "#eaeaea",
    borderRadius: 4,
    padding: 10,
  },
  registerButton: {
    marginTop: 16,
    width: "80%",
  },
  loginButton: {
    marginTop: 16,
    width: "80%",
  },
});

export default Register;
