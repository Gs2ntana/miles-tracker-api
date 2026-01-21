import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { authService } from "../services/authService";
import type { LoginRequest, UsuarioResponse } from "../types";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UsuarioResponse | null;
  loading: boolean;
  signIn: (credentials: LoginRequest) => Promise<void>;
  signOut: () => void;
  setUser: (user: UsuarioResponse | null) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsuarioResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storedToken = localStorage.getItem("@Milhas:token");

      if (storedToken) {
        try {
          const userData = await authService.getMe();
          setUser(userData);
        } catch (error) {
          signOut();
        }
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(credentials: LoginRequest) {
    try {
      const response = await authService.login(credentials);
      const { token } = response;

      localStorage.setItem("@Milhas:token", token);

      const userData = await authService.getMe();
      setUser(userData);
      
    } catch (error) {
      console.error("Erro ao logar", error);
      throw error;
    }
  }

  function signOut() {
    localStorage.removeItem("@Milhas:token");
    setUser(null);
  }

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, signIn, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);