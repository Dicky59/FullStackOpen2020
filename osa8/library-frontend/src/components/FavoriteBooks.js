import React, { useState, useEffect } from 'react'
import { ALL_BOOKS, ME } from '../queries'
import { useQuery } from '@apollo/client'

const FavoriteBooks = (props) => {
  const [books, setBooks] = useState([])
  const [genreFilter, setGenreFilter] = useState(null)
  const result = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  useEffect(() => {
    if (result.data) {
      const allBooks = result.data.allBooks
      setBooks(allBooks)
    }
  }, [result.data])

  useEffect(() => {
    if (user.data && user.data.me) {
      setGenreFilter(user.data.me.favoriteGenre)
    }
  }, [user])

  const filteredBooks = () => {
    const filtered = genreFilter
      ? books.filter(book => book.genres.includes(genreFilter))
      : books
    return filtered
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div>Books in your favorite genre <strong>{genreFilter}</strong></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks().map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default FavoriteBooks