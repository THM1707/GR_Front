import React from 'react';
import Typography from '@material-ui/core/Typography';
import PicturesWall from "./PicturesWall";

function UploadPictureForm(pros) {
    const {fileList, handleChange, error} = pros;
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Upload Picture
            </Typography>
            <PicturesWall fileList={fileList} handleChange={handleChange}/>
            <Typography color="error">
                {error.image.status && error.image.message}
            </Typography>
        </React.Fragment>
    );
}

export default UploadPictureForm;