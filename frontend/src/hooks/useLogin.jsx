import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

//we will trigger the login end point of our api and get a response back 
//and if the login was successfull 
//if the user is logged in we will also update the authContext
//to say look we have the current user now and in the context we will update that user property

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext()

    //the is loading state us going to be true when we start the request
    //so if you wnat some sort of loading state or disabled state on your bottom 
    //in the form when we start to send the request we can use this piece of state

    const  login = async(email, password, username) =>{
        setIsLoading(true)
        setError(null)

        //now we are going to make that post request
        //as this is a post requst we need to pass in some parameteres
        //we have teo send a body in the json format

        // const responce = await fetch('http://localhost:3000/books/', {   
        //     method: 'POST',
        //     body: JSON.stringify(book),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })

        const response = await fetch('http://localhost:3000/user/login/', {
            method: 'POST',
            body: JSON.stringify({email, password, username}),
            headers: {'Content-Type':'application/json'}
        })

        const json = await response.json() //this sill return some info with the JWT if it was a success
        //if it was not a success it will send us an error message

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }else{
            //save the user to loacal storage
            localStorage.setItem('user', JSON.stringify(json))//we are stringfying it as we have to store string inside the local storage
            //update the auth context
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }

    }

    return {login, isLoading, error}

}
    