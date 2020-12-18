import React from 'react';
import SearchItem from './SearchItem/SearchItem';

const searchItems = ( props ) => {
    return(       
        props.rows.map(row => {
            return(<SearchItem key = {row.name} row = {row} addClicked = {props.addClicked} />);
        })
        
    )
};

export default searchItems;