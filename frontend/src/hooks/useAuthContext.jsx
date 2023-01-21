import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    //this will return the value of the context 
    //which is the value that we passed in teh provider component
    //so it is that object with teh state and the dispatach function 
    const context = useContext(AuthContext)

    if(!context){
        throw Error('useAuthContext must be used inside a Auth ContextProvider')
    }

    return context

}