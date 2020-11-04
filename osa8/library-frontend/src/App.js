import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import FavoriteBooks from './components/FavoriteBooks'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, AUTHOR_ADDED, ALL_BOOKS, ALL_AUTHORS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateBookCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  const updateAuthorCacheWith = (addedAuthor) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_AUTHORS })
    if (!includedIn(dataInStore.allAuthors, addedAuthor)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: dataInStore.allAuthors.concat(addedAuthor) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateBookCacheWith(addedBook)
      window.alert(`new book added: ${addedBook.title}`)
    }
  })

  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedAuthor = subscriptionData.data.authorAdded
      updateAuthorCacheWith(addedAuthor)
      window.alert(`new author added: ${addedAuthor.title}`)
    }
  })

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
      <FavoriteBooks show={page === 'favoritebooks'} token={token} />
		</div>
  )
}

export default App