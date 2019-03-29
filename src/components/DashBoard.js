import React, {Component} from 'react';
import AppContext from '../context/AppContext';
import Main from './Main';

class DashBoard extends Component {
    render() {
        return (
            <AppContext.Consumer>
                {({isAuthenticated, handleLogout}) => (
                    <Main handleLogout={handleLogout}/>
                )}
            </AppContext.Consumer>
        );
    }
}

export default DashBoard;