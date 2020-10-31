import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import FavoriteBooks from './components/FavoriteBooks'
import { useApolloClient } from '@apollo/client'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage('favoritebooks')}>recommend</button>}
				{token && <button onClick={() => setPage("add")}>add book</button>}
				{token ? (
					<button onClick={logout}>logout</button>
				) : (
					<button onClick={() => setPage("login")}>login</button>
				)}
		</div>
			<Authors show={page === "authors"} />
			<Books show={page === "books"} />
			<NewBook show={page === "add"} />
			<LoginForm setToken={setToken} show={page === "login"} />
      <FavoriteBooks show={page === 'favoritebooks'} />
		</div>
  )
}

export default App