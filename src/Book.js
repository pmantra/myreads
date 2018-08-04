import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class Book extends Component {

    moveToShelf = (toShelf) => {
        const { shelf:fromShelf } = this.props.bookInfo
        this.props.onShelfChange(toShelf,fromShelf,this.props.bookInfo)
    }

    render() {
        const { bookInfo } = this.props
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            width: 130,
                            height: 170,
                            backgroundImage: `url(${bookInfo.imageLinks.smallThumbnail})`
                            }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select
                            value={bookInfo.shelf}
                            onChange={(event) => this.moveToShelf(event.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{bookInfo.title}</div>
                {bookInfo.description && bookInfo.description.trim()!=="" &&
                    <div>
                        <FontAwesomeIcon
                            icon="info-circle"
                            size="1x"
                            data-tip
                            data-for={bookInfo.id}
                            data-multiline
                        />
                        <ReactTooltip
                            id={bookInfo.id}
                            className="book-description">
                            <span>{bookInfo.description}</span>
                        </ReactTooltip>
                    </div>

                }

                {bookInfo.authors &&
                        <div className='book-authors'>
                            {bookInfo.authors.map(author => (
                            <div key={author}>{author}</div>)
                            )}
                        </div>
                }
                {bookInfo.averageRating &&
                    bookInfo.ratingsCount &&
                    <div className='book-authors'>
                        <div>{bookInfo.averageRating} stars ({bookInfo.ratingsCount} reviews)</div>
                    </div>
                }
            </div>
        )
    }
}

export default Book