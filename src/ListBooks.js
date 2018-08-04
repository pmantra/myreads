import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends Component {

    handleShelfChange = (toShelf,fromShelf,book) => {
        this.props.onShelfChange(toShelf,fromShelf,book)
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {this.props.shelves.map(shelf => (
                        <BookShelf
                            key={shelf.name}
                            shelfName={shelf.display}
                            books={shelf.books}
                            onShelfChange={this.handleShelfChange}
                        />
                    ))}
                </div>
                <div className="open-search">
                    <Link
                        to='/search'
                    >Add a book
                    </Link>
                </div>
            </div>
        )
    }
}
//TODO: add propTypes

export default ListBooks