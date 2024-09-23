import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3456/users')
      setUsers(response.data)
    } catch (error) {
      console.log("Failed to fetch users", error)
    }
  }

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3456/register', { name, email, password })
      console.log("User registered", response.data)
      fetchUsers() // Fetch updated list of users
    } catch (error) {
      console.log("Failed to register", error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <h1>Register here</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>

      <h2>Registered Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
