import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

class Book extends Component {

    /**
     *  propogate the book info with source and target shelves
     * all the way to the parent to keep state
     * @param target shelf
     */
    moveToShelf = (toShelf) => {
        const { shelf:fromShelf } = this.props.bookInfo
        this.props.onShelfChange(toShelf,fromShelf,this.props.bookInfo)
    }

    render() {
        const { bookInfo } = this.props
        const imageURL = bookInfo.imageLinks && bookInfo.imageLinks.smallThumbnail
                                                        ? bookInfo.imageLinks.smallThumbnail
                                                        : 'http://via.placeholder.com/128x193?text=No%20Image'

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            width: 130,
                            height: 170,
                            backgroundImage: `url(${imageURL})`
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

Book.propTypes = {
    bookInfo: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired,
}

export default Book