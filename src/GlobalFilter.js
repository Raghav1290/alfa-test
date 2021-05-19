import React from 'react'
import './GlobalFilter.css';

export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <span className="search">
            <input placeholder="Search..." value={filter || ''} onChange={e => setFilter(e.target.value)} /> 
            <small><b>NOTE: </b>All the table headers are sorting buttons. You can sort any column by clicking on them..</small>
        </span>
    )
}
