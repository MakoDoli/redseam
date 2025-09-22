"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  token: string;
}

export const UserProfile = createContext<UserContextType>({
  avatar: "",
  setAvatar: () => {},
  token: "",
});

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [avatar, setAvatar] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    if (typeof window !== undefined) {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) setToken(storedToken);
    }
  }, []);
  return (
    <UserProfile.Provider value={{ avatar, setAvatar, token }}>
      {children}
    </UserProfile.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfile);
  if (!context) throw new Error("useUSerProfile must be used withing provider");
  return context;
};
