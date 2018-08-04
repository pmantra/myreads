import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Book from './Book'

class SearchBooks extends Component { 

    state = {
        searchText:""
    }

    handleChange = (searchText) => {
        this.setState(()=>({
            searchText
        }))
        this.props.onSearch(searchText)    
    }

    onClose = (event) => {
        this.setState(()=>({
            searchText:""
        }))
        this.props.onSearch("")     
    }    

    render() {
        return (            
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        className='close-search'
                        to='/'
                        onClick={(event) => this.onClose(event)}
                        >Close
                    </Link>                        
                    <div className="search-books-input-wrapper">                            
                        <input 
                            type="text" 
                            placeholder="Search by title or author" 
                            value={this.state.searchText}                           
                            onChange={(event) => this.handleChange(event.target.value)}
                        />                        
                    </div>
                    
                    <FontAwesomeIcon 
                        icon="times" 
                        size="2x"  
                        className="search-clear"
                        onClick={this.onClose}
                    />
                    
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