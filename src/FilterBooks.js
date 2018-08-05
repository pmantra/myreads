import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class FilterBooks extends Component {

    state = {
        filter: undefined
    }

    handleInputChange = (value) => {
        this.setState(() => ({
            filter: value
        }))
        this.props.onFilter(value)
    }

    render() {
        const items = [
                { name: '4 & above', value: 4 },
                { name: '3 & above', value: 3 },
                { name: '2 & above', value: 2 },
                { name: '1 & above', value: 1 }
            ]

        return (
            <div className="filter-results-container">
                {this.state.filter &&
                    <div>
                        <strong>Clear Filter</strong>
                        <FontAwesomeIcon
                            icon="times-circle"
                            size="lg"
                            onClick={(event)=>this.handleInputChange(undefined)}
                        />
                    </div>
                }
                {this.state.filter===undefined &&
                    <strong>Filter Results</strong>
                }
                <div className="filter-by-ratings">
                    <span>average ratings</span>
                    {items.map(item => (
                    <div
                        className="filter-item"
                        key={item.value}>
                        <label>
                            <input
                                name="filter"
                                type="radio"
                                value={item.value}
                                checked={this.state.filter===item.value}
                                onChange={(event) => this.handleInputChange(event.target.value)} />
                            {item.name}
                        </label>
                    </div>
                ))}
                </div>
            </div>
        )
    }
}

export default FilterBooks