import {React, useState} from 'react'
import { useLogin } from '../hooks/useLogin';



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async(e) => {//the function is async as later on we are going to make request to the backend
        e.preventDefault()
        await login(email, password, username)
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>

            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>

            <label>Username:</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>

            <button disabled={isLoading}>Log in</button>
            {error && <div>{error}</div>}
        </form>
    </div>
  )
}

export default Login
