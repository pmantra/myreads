import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'


class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        currentlyReading: books.filter(book => (book.shelf==='currentlyReading')),
        wantToRead: books.filter(book => (book.shelf==='wantToRead')),
        read: books.filter(book => (book.shelf==='read')),
      }))
    })
  }

  render() {
    return (
      <div className="app">        
        <Route exact path='/'
          render={() => (
          <ListBooks 
            currentlyReading = {this.state.currentlyReading} 
            wantToRead = {this.state.wantToRead} 
            read = {this.state.read} 
          />
        )}
        />
        <Route path='/search'
          component={SearchBooks}
        />  
      </div>
    )
  }
}

export default BooksApp
