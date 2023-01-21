import { useEffect } from 'react'
import { useBooksContext } from '../hooks/useBooksContext';
import { useAuthContext } from '../hooks/useAuthContext';


//components
import BookDetails from '../components/BookDetails';
import BookForm from '../components/BookForm';

const Home = () => {

    const {books, dispatch} = useBooksContext()
    const {user} = useAuthContext()//we have access to the token from the user


    useEffect(() => {
        const fetchBook = async () => {
            //we are fetching the responce from the backend server
            //now that we have the user //we will send the authorization header in the request
            const response = await fetch('http://localhost:3000/books/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()  
            

            if(response.ok){
                dispatch({type:'SET_BOOK', payload: json})
            }
        }
        if(user){//now when the use effect function runs if we have a value for the user then only it will try to fetch the books
            fetchBook()
        }
    },[dispatch, user])

  return (
    <div>
        <div className="books">
            {books && books.map((book) => (
                <BookDetails key={book._id} book = {book}/>
            ))}
        </div>
        <BookForm/>
    </div>
  )
}

export default Home
