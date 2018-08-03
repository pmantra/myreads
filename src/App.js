import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import debounce from 'lodash.debounce'


class BooksApp extends React.Component {
  state = {
    allBooks: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => this.prepareBookShelves(books))
  }

  prepareBookShelves = (books) => {
    if(books && books.length>0) {
      this.setState(() => ({
        allBooks: books,        
        currentlyReading: books.filter(book => (book.shelf==='currentlyReading')),                              
        wantToRead: books.filter(book => (book.shelf==='wantToRead')),                         
        read: books.filter(book => (book.shelf==='wantToRead'))              
      }))  
    } else {
      this.setState(() => ({
        allBooks: []        
      }))  
    }    
  }

  searchBooks =  debounce((query) => {
    if(query !== "") {
      BooksAPI.search(query)
      .then(results => 
          this.prepareBookShelves(results))  
    }
  },300)

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
          render={() => (
            <SearchBooks 
              searchResults={this.state.allBooks}
              onSearch={(query) => {
              this.searchBooks(query)              
            }}
            />    
          )}
        />  
      </div>
    )
  }
}

export default BooksApp
