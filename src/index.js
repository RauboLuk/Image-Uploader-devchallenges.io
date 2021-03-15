import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router
  } from 'react-router-dom'
import App from './components/App'
import { createGlobalStyle } from 'styled-components'
import 'semantic-ui-css/semantic.min.css'

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: Poppins, sans-serif;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
