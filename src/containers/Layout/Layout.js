import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Table from '../../components/Table/Table';
import axios from 'axios';
import config from '../../config.json';
import stockList from '../../data.json';
import Autocomplete from '../../components/Autocomplete/Autocomplete';
import logoList from '../../logos.json';
import Modal from '../../components/Modal/Modal';
import classes from './Layout.css';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import ListItems from '../../components/ListItems/ListItems';
import Searchbar from '../../components/Searchbar/Searchbar';

firebase.initializeApp({
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTHDOMAIN
})
firebase.auth().signOut();
class Layout extends Component {
    
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccess: () => false
        }
    }

    startingData = [];

    symbolToName = {};
    nameToSymbol = {};
    names = [];
    symbols = [];
    companies = this.startingData;

    state = {
        popularStocks: [],
        signedIn: false,
        user: null,
        uid: "",
        homeClicked: true,
        watchlistClicked: false,
        showModal: false,
        watchlistStocks: []
    }
    
    componentWillMount(){
        firebase.auth().onAuthStateChanged (user => {
            this.signInToggleHandler(user);
            console.log(user);
        })

        stockList.forEach(item => {
            let symbol = item["Holding Ticker"].trim();
            let name = item.Name.trim();
            // console.log(typeof symbol);
            this.symbolToName = {...this.symbolToName, [symbol]: name};
            this.symbols.push(symbol);
            this.names.push(name);
        })

        stockList.forEach(item => {
            let symbol = item["Holding Ticker"].trim();
            let name = item.Name.trim();
            // console.log(typeof symbol);
            this.nameToSymbol = {...this.nameToSymbol, [name]: symbol};
        })


        let yesterday = new Date(new Date().setDate(new Date().getDate()-3))
        axios.get(config.END_POINT+"bars/1D", {
            headers: {
                "APCA-API-KEY-ID": config.API_KEY,
                "APCA-API-SECRET-KEY": config.SECRET_KEY,
            },
            params: {
                "symbols": this.symbols.toString(),
                "start": yesterday.toISOString(),
                "end": (new Date()).toISOString()
            }
        })
        .then(response => {
            console.log(response);

            let updatedRows = [];
            let responseData = response.data;
            let updatedPopularStocks = [];

            for (let key in responseData)
            {
                let arr = responseData[key];
                let name = this.symbolToName[key];
                let marketPrice = arr[arr.length-1].c;
                let change = arr[arr.length-1].c - arr[arr.length-2].c;
                let percentageChange = ((100*change)/arr[arr.length-2].c);
                let logo = logoList[name]? logoList[name] : "https://i.pinimg.com/originals/b8/d4/a3/b8d4a3574c7b2a137f66bedbb8759cb6.png";
                let symbol = key;
                updatedRows.push({
                    name: name,
                    marketPrice: marketPrice,
                    change: change,
                    percentageChange: percentageChange,
                    logo: logo,
                    symbol: symbol
                })

                if (key=="MSFT" || key=="AMZN" || key=="GOOGL" || key=="FB" || key=="AAPL")
                    updatedPopularStocks.push({
                        name: name,
                        marketPrice: marketPrice,
                        change: change,
                        percentageChange: percentageChange,
                        logo: logo,
                        symbol: symbol
                    })
            }

            this.companies = updatedRows;
            this.setState({popularStocks: updatedPopularStocks});
            console.log(this.companies);
        })
        .catch(error => {
            console.log(error);
        })
    }

    signInToggleHandler = (user) => {
        console.log("SignIn Toggled");
        console.log(user);
        this.setState(prevState => {
            return({signedIn: !!user, user: user, showModal: false, homeClicked: true, watchlistClicked: false});
        });

        if (this.state.user)
        {
            this.getRequest();
        }
        else
        {
            this.setState({watchlistStocks: this.startingData, watchlistClicked: false, homeClicked: true, showModal: false});
        }
    }

    modalClosedHandler = () => {
        this.setState({watchlistClicked: false, showModal: false, homeClicked: true});
    }

    homeClickedHandler = () => {
        this.setState({homeClicked: true, watchlistClicked: false, showModal: false})
    }
    
    watchlistClickedHandler = () => {
        if (this.state.user)
            this.setState({homeClicked: false, watchlistClicked: true, showModal: false})
        else
            this.setState({homeClicked: false, watchlistClicked: true, showModal: true});
    }

    getRequest = () => {
        console.log("In Fetch From Database");
        axios.get(config.FIREBASE_END_POINT+"/users.json")
        .then(response => {
            console.log("Response from Database");
            // console.log(response);
            
            let arr = response.data;
            let watchlist = "";
            let uid = "";
            for (let key in arr)
            {
                // console.log(key);
                // console.log(arr[key]["email"]);
                if (arr[key]["email"]==this.state.user.email)
                {
                    uid = key;
                    watchlist = arr[key]["watchlist"];
                }
            }

            if (this.state.watchlistStocks == this.startingData)
            {        
                if (watchlist.length!=0)
                {
                    // console.log(watchlist);
                    const watchlistArray = watchlist.split(',');
                    console.log(watchlistArray);

                    const watchlistStocks = [];

                    this.companies.forEach(company => {
                        if (watchlistArray.includes(company.symbol))
                            watchlistStocks.push(company);
                    })

                    this.setState({watchlistStocks: watchlistStocks});
                }
            }

            this.setState({uid: uid});
        })
        .catch(error => {
            console.log(error);
        })
    }

    postRequest = (obj) => {
        axios.post(config.FIREBASE_END_POINT+"/users.json", obj)
        .then(response => {
            console.log(response);

            this.getRequest();
        })
        .catch(error => {
            console.log(error);
        })   
    }

    deleteRequest = (watchlistStocks) => {
        const finalWatchlist = [];
        
        watchlistStocks.forEach(stock => {
            finalWatchlist.push(stock.symbol);
        });

        console.log(finalWatchlist);

        let obj = {
            email: this.state.user.email,
            watchlist: finalWatchlist.toString()
        }

        if (this.state.uid != "")
        {
            axios.delete(config.FIREBASE_END_POINT+"/users/"+ this.state.uid + ".json")
                .then(response => {
                    console.log(response);
                    
                    if (obj.watchlist!="")
                        this.postRequest(obj);
                })
                .catch(error => {
                    console.log(error);
                })
        }  
        else 
        {
            this.postRequest(obj);
        }   
    }

    addStockHandler = (addedStock) => {
        console.log(addedStock);
        console.log(this.state.uid);

        let newAddedStock = null;

        this.companies.forEach(company => {
            if (company.symbol==addedStock.symbol)
                newAddedStock = {...company};
        });

        if (this.state.uid != "")
        {
            let watchlistStocks = [...this.state.watchlistStocks, newAddedStock];
            console.log(watchlistStocks);

            this.setState({watchlistStocks: watchlistStocks, watchlistClicked: true});
            this.deleteRequest(watchlistStocks);
        }
        else
        {
            let watchlistStocks = [newAddedStock];
            console.log(watchlistStocks);

            this.setState({watchlistStocks: watchlistStocks, watchlistClicked: true});
            this.deleteRequest(watchlistStocks);
        }
    }

    removeStockHandler = (removedStock) => {

        let newWatchlistStocks = [];
        this.state.watchlistStocks.forEach(stock => {
            if (stock.symbol!=removedStock.symbol)
                newWatchlistStocks.push(stock);
        });

        this.setState({watchlistStocks: newWatchlistStocks, watchlistClicked: true});

        this.deleteRequest(newWatchlistStocks);
    }

    render(){
        let watchlistElement = null;
        let heading = "Popular Stocks";
        let rows = this.state.popularStocks;

        if (this.state.watchlistClicked)
        {
            heading = "Watchlist";
            rows = this.state.watchlistStocks;

            if (this.state.user)
            {
                console.log(this.state.watchlistStocks);
                let newCompanies = [];

                this.companies.forEach(company => {
                    let found = false;
                    
                    this.state.watchlistStocks.forEach(stock => {
                        if (company.symbol==stock.symbol)
                            found = true;
                    })

                    if (!found)
                        newCompanies.push(company);
                });

                console.log(newCompanies);
                // watchlistElement = (<Autocomplete 
                //                         companies = {newCompanies} 
                //                         clicked = {this.addStockHandler} />);

                watchlistElement = <Searchbar heading = {heading} watchlistStocks = {this.state.watchlistStocks} rows = {newCompanies} clicked = {this.removeStockHandler} addClicked = {this.addStockHandler} />
            }
            else
            {
                watchlistElement = (<Modal show = {this.state.showModal} modalClosed = {this.modalClosedHandler}>
                                        <div className={classes.FirstHalf}>Keep Track Of Your Stocks</div>
                                        <div className={classes.SecondHalf}>
                                            <img className={classes.ModalLogo} src="https://img.pngio.com/business-concept-evaluate-idea-implementation-innovation-icon-purple-innovation-png-512_512.png" alt="Logo Image" />
                                            <div>
                                                STOCK PRICE TRACKER
                                            </div>
                                            <StyledFirebaseAuth
                                                uiConfig={this.uiConfig}
                                                firebaseAuth={firebase.auth()}
                                            />
                                        </div>
                                    </Modal>);
            }
        }

        return(
            <div>
                {!this.state.showModal? 
                    <Navbar 
                        signInToggled = {this.signInToggleHandler} 
                        homeClicked = {this.homeClickedHandler} 
                        watchlistClicked = {this.watchlistClickedHandler} 
                    />: null
                }
                
                {watchlistElement}
                {/* <Table heading = {heading} rows = {rows} clicked = {this.removeStockHandler} /> */}
                {
                    heading=="Popular Stocks"?
                        <ListItems heading = {heading} rows = {rows} />
                        :
                        null
                }
            </div>
        )
    }
}

export default Layout;