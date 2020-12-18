import React, { Component } from 'react';
import classes from './Searchbar.css';
import SearchItems from '../SearchItems/SearchItems';
import ListItems from '../ListItems/ListItems';

class searchbar extends Component {
    
    state = {
        inputValue: "",
        filteredCompanies: []
    }

    onChangeHandler = (event) => {
        let inputValue = event.target.value;

        const filteredCompanies = [];
        if (inputValue.length>=3)
        {
            this.props.rows.forEach(company => {
                if (company.name.toLowerCase().includes(inputValue.toLowerCase()))
                {
                    // console.log(company);
                    filteredCompanies.push(company);
                }
            });
        }

        console.log(filteredCompanies);

        this.setState({inputValue: inputValue, filteredCompanies: filteredCompanies});
    }

    onClickHandler = (row) => {
        let filteredCompanies = [...this.state.filteredCompanies];

        let updatedfilteredCompanies = [];
        filteredCompanies.forEach(company => {
            if (company.symbol != row.symbol)
                updatedfilteredCompanies.push(company);
        });
        this.setState({filteredCompanies: updatedfilteredCompanies});
        this.props.addClicked(row);
    }

    clearSearchClicked = () => {
        this.setState({inputValue: "", filteredCompanies: []});
    }

    render(){
        return(
            <div>
                <ListItems rows = {this.props.watchlistStocks} heading = {this.props.heading} clicked = {this.props.clicked} />
                <div className={classes.Container}>
                        
                        <input 
                            className={classes.Searchbar}
                            placeholder="Search stocks to add to watchlist"
                            value={this.state.inputValue}
                            onChange={this.onChangeHandler}
                        />  
                        
                        <div className = {classes.Icons}>
                            <svg className={classes.CrossIcon} onClick = {this.clearSearchClicked} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.87555 10L0.439987 2.56443C-0.146662 1.97778 -0.146662 1.02664 0.439987 0.439987C1.02664 -0.146662 1.97778 -0.146662 2.56443 0.439987L10 7.87555L17.4356 0.439987C18.0222 -0.146662 18.9734 -0.146662 19.56 0.439987C20.1467 1.02664 20.1467 1.97778 19.56 2.56443L12.1244 10L19.56 17.4356C20.1467 18.0222 20.1467 18.9734 19.56 19.56C18.9734 20.1467 18.0222 20.1467 17.4356 19.56L10 12.1244L2.56443 19.56C1.97778 20.1467 1.02664 20.1467 0.439987 19.56C-0.146662 18.9734 -0.146662 18.0222 0.439987 17.4356L7.87555 10Z" fill="#AE42C9"/>
                            </svg>
                            
                            <div className={classes.Bar}></div>
                            
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.6576 26.008L19.6953 18.0457C21.2376 16.1405 22.1662 13.7197 22.1662 11.0831C22.1662 4.97226 17.194 0 11.0831 0C4.9722 0 0 4.9722 0 11.0831C0 17.194 4.97226 22.1662 11.0831 22.1662C13.7197 22.1662 16.1405 21.2376 18.0457 19.6953L26.008 27.6576C26.2355 27.8851 26.5341 27.9995 26.8328 27.9995C27.1315 27.9995 27.4302 27.8851 27.6577 27.6576C28.1138 27.2015 28.1138 26.4641 27.6576 26.008ZM11.0831 19.8329C6.25788 19.8329 2.33331 15.9083 2.33331 11.0831C2.33331 6.25783 6.25788 2.33325 11.0831 2.33325C15.9084 2.33325 19.833 6.25783 19.833 11.0831C19.833 15.9083 15.9083 19.8329 11.0831 19.8329Z" fill="#AE42C9"/>
                            </svg>
                        </div>
                    

                    <SearchItems className = {classes.SearchItems} rows = {this.state.filteredCompanies} addClicked = {this.onClickHandler} />
                </div> 
            </div>
        )
    }
}

export default searchbar;