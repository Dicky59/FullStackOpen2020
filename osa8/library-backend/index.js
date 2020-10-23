const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = config.JWT_SECRET

mongoose.set('useFindAndModify', false)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        .then(() => console.log('connected to MongoDB'))
        .catch((error) => { console.log('error connection to MongoDB:', error.message) })

const typeDefs = gql`
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}
type Token {
  value: String!
}
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]
  id: ID!
}
type Author {
  name: String!
  born: Int
  id:ID!
  bookCount: Int!
}
type Query {
  me: User
  bookCount: Int!
  authorCount: Int!
  allBooks(name: String, genre: String): [Book!]!
  allAuthors: [Author!]!
  
}
type Mutation {
  addBook(
    title: String!
    author: String
    published: Int!
    genres: [String]!
  ): Book
  editAuthor(
    name: String!
    born: Int!
  ): Author
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}  
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: () => Book.find({}),
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: (root) => Book.find({ author: root.id }).countDocuments()
  },
  Book: {
    author: (root) => Author.findOne({ _id: root.author })
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError('Invalid credentials')
      try {
        let author = await Author.findOne({ name: args.name })
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
        const book = new Book({ ...args, author })
        return book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
  },
  editAuthor: async (root, args, context) => {
    if (!context.currentUser)
      throw new AuthenticationError('Invalid credentials')
      let author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.born
      await author.save()
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })
  
      try {
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'pw123' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})