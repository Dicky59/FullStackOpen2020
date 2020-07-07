import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>   
    </tr>
  )
} 

const Statistics = ({good, neutral, bad}) => {
  const all = good + bad + neutral

  if (all === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
        <table>
          <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={all} />
          <StatisticLine text="Average" value={(good-bad)/all} />
          <StatisticLine text="Positive" value={`${good/all*100} %`} />
          </tbody>
      </table>
    </div>
        
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback!</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
