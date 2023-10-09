import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import BlockUi from "../components/BlockUi";
import { getCurrentUser } from "../api/user";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const { isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
    onSuccess: (data) => {
      setUser(data.data.data);
      setIsAuthenticated(true);
    },
    cacheTime: 0,
    retry: 0,
    refetchOnWindowFocus: false,
  });
  const signIn = ({ data, onSignIn }) => {
    setIsAuthenticated(true);
    setUser(data);
    onSignIn && onSignIn();
  };

  const signOut = ({ onSignOut }) => {
    setIsAuthenticated(false);
    setUser({});
    onSignOut && onSignOut();
  };
  const auth = {
    isAuthenticated,
    user,
    signIn,
    signOut,
  };

  if (isLoading) {
    return (
      <BlockUi className={"h-screen"} blocked={true} overlay={false}></BlockUi>
    );
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
