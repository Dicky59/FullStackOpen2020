import React from 'react'

const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.exercises}</p>
  ) 
}

const Part = (props) => { 
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Course = ({course}) => {
  const total = course.parts.reduce((s, part) => s + part.exercises, 0)

  return (
      <div>
          <Header name={course.name}/>
          <Content parts={course.parts}/>
          <Total exercises={total}/>
      </div>
  )
}

export default Course