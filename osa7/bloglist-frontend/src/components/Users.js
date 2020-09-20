import React, { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user => {
            return <tr key={user.name}>
              <td>
                <Link to={'/users/' + user.id}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>}
          )}
        </tbody>
      </table>
    </div>
  )
}


export default Users