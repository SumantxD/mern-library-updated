import React from 'react'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useBooksContext } from '../hooks/useBooksContext';




const BookForm = () => {

    const {dispatch} = useBooksContext()

    const {user} = useAuthContext()

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError('You must be logged in')
            return
        }

        const book  = {title, author, description}

        const responce = await fetch('http://localhost:3000/books/', {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await responce.json()

        if(!responce.ok){
            setError(json.error)
        }else{
            setTitle('')
            setAuthor('')
            setDescription('')
            setError(null)
            dispatch({type: "CREATE_BOOK", payload: json})
            console.log('new book added', json)
        }

    }

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new book</h3>

        <label>Book Title:</label>
        <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value = {title}
        />

        <label>Book Author:</label>
        <input 
            type="text" 
            onChange={(e) => setAuthor(e.target.value)}
            value = {author}
        />

        <label>Book Description:</label>
        <input 
            type="text" 
            onChange={(e) => setDescription(e.target.value)}
            value = {description}
        />

        <button>
            Add a Book
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  )
}

export default BookForm
