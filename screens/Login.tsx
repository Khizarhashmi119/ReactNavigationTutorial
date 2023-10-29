import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
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

import { useAuth } from "../context/Auth";

import { globalStyles } from "../globalStyles";
import { TAuthParamList } from "../types/paramList/authParamList";

interface Props extends NativeStackScreenProps<TAuthParamList> {}

type TLoginData = {
  email: string;
  password: string;
};

const Login = (props: Props): JSX.Element => {
  const { navigation } = props;

  const { login } = useAuth() ?? {};

  const [loginData, setLoginData] = useState<TLoginData>({
    email: "",
    password: "",
  });

  const { email, password } = loginData;

  const handlePressLoginScreen = () => Keyboard.dismiss();

  const handleChangeLoginData = (key: keyof TLoginData, value: string) =>
    setLoginData((prevState) => ({
      ...prevState,
      [key]: value,
    }));

  const handlePressGoToRegister = () => navigation.navigate("Register");
  const handlePressLogin = () => login!(email, password);

  const isLoginButtonDisabled = !email || !password;

  return (
    <TouchableWithoutFeedback onPress={handlePressLoginScreen}>
      <View style={globalStyles.container}>
        <FontAwesome style={styles.logo} name="feed" size={60} color="black" />
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
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
        </View>
        <TouchableOpacity
          style={[
            globalStyles.button,
            styles.loginButton,
            isLoginButtonDisabled ? globalStyles.disabledButton : null,
          ]}
          onPress={handlePressLogin}
          disabled={isLoginButtonDisabled}
        >
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.button, styles.registerButton]}
          onPress={handlePressGoToRegister}
        >
          <Text style={globalStyles.buttonText}>Go to register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgetPassword}>
          <Text style={styles.forgetPasswordText}>Forget password ?</Text>
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
  loginButton: {
    marginTop: 16,
    width: "80%",
  },
  registerButton: {
    marginTop: 16,
    width: "80%",
  },
  forgetPassword: {
    marginTop: 16,
  },
  forgetPasswordText: {
    fontWeight: "500",
  },
});

export default Login;
