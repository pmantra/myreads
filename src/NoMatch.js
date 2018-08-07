import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const NoMatch = (props) => {
    return (
        <div className="no-match">
            <span>404 Page not found   </span>
            <FontAwesomeIcon
                icon="exclamation-circle"
                size="1x"
            />
            <br/>
            <Link
                className=''
                to='/'>
                <FontAwesomeIcon
                    icon="home"
                    size="1x"/>
            </Link>
        </div>
    )
}

export default NoMatch