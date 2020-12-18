import React from 'react';
import classes from './SearchItem.css';

const searchItem = ( props ) => {
    // console.log(props.row);
    return(
        <div className={classes.SearchItem}>
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

                <div className={classes.Icons} onClick = {() => props.addClicked(props.row)} >
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 0C7.62563 0 0 7.62563 0 17C0 26.3744 7.62563 34 17 34C26.3744 34 34 26.373 34 17C34 7.62696 26.3744 0 17 0ZM17 31.3664C9.07939 31.3664 2.63361 24.9219 2.63361 17C2.63361 9.07807 9.07939 2.63361 17 2.63361C24.9206 2.63361 31.3664 9.07807 31.3664 17C31.3664 24.9219 24.9219 31.3664 17 31.3664Z" fill="#AE42C9"/>
                    </svg>
                    <svg className={classes.PlusIcon} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5843 7.5647H9.31708V2.29749C9.31708 1.5706 8.72846 0.980652 8.00025 0.980652C7.27204 0.980652 6.68341 1.5706 6.68341 2.29749V7.5647H1.4162C0.68799 7.5647 0.0993652 8.15465 0.0993652 8.88153C0.0993652 9.60842 0.68799 10.1984 1.4162 10.1984H6.68341V15.4656C6.68341 16.1925 7.27204 16.7824 8.00025 16.7824C8.72846 16.7824 9.31708 16.1925 9.31708 15.4656V10.1984H14.5843C15.3125 10.1984 15.9011 9.60842 15.9011 8.88153C15.9011 8.15465 15.3125 7.5647 14.5843 7.5647Z" fill="#AE42C9"/>
                    </svg>
                </div>
            </div>
        </div>
    )
};

export default searchItem;