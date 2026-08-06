import type { IProfile } from "@/types";
import { createContext, useContext, useState } from "react";

export interface AppState {
  user: IProfile | null;
  setUser: (user: IProfile | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AppState>({
  user: null,
  setUser: (user: IProfile | null) => {},
  loading: false,
  setLoading: (loading: boolean) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState(true);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useLoading = () => {
  const { loading, setLoading: set } = useContext(AuthContext);
  const setLoading = (loading: boolean) => {
    set(loading);
  };
  return { loading, setLoading };
};
