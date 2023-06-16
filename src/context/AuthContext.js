import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState({});

  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const { user } = credentials;
    if (user.email === "ivan1998iasnig@gmail.com") {
      user.role = "admin";
    } else {
      user.role = "user";
    }
    setUser(user);
    return user;
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const { user } = result;
    if (user.email === "ivan1998iasnig@gmail.com") {
      user.role = "admin";
    } else {
      user.role = "user";
    }
    setUser(user);
    return user;
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ createUser, user, logout, signIn, signInWithGoogle }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
