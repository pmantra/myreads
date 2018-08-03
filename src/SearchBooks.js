import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component { 

    handleChange = (event) => {
        this.props.onSearch(event.target.value)    
    }

    render() {
        return (            
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        className = 'close-search'
                        to = '/'>Close
                    </Link>                        
                    <div className="search-books-input-wrapper">                            
                        <input 
                            type="text" 
                            placeholder="Search by title or author"                            
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                {this.props.searchResults && this.props.searchResults.length>0 &&
                    <ol className="books-grid">
                    {this.props.searchResults.map(book => (
                        <Book key={book.id} bookInfo={book}
                    />
                    ))}                      
                </ol>
                }                    
                </div>
            </div>            
        )
    }
}

export default SearchBooks