import React from 'react'

const Comment = ({ comments }) => {
  return (
    <div className="comments">
      <h4>Comments</h4>
      <ul>
        {
          comments.map((comment) =>
            <li key={comment}>{comment}</li>
          )
        }
      </ul>
    </div>
  )
}

export default Comment