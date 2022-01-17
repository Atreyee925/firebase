import { createContext,useEffect,useContext,useState } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import { auth } from "../firebase";
const userAuthContext = createContext();

export function UserAuthContextProvider({children}) {
    const [user, setUser]=useState("");
    function signUp(email,password,name,confirmPassword) {
        return createUserWithEmailAndPassword( auth,email,password);
        
    }
    function login(email,password) {
        console.log("Email",email);
        return signInWithEmailAndPassword( auth,email,password);
        
    }
    function logOut(){
        return signOut(auth)
    }
    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth,googleAuthProvider)
    }
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
         setUser(currentUser);
       });
       return ()=>{
        unsubscribe();
       }
    }, [])
    return <userAuthContext.Provider value={{user,signUp,login,googleSignIn,logOut}}>
        {children}
    </userAuthContext.Provider>
}
export function useUserAuth(){
    return  useContext(userAuthContext);
}