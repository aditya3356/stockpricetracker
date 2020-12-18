import React from 'react';
import ListItem from './ListItem/ListItem';
import classes from './ListItems.css';

const listItems = ( props ) => {
    
    let containerClass = classes.ContainerPopularStocks;
    let marketPriceClass = "";

    if (props.heading=="Watchlist")
    {
        containerClass = classes.ContainerWatchlist;
        marketPriceClass = classes.MarketPrice;
    }
    // console.log(containerClass);
    // console.log(marketPriceClass);

    return(
        <div className={containerClass}>    
            
            <div className={classes.Heading}>
                {props.heading}
            </div>

            <div className={classes.ColumnHeaders}>
                <div>COMPANY</div>
                <div className={marketPriceClass}>MARKET PRICE</div>
            </div>

            {props.rows.map(row => {
                return(<ListItem key = {row.name} row = {row} heading = {props.heading} clicked = {props.clicked}/>);
            })
            }

        </div>
    )
};

export default listItems;