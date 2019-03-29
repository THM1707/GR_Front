import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function ParkingLotForm(props) {
    const {values, error, handleChange} = props;
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Parking Lot Details
            </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        error={error.name.status}
                        helperText={error.name.status ? error.name.message : ''}
                        name="name"
                        defaultValue={values.name}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="Name to display on map"
                        required
                        label="Name"
                        fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={error.address.status}
                        helperText={error.address.status ? error.address.message : ''}
                        name="address"
                        defaultValue={values.address}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        label="Address"
                        fullWidth/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        error={error.latitude.status}
                        helperText={error.latitude.status ? error.latitude.message : ''}
                        name="latitude"
                        type="number"
                        inputProps={{
                            step: 0.00001,
                        }}
                        defaultValue={values.latitude}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        label="Latitude"
                        fullWidth/>
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        error={error.longitude.status}
                        helperText={error.longitude.status ? error.longitude.message : ''}
                        name="longitude"
                        type="number"
                        inputProps={{
                            step: 0.00001,
                        }}
                        defaultValue={values.longitude}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        label="Longitude"
                        fullWidth/>
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        error={error.capacity.status}
                        helperText={error.capacity.status ? error.capacity.message : ''}
                        name="capacity"
                        defaultValue={values.capacity}
                        onChange={handleChange}
                        variant="outlined"
                        type="number"
                        required
                        label="Capacity"
                        inputProps={{
                            min:1,
                        }}
                        fullWidth/>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        error={error.openTime.status}
                        helperText={error.openTime.status ? error.openTime.message : ''}
                        name="openTime"
                        defaultValue={values.openTime}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        type="time"
                        required
                        label="Open Time"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}/>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        error={error.closeTime.status}
                        helperText={error.closeTime.status ? error.closeTime.message : ''}
                        name="closeTime"
                        fullWidth
                        variant="outlined"
                        type="time"
                        required
                        label="Close Time"
                        defaultValue={values.closeTime}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}/>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ParkingLotForm;