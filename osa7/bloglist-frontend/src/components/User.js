import React from 'react'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <tr key={user.id}>
      <td>{user.username}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )
};

export default User
