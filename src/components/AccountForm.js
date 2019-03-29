import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

function AccountForm(props) {
    const {values, error, handleChange} = props;

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Account Details
            </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        error={error.username.status}
                        helperText={error.username.status ? error.username.message : ''}
                        name="username"
                        placeholder="Between 3 to 15 characters"
                        required
                        label="Username"
                        margin="normal"
                        variant="outlined"
                        defaultValue={values.username}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        error={error.email.status}
                        helperText={error.email.status ? error.email.message : ''}
                        name="email"
                        required
                        label="Email"
                        type="email"
                        autoComplete="email"
                        variant="outlined"
                        defaultValue={values.email}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        error={error.password.status}
                        helperText={error.password.status ? error.password.message : ''}
                        name="password"
                        placeholder="At least 6 characters"
                        required
                        type="password"
                        label="Password"
                        variant="outlined"
                        defaultValue={values.password}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default AccountForm;