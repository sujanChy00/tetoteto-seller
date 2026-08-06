import { AuthContext } from "@/context/auth-provider";
import type { IProfile } from "@/types";
import { useContext } from "react";

export const useUser = () => {
  const { user, setUser: set } = useContext(AuthContext);

  const setUser = (user: IProfile | null) => {
    set(user);
  };

  return { user, setUser };
};
