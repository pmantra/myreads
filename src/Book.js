import React from 'react'

const Book = (props) => {    
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" 
                    style={{ 
                        width: 130, 
                        height: 170, 
                        backgroundImage: `url(${props.bookInfo.imageLinks.smallThumbnail})`
                        }}>
                </div>
                <div className="book-shelf-changer">
                    <select>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
        <div className="book-title">{props.bookInfo.title}</div>
            {props.bookInfo.authors && 
                <div className='book-authors'>
                    {props.bookInfo.authors.map(author => (
                        <div key={author}>{author}</div>)
                    )}            
                </div>
            }
            {props.bookInfo.averageRating && 
                props.bookInfo.ratingsCount &&
                <div className='book-authors'>                    
                    <div>{props.bookInfo.averageRating} stars ({props.bookInfo.ratingsCount} reviews)</div>                    
                </div>
            }

        </div>    
    )
}

export default Book