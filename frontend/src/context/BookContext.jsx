import { createContext, useReducer } from 'react'

export const BookContext = createContext()

//now we need to provide that context to our application component tree

export const bookReducer = (state, action) => {
  switch(action.type){
    case 'SET_BOOK':
      return {
        books: action.payload
      }
    case 'CREATE_BOOK':
      return {
        books: [action.payload, ...state.books]
      }
    case 'DELETE_BOOK':
      return{
        books: state.books.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const BookContextProvider = ({children}) => { 

  const [state, dispatch] = useReducer(bookReducer,{
    books:null
  })

  return(
    <BookContext.Provider value = {{...state, dispatch}}>
      {children}
    </BookContext.Provider>
  )

}
