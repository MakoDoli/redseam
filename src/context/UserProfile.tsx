"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextType {
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
}

export const UserProfile = createContext<UserContextType>({
  avatar: "",
  setAvatar: () => {},
});

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [avatar, setAvatar] = useState("");
  return (
    <UserProfile.Provider value={{ avatar, setAvatar }}>
      {children}
    </UserProfile.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfile);
  if (!context) throw new Error("useUSerProfile must be used withing provider");
  return context;
};
