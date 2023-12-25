import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { IAuth } from "../types/state/auth";

const AuthContext = createContext<{
  authState: IAuth | null;
  login: (email: string, password: string) => void;
  logout: () => void;
} | null>(null);

interface Props {
  children: ReactNode;
}

export const AuthProvider = (props: Props): JSX.Element => {
  const { children } = props;

  const [authState, setAuthState] = useState<IAuth>({
    username: null,
    isLoading: true,
  });

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((value) => {
        if (value) {
          setAuthState((prevState) => ({
            ...prevState,
            username: value,
          }));
        }
      })
      .catch(() => {
        setAuthState((prevState) => ({
          ...prevState,
          username: null,
        }));
      })
      .finally(() => {
        setAuthState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      });
  }, []);

  const login = (email: string, password: string) => {
    setAuthState((prevState) => ({
      ...prevState,
      username: email,
    }));

    AsyncStorage.setItem("user", email);
  };

  const logout = () => {
    setAuthState((prevState) => ({
      ...prevState,
      username: null,
    }));

    AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
