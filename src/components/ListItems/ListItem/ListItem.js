import React from 'react';
import classes from './ListItem.css';

const listItem = ( props ) => {
    // console.log(props.row);
    return(
        <div className={classes.ListItem}>
            <div className={classes.CompanyDetails}>
                <img className={classes.Logo} src={props.row.logo} alt="logo image" />
                <div className={classes.Name}>
                    {props.row.name}
                </div>
            </div>

            <div className={classes.PriceWithIcon}>
                
                <div className={classes.PriceDetails}>
                    <div className={classes.PriceBreakup}>
                        <div className={classes.MarketPrice}>
                            ${props.row.marketPrice}
                        </div>
                        <div className={classes.USD}>USD</div>
                    </div>
                    {props.row.change<0 ? 
                        <div className={classes.PriceChange} style={{color: "#EB5757"}}>-${-props.row.change.toFixed(2)} USD ({-props.row.percentageChange.toFixed(2)}%)</div> :
                        <div className={classes.PriceChange} style={{color: "#27AE60"}}>+${props.row.change.toFixed(2)} USD ({props.row.percentageChange.toFixed(2)}%)</div>
                    }
                </div>
                
                {props.heading=="Watchlist"? 
                    <div className={classes.Icons} onClick = {() => props.clicked(props.row)} >
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 0C7.62563 0 0 7.62563 0 17C0 26.3744 7.62563 34 17 34C26.3744 34 34 26.373 34 17C34 7.62696 26.3744 0 17 0ZM17 31.3664C9.07939 31.3664 2.63361 24.9219 2.63361 17C2.63361 9.07807 9.07939 2.63361 17 2.63361C24.9206 2.63361 31.3664 9.07807 31.3664 17C31.3664 24.9219 24.9219 31.3664 17 31.3664Z" fill="black" fill-opacity="0.5"/>
                        </svg>
                        <svg className={classes.CrossIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.587 15.606L13.8625 11.8815L17.587 8.15705C18.101 7.64307 18.1019 6.80969 17.587 6.29476C17.0721 5.77984 16.2387 5.78078 15.7247 6.29476L12.0002 10.0192L8.27576 6.29476C7.76084 5.77984 6.92746 5.78078 6.41348 6.29476C5.89949 6.80875 5.89855 7.64213 6.41348 8.15705L10.138 11.8815L6.41348 15.606C5.89949 16.12 5.89855 16.9534 6.41348 17.4683C6.9284 17.9832 7.76178 17.9823 8.27576 17.4683L12.0002 13.7438L15.7247 17.4683C16.2396 17.9832 17.073 17.9823 17.587 17.4683C18.101 16.9543 18.1019 16.1209 17.587 15.606Z" fill="black" fill-opacity="0.5"/>
                        </svg>
                    </div>
                    :
                    null
                }

            </div>
        </div>
    )
};

export default listItem;