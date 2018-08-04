import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import debounce from 'lodash.debounce'

class BooksApp extends React.Component {
  state = {
    searchResults: [],
    shelves: [
      {display: 'Currently Reading', name: 'currentlyReading', books: []},
      {display: 'Want to Read', name: 'wantToRead', books: []},
      {display: 'Read', name: 'read', books: []}
    ]
  }

  componentDidMount() {
    this.getMyReads()
  }

  getMyReads = async () => {
    const myReads = await BooksAPI.getAll()
    const { shelves } = this.state
    const newShelves = []
    for (let {display, name, books} of shelves) {
      books = this.organizeMyReadsByShelf(myReads,name)
      const shelf = { display, name, books }
      newShelves.push(shelf)
    }
    this.setState(() => ({
      shelves: newShelves
    }))
  }

  setBookShelf = (books) => {
    let myReads = []
    books.forEach(book => {
      myReads = myReads.concat(...this.state.shelves.map(shelf => shelf.books))
      const found = myReads.find(myRead => myRead.id === book.id)
      book.shelf = found ? found.shelf : 'none'
    })
  }

  searchBooks =  debounce(async (query) => {
    let searchResults = []
    if(query.trim() !== "") {
      searchResults = await BooksAPI.search(query)
      if(searchResults && searchResults.length>0) {
        this.setBookShelf(searchResults)
      }
    }
    this.setState(() => ({
      searchResults
    }))
  },300)

  organizeMyReadsByShelf = (myReads, shelf) => {
    return myReads && myReads.length > 0 ? myReads.filter(myRead => myRead.shelf === shelf) : []
  }

  clearSearchResults = () => {
    this.setState(() => ({
      searchResults:[]
    }))
  }

  handleShelfChange = (toShelf, fromShelf, movingBook) => {
    movingBook.shelf = toShelf
    const targetShelf = this.state.shelves.find(shelf => shelf.name === toShelf)
    if (targetShelf) {
      this.setState((currentState) => ({
        targetShelf: targetShelf.books.push(movingBook)
      }))
    }
    const sourceShelf = this.state.shelves.find(shelf => shelf.name === fromShelf)
    if (sourceShelf) {
      const bookIndex = sourceShelf.books.indexOf(movingBook)
      this.setState(() => ({
        sourceShelf: sourceShelf.books.splice(bookIndex, 1)
      }))
    }
  }

  render() {
    const { shelves } = this.state
    return (
      <div className="app">
        <Route exact path='/'
          render={() => (
          <ListBooks
            shelves={shelves}
            onShelfChange={this.handleShelfChange}
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
              onShelfChange={this.handleShelfChange}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
