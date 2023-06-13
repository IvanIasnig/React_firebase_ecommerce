import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut, 
         onAuthStateChanged, GoogleAuthProvider, signInWithPopup 
        } from "firebase/auth";
import { auth } from "../firebase";

    const UserContext = createContext() 

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});

    const provider = new GoogleAuthProvider();

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth,email,password)
    };

    const signIn = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider);
    }

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
        });
        return () => {unsubscribe()};
    },[])

    return (
        <UserContext.Provider value={{ createUser, user, logout, signIn, signInWithGoogle}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}