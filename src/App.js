import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import debounce from 'lodash.debounce'

class BooksApp extends React.Component {
  state = {
    searchResults:[],
    myReads:[]
  }

  componentDidMount() {
    this.getMyReads()
  }

  getMyReads = async () => {
    const myReads = await BooksAPI.getAll()
    this.setState(() => ({
      myReads
    }))
  }

  searchBooks =  debounce(async (query) => {    
    let searchResults = []
    if(query.trim() !== "") {
      searchResults = await BooksAPI.search(query)            
    }
    this.setState(() => ({
      searchResults
    }))
  },300)

  organizeByShelf = (shelf) => {
    const { myReads } = this.state
    if(myReads && myReads.length>0) {
      return myReads.filter(book => book.shelf===shelf)
    }return []
  }

  clearSearchResults = () => {
    this.setState(() => ({
      searchResults:[]
    }))
  }

  render() {
    return (
      <div className="app">        
        <Route exact path='/'
          render={() => (
          <ListBooks 
            currentlyReading={this.organizeByShelf('currentlyReading')}
            wantToRead={this.organizeByShelf('wantToRead')}
            read={this.organizeByShelf('read')}
          />
        )}
        />
        <Route path='/search'
          render={() => (
            <SearchBooks 
              searchResults={this.state.searchResults}
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
