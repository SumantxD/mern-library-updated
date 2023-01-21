import {React, useState} from 'react'
import { useSignup } from '../hooks/useSignup';



const Signup = () => {

    // console.log('firsty')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async(e) => {//the function is async as later on we are going to make request to the backend

        e.preventDefault()

        await signup(email, password, username)
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h3>Sigh up</h3>

            <label>Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>

            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>

            <label>Username:</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>

            <button disabled = {isLoading}>Sign Up</button>
            {/* <button>Sign Up</button> */}

            {error && <div>{error}</div>}

        </form>
    </div>
  )
}

export default Signup
