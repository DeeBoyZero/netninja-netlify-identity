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

    netlifyIdentity.on("logout", () => {
      setUser(null);
      console.log("logout event");
    });

    // init netlify identity
    netlifyIdentity.init();

    // cleanup function that un-register event listeners
    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const context = {
    user,
    login,
    logout,
  };

  return (
    <Authcontext.Provider value={context}>{children}</Authcontext.Provider>
  );
};

export default Authcontext;
