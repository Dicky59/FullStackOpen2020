import styled from 'styled-components'
import { Link } from 'react-router-dom'

const titleFont =  'Arial, bold'

export const Text = styled.div`
  font-family: Helvetica, Arial, sans-serif;
  margin: 0.5em;
`
export const Form = styled.form`
  padding: 10px;
`

export const Container = styled.div`
  padding: 20px;
  width: 90%;
  max-width: 1080px;
  height: 100%;
`
export const Footer = styled.div`
  background: #393939;
  font-family: Helvetica, Arial, sans-serif;
	color: white;
  padding: 1em;
  margin-top: 1em;
`
export const FormGroup = styled.div`
	color: darkblue;
    display: block;
	width: 300px;
	margin: 50px auto;
`

export const Label = styled.label`
  margin-bottom: 0.5em;
  font-family: Helvetica, Arial, sans-serif;
	color: darkblue;
    display: block;
`

export const Input = styled.input`
  padding: 0.5em;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1em;
	color: darkblue;
	background: #F0EBF4;
	border: none;
	border-radius: 3px;
	width: 50%;
	margin-bottom: 0.5em;
`
export const Navigation = styled.div`
  background-color: #2D4159;
  font-size: 1em;
  color: white;
  display: flex;
  padding: 5px;
  flex-wrap: wrap;
  align-content; space-around;
`
export const Button = styled.button`
  background: #6495ED;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px darkgreen;
  border-radius: 3px;
`
export const Title = styled.h1`
  font-family: ${titleFont};
`
export const Page = styled.div`
  padding: 1em;
  background: #97AABD;
`
export const NavLink = styled(
  styled(Link)`
    color: palevioletred;
    display: block;
    margin: 0.5em;
    font-family: Helvetica, Arial, sans-serif;
    text-align: left;

    &:hover {
      text-decoration: underline;
      color: white;
    }
  `,
  'active'
)`
  color: blue;
`
export const StyledBlogList = styled.div`
  padding: 0.4em;
  border: 1px solid black;
  &:hover,
  & > *:hover {
    background-color: #6495ED;
    color: white;
  }
`
export const ListItem = styled.li`
  font-family: Helvetica, Arial, sans-serif;
  list-style-type: "\\2605";
  margin: 5px;
`
export const StyledA = styled.a`
  font-family: Helvetica, Arial, sans-serif;
  text-decoration: underline blue;
  &:hover {
    text-decoration: underline;
    color: blue
  }
`