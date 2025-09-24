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
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const UserProfile = createContext<UserContextType>({
  avatar: "",
  setAvatar: () => {},
  token: "",
  email: "",
  setEmail: () => {},
});

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [avatar, setAvatar] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (typeof window !== undefined) {
      const storedToken = localStorage.getItem("authToken");
      const storedUserString = localStorage.getItem("user");
      const storedUser = storedUserString ? JSON.parse(storedUserString) : null;
      if (storedToken) setToken(storedToken);
      if (storedUser) setEmail(storedUser.email);
    }
  }, []);
  return (
    <UserProfile.Provider value={{ avatar, setAvatar, token, email, setEmail }}>
      {children}
    </UserProfile.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfile);
  if (!context) throw new Error("useUSerProfile must be used withing provider");
  return context;
};
