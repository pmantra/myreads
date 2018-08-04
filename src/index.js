import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

library.add({faTimes,faInfoCircle})

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root'))
