import React from 'react'

const Filter = ({ filter, handleFilterChange }) => (
  <form>
    <div>Filter shown with: <input value={filter} onChange={handleFilterChange}/></div>
  </form>
)

export default Filter