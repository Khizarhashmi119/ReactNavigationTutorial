import { MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

import { useAuth } from "../context/Auth";
import Feed from "../screens/Feed";
import User from "../screens/User";

import { THomeParamList } from "../types/paramList/homeParamList";

const Stack = createNativeStackNavigator<THomeParamList>();

const HomeStack = (): JSX.Element => {
  const { logout } = useAuth() ?? {};

  const handlePressLogout = () => logout!();

  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableWithoutFeedback onPress={handlePressLogout}>
            <MaterialIcons name="logout" size={24} />
          </TouchableWithoutFeedback>
        ),
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default HomeStack;
