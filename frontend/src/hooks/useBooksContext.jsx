import { BookContext } from "../context/BookContext";
import { useContext } from "react";

export const useBooksContext = () => {
    //this will return the value of the context 
    //which is the value that we passed in teh provider component
    //so it is that object with teh state and the dispatach function 
    const context = useContext(BookContext)

    if(!context){
        throw Error('useBooksContext must be used inside a Books ContextProvider')
    }

    return context

}