import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`
export const ALL_BOOKS = gql`
query ($genre: String) {
  allBooks (genre: $genre) {
    title
    author {
      name
      born
      bookCount
    }
    genres
    published
  }
}
`
export const CREATE_BOOK = gql`
  mutation createBook($title: String!,$author: String!, $published: Int!, $genres: [String!]!){
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
  ) {
      title
      published
      genres
      id
    }
  }
` 
export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      born: $born
    ) {
      name
      born
      id
    }
  }
` 
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const ME = gql`
  query{
    me{
      username
      favoriteGenre
      id
    }
  }
`
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      name
      born
      bookCount
    }
    genres
    published
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
` 