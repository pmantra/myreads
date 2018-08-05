import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {

  handleShelfChange = (toShelf,fromShelf,book) => {
    this.props.onShelfChange(toShelf,fromShelf,book)
  }

  render() {
    const { shelfName, books } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName} ({books.length})</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book
                key={book.id}
                bookInfo={book}
                onShelfChange={this.handleShelfChange}
              />
            ))}
          </ol>
      </div>
    </div>
    )
  }
}

BookShelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
}

export default BookShelf