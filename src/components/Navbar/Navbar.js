import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import classes from './Navbar.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class Navbar extends Component {
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccess: () => false
        }
      }
  
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged (user => {
            this.props.signInToggled(user);
            console.log(user);
        })
    }

    render(){

        return(
            <div>
                <nav className={classes.Navbar}>
                    {/* <svg className = {classes.A1} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.8184 17.7797H17.93C17.93 17.7797 10.3977 0.981245 10.3977 0.689694L10.3716 0.743999V0.55249H8.00019C8.00019 0.844041 0.589844 17.6425 0.589844 17.6425H3.60275L5.18467 14.1268H13.1871L14.8184 17.7797ZM6.42117 11.2055L9.16414 4.63135L11.9564 11.2055H6.42117Z" fill="#AE42C9"/>
                    </svg>
                    <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.71491 15.0034V0.548767H0.527832V15.2892V17.6331H3.71491H11.7928V15.0034H3.71491Z" fill="#AE42C9"/>
                    </svg> */}


                    {/* <div className={classes.L1}>L</div>
                    <div className={classes.I1}>I</div>
                    <div className={classes.N1}>N</div>
                    <div className={classes.E1}>E</div>
                    <div className={classes.A2}>A</div>
                    <div className={classes.I2}>I</div>
                    <div className={classes.N2}>N</div>
                    <div className={classes.V1}>V</div>
                    <div className={classes.E2}>E</div>
                    <div className={classes.S1}>S</div>
                    <div className={classes.T1}>T</div> */}
                    <img className={classes.Logo} src="https://img.pngio.com/business-concept-evaluate-idea-implementation-innovation-icon-purple-innovation-png-512_512.png" alt="logo image" />
                    <div className={classes.Name}>STOCK PRICE TRACKER</div>
                    <div className={classes.Home} onClick = {() => this.props.homeClicked()} >Home</div>
                    <div className={classes.Watchlist} onClick = {() => this.props.watchlistClicked()} >Watchlist</div>
                    {firebase.auth().currentUser ?
                        <div style={{marginLeft: "auto", display: "flex", alignItems: "center"}}>
                            <img style={{width: "40px", height: "40px", borderRadius: "50%"}} src={firebase.auth().currentUser.photoURL} alt="Profile Picture"/>
                            <ExitToAppIcon style={{marginLeft: "20px"}} onClick={() => firebase.auth().signOut()} />
                        </div>
                            :
                        <div style={{marginLeft: "auto"}}>
                            <StyledFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                        </div>
                    }
                </nav>
            </div>
        )

        // return(
        //     <AppBar 
        //         className={classes.AppBar} 
        //         position="sticky"
        //     >
        //         {/* <Container maxWidth="md"> */}
        //             <Toolbar>
        //                 <img src="https://img.pngio.com/business-concept-evaluate-idea-implementation-innovation-icon-purple-innovation-png-512_512.png"/>
        //                 <div className = {classes.TabItem}>
        //                     STOCK PRICE TRACKER
        //                 </div>
        //                 <Tabs indicatorColor = "primary">
        //                     <Tab label="Home" className = {classes.TabItem} onClick = {() => this.props.homeClicked()} />
        //                     <Tab label="Watchlist" className = {classes.TabItem} onClick = {() => this.props.watchlistClicked()} />
        //                 </Tabs>

                        
        //                 {firebase.auth().currentUser ?
        //                     <div style={{marginLeft: "auto", display: "flex", alignItems: "center"}}>
        //                         <img style={{width: "40px", height: "40px", borderRadius: "50%"}} src={firebase.auth().currentUser.photoURL} alt="Profile Picture"/>
        //                         <ExitToAppIcon style={{marginLeft: "20px"}} onClick={() => firebase.auth().signOut()} />
        //                     </div>
        //                         :
        //                     <div style={{marginLeft: "auto"}}>
        //                         <StyledFirebaseAuth
        //                             uiConfig={this.uiConfig}
        //                             firebaseAuth={firebase.auth()}
        //                         />
        //                     </div>
        //                 }
                    
        //             </Toolbar>
        //         {/* </Container> */}
        //     </AppBar>
        // )
    }
}

export default Navbar;

