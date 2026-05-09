import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isLogged: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [isLogged, setIsLogged] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {

    const user = await AsyncStorage.getItem("@user");

    if (user) {
      setIsLogged(true);
    }

    setLoading(false);
  }

  async function login() {

    await AsyncStorage.setItem(
      "@user",
      "Gabriel"
    );

    setIsLogged(true);
  }

  async function logout() {

    await AsyncStorage.removeItem("@user");

    setIsLogged(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}