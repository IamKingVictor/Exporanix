"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

interface MyUserContextProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<MyUserContextProviderProps> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
