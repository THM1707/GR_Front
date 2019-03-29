import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom'

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class ButtonAppBar extends Component {
    goToLogin = () => {
        this.props.history.push('/admin/login');
    };

    goToSignUp = () => {
        this.props.history.push('/signUp');
    };


    goToHome = () => {
        this.props.history.push('/');
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            App Name
                        </Typography>
                        <Button
                            onClick={this.goToHome}>
                            Home
                        </Button>
                        <Button
                            onClick={this.goToLogin}>
                            Login
                        </Button>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={this.goToSignUp}>
                            Sign Up
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ButtonAppBar));
