import React, { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Title, NavLink, Text} from '../styledComponents'

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <Title>Users</Title>
      <table>
        <thead>
          <tr>
            <th><Text>Name</Text></th>
            <th><Text>Blogs created</Text></th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user => {
            return <tr key={user.name}>
              <td>
                <NavLink to={'users/' + user.id}>{user.name}</NavLink>
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