import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Title, Text, ListItem } from '../styledComponents'

const UserPage = () => {

  const id = useParams().id

  const user = useSelector(state => state.users.find(user => user.id === id))

  if(!user) {
    return null
  } else {
    return (
      <div>
        <Title>{user.name}</Title>
        <Text>added blogs</Text>
        <ul>
          {user.blogs.map(blog => <ListItem key={blog.id}>{blog.title}</ListItem>)}
        </ul>
      </div>
    )
  }
}

export default UserPage