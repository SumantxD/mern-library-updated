import { useAuthContext } from "./useAuthContext"
import { useBooksContext } from "./useBooksContext"


export const useLogout = () => {

    const {dispatch} = useAuthContext()
    const {dispatch: booksDispatch} = useBooksContext()

    const logout = () => {
        //we have to chnage the global stage and 
        //we have to delete the JWT in the local storage

        //that will sort out logout for both the frontend and the backend

        //remove user from local storage
        localStorage.removeItem('user')

        //dispatch a logout action 
        dispatch({type: 'LOGOUT'})//there is no paylaod we just reset the user to be null
        booksDispatch({type: 'SET_BOOK', payload: null}) //as teh workout to render will become action.payload which is null so it will cear it out

    }

    return {logout}
}