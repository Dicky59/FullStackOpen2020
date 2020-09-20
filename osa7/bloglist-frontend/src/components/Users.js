import React, { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

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
            return <tr key={user.id}>
              <td style={{ textAlign: 'center' }}>{user.name}</td>
              <td style={{ textAlign: 'center' }}>{user.blogs.length}</td>
            </tr>}
          )}
        </tbody>
      </table>
    </div>
  )
}


export default Users