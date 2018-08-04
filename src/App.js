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
    this.showMyReads()
  }

  /**
   * Gets books from service and organizes each book a
   * ccording to the shelf it belongs to
   */
  showMyReads = async () => {
    const myReads = await BooksAPI.getAll()
    const { shelves } = this.state
    const updatedShelves = []
    for (let {display, name, books} of shelves) {
      books = this.organizeMyReadsByShelf(myReads,name)
      updatedShelves.push({ display, name, books })
    }
    this.setState(() => ({
      shelves: updatedShelves
    }))
  }

  /**
   * Calls api with search query and shows search results
   */
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

  /**
   * Utility function that shows the bookshelf information
   * of books searched
   */
  setBookShelf = (books) => {
    let myReads = []
    books.forEach(book => {
      myReads = myReads.concat(...this.state.shelves.map(shelf => shelf.books))
      const found = myReads.find(myRead => myRead.id === book.id)
      book.shelf = found ? found.shelf : 'none'
    })
  }

  /**
   * Utility function that filters books by a given shelf
   * @returns booksByShelfName
   */
  organizeMyReadsByShelf = (myReads, shelf) => {
    return myReads && myReads.length > 0 ? myReads.filter(myRead => myRead.shelf === shelf) : []
  }

  /**
   * Clears the search results
   */
  clearSearchResults = () => {
    this.setState(() => ({
      searchResults:[]
    }))
  }

  /**
   * Invoked when a book is moved from one shelf to another
   */
  handleShelfChange = (toShelf, fromShelf, movingBook) => {
    movingBook.shelf = toShelf
    //move book to new shelf
    const targetShelf = this.state.shelves.find(shelf => shelf.name === toShelf)
    if (targetShelf) {
      this.setState((currentState) => ({
        targetShelf: targetShelf.books.push(movingBook)
      }))
    }
    //remove book from old shelf
    const sourceShelf = this.state.shelves.find(shelf => shelf.name === fromShelf)
    if (sourceShelf) {
      const bookIndex = sourceShelf.books.indexOf(movingBook)
      this.setState(() => ({
        sourceShelf: sourceShelf.books.splice(bookIndex, 1)
      }))
    }
    //call api
    BooksAPI.update(movingBook,toShelf)
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
