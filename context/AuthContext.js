import { createContext, useState } from "react";

const authContext = createContext({
  isAuthenticated: false,
  user: {},
  login: () => {},
  logout: () => {},
  validate: () => {},
})

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  
  const login = (user) => {
    setIsAuthenticated(true);
    setUser(user);
  }

  const logout = () => {
    setIsAuthenticated(false);
    setUser({});
  }

  const validate = (user) => {
    if (!user) {
      setIsAuthenticated(false);
      setUser({});
      return;
    }
    setIsAuthenticated(true);
    setUser(user);
  }

  return (
    <authContext.Provider value={{ isAuthenticated, user, login, logout, validate}}>
      {children}
    </authContext.Provider>
  )
}

export { authContext, AuthProvider };