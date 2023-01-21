import React from 'react'
import { useBooksContext } from '../hooks/useBooksContext'
import { useAuthContext } from '../hooks/useAuthContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BookDetails = ({book}) => {

  const {dispatch} = useBooksContext()
  const {user} = useAuthContext()

  const handleClick = async() => {

    if(!user){
      return 
    }

    const response = await fetch('http://localhost:3000/books/' + book._id, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type: 'DELETE_BOOK', payload: json})
    }

  }

  return (
    <div>
      <h4>Title: {book.title}</h4>
      <p><strong>Author: {''}</strong>{book.author}</p>
      <p><strong>Description: {''}</strong>{book.description}</p>
      <p>Created: {formatDistanceToNow(new Date(book.createdAt), {addSuffix: true})}</p>
      <span onClick={handleClick} ><button>delete</button></span>
    </div>
  )
}

export default BookDetails
