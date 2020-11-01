import React, { useEffect } from 'react'
import { ALL_BOOKS, ME } from '../queries'
import { useLazyQuery } from '@apollo/client'

const FavoriteBooks = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [getMe, meResult] = useLazyQuery(ME, {
    onCompleted: (data) => {
      getBooks({
        variables: {genre: data.me.favoriteGenre}
      })
    }
  })

  useEffect(() => {
    if (props.token) {
      getMe()
    }
  }, [getMe, props.token])

  if (!props.show || !props.token) {
    return null
  }

  if (result.loading || meResult.loading)  {
    return <div>Loading...</div>
  }
  
  const books = result.data.allBooks
  const favoriteGenre = meResult.data.me.favoriteGenre

  return (
    <div>
      <h2>Recommendations</h2>
      <div>Books in your favorite genre <strong>{favoriteGenre}</strong></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {books.map(book => (book.genres.includes(favoriteGenre)) && (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FavoriteBooks