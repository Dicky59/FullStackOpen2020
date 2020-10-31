import React,{ useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)
  const [bookData, setBookData] = useState([])
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if(result.data){
      setBookData(result.data.allBooks)
      const genresArray = result.data.allBooks.flatMap(book => book.genres)
      setGenres([...new Set(genresArray), "All genres"])
    }
  }, [result])

  const filteredByGenre = bookData
  .filter( book => (genre && genre !== "All genres")
  ? book.genres.includes(genre)
  : book)

  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>Books</h2>
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
          {filteredByGenre.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <ul style={{ listStyle: "none", display: "flex" }}>
          {genres.map( (genre, id) =>  
          <li key={id}> 
            <button 
              onClick={() => setGenre(genre)}> {genre}
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Books