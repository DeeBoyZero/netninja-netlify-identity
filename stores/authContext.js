import { createContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";

const Authcontext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log("login event");
    });
    // init netlify identity
    netlifyIdentity.init();
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const context = {
    user,
    login,
  };

  return (
    <Authcontext.Provider value={context}>{children}</Authcontext.Provider>
  );
};

export default Authcontext;
