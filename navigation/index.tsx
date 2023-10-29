import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { useAuth } from "../context/Auth";
import AppTab from "./AppTabs";
import AuthStack from "./AuthStack";

const RootNavigation = () => {
  const { authState } = useAuth() ?? {};

  if (authState?.isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {!authState?.username ? <AuthStack /> : <AppTab />}
    </NavigationContainer>
  );
};

export default RootNavigation;
