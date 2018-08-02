import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

const ListBooks = () => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">          
                <BookShelf />          
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

//TODO: add propTypes

export default ListBooks