import React, {Component} from 'react';
import './App.css';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Error from './components/Error'
import ButtonAppBar from './components/ButtonAppBar';
import DashBoard from './components/DashBoard';
import AppContext from './context/AppContext';

function Home() {
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

class App extends Component {
    handleLogout = () => {
        this.setState({isAuthenticated: false});
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('token');
    };

    state = {
        isAuthenticated: false,
        handleLogout: this.handleLogout,
    };

    handleAuthenticated = () => {
        this.setState({isAuthenticated: true});
        localStorage.setItem('isAuthenticated', 'true');
    };

    render() {return (
            <BrowserRouter>
                <AppContext.Provider value={this.state}>
                    <React.Fragment>
                        {this.state.isAuthenticated || <ButtonAppBar/>}
                        <Switch>
                            <Route path='/' exact
                                   render={() => <Redirect
                                       to={this.state.isAuthenticated ? '/dashBoard' : 'home'}/>}/>
                            <Route path='/home' component={Home}/>
                            <Route path='/signUp' component={SignUp}/>
                            <Route path='/admin/login'
                                   render={() => <Login handleAuthenticated={this.handleAuthenticated}/>}/>
                            <Route path='/dashBoard'
                                   render={this.state.isAuthenticated ? () => <DashBoard/> : () => <Redirect
                                       to='/admin/login'/>}/>
                            < Route component={Error}/>
                        </Switch>
                    </React.Fragment>
                </AppContext.Provider>
            </BrowserRouter>
        );
    }

    componentWillMount() {
        const authenticate = localStorage.getItem('isAuthenticated');
        let value = true;
        if (authenticate === null || authenticate === 'false') {
            value = false;
        }
        this.setState({isAuthenticated: value});
    }
}

export default App;
