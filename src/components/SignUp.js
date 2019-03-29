import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountForm from './AccountForm';
import ParkingLotForm from './ParkingLotForm';
import UploadPictureForm from './UploadPictureForm';
import axios from 'axios';
import validator from 'validator';

const styles = theme => ({
    typography: {
        textAlign: 'center',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },
    stepper: {
        padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
    },
});

const steps = ['Account', 'Parking Lot', 'Picture'];

function getStepContent(step, values, error, handleChange, fileList, handlePictureChange) {
    switch (step) {
        case 0:
            return <AccountForm
                error={error}
                values={values}
                handleChange={handleChange}/>;
        case 1:
            return <ParkingLotForm
                error={error}
                values={values}
                handleChange={handleChange}/>;
        case 2:
            return <UploadPictureForm
                error={error}
                fileList={fileList}
                handleChange={handlePictureChange}/>;
        default:
            throw new Error('Unknown step');
    }
}

class SignUp extends React.Component {
    state = {
        fileList: [],
        activeStep: 0,
        username: '',
        email: '',
        password: '',
        name: '',
        address: '',
        longitude: '21.022736',
        latitude: '105.8019441',
        capacity: '1',
        openTime: '',
        closeTime: '',
        error: {
            username: {status: false, message: 'Username must be between 3 to 15 characters'},
            email: {status: false, message: 'Email must not be blank'},
            password: {status: false, message: 'Password must be at least 6 characters'},
            name: {status: false, message: 'Name must not be blank'},
            address: {status: false, message: 'Address must not be blank'},
            longitude: {status: false, message: 'Longitude must not be blank'},
            latitude: {status: false, message: 'Latitude must not be blank'},
            openTime: {status: false, message: 'Open time must not be blank'},
            closeTime: {status: false, message: 'Close time must not be blank'},
            capacity: {status: false, message: 'Capacity must be greater than 0'},
            image: {status: false, message: 'You need to upload your image'},
        },
    };

    handleNext = (e) => {
        if (this.state.activeStep === steps.length - 1) {
            console.log(this.state);
            e.preventDefault();
            const {username, email, password, name, address, longitude, latitude, capacity, openTime, closeTime, fileList} = this.state;
            let image = '';
            if (fileList.length !== 0) {
                image = fileList[0].thumbUrl;
            }
            const data = {username, email, password, name, address, longitude, latitude, capacity, openTime, closeTime, image};
            let {error} = this.state;
            error.username.status = validator.isEmpty(username);
            error.email.status = !validator.isEmail(email);
            error.password.status = password.length <= 6;
            error.name.status = validator.isEmpty(name);
            error.address.status = validator.isEmpty(address);
            error.longitude.status = !validator.isFloat(longitude);
            error.latitude.status = !validator.isFloat(latitude);
            error.capacity.status = !validator.isInt(capacity, {min: 0});
            error.openTime.status = validator.isEmpty(openTime);
            error.closeTime.status = validator.isEmpty(closeTime);
            error.image.status = fileList.length === 0;
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/auth/manager/sign_up',
                data: data
            })
                .then(() => {
                    this.setState(state => ({
                        activeStep: state.activeStep + 1,
                    }));
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.data.message === "Validation error") {
                            alert("Some field is not meet the requirement");
                        } else {
                            alert(error.response.data.message);
                        }
                    } else {
                        alert("No connection");
                    }
                });
        } else {
            this.setState(state => ({
                activeStep: state.activeStep + 1,
            }));
        }

    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handlePictureChange = ({fileList}) => {
        this.setState({fileList});
    };


    render() {
        const {classes} = this.props;
        const {activeStep} = this.state;
        const {fileList, username, email, password, name, address, longitude, latitude, capacity, openTime, closeTime} = this.state;
        const values = {username, email, password, name, address, longitude, latitude, capacity, openTime, closeTime};
        const {error} = this.state;
        return (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" className={classes.typography}>
                            Sign Up
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Thank you for your sign up.
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        We will send you an email in the near future.
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep, values, error, this.handleChange, fileList, this.handlePictureChange)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={this.handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);