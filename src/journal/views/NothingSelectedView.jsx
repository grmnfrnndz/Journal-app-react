import React from 'react';
import {Grid, Typography} from "@mui/material";
import {StarOutlined, StartOutlined} from "@mui/icons-material";

export const NothingSelectedView = () => {
    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{minHeight: `calc(100vh - 120px)`, backgroundColor: 'primary.main', borderRadius: 2 }}
        >
            <Grid
                item
                xs={12}
                sx={{flexGrowl: 2}}
            >
                <StarOutlined
                sx={{
                    fontSize: 100,
                    color: 'white'
                }}
                />
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Typography color='white' variant='h5'>
                    Select or Create Note
                </Typography>
            </Grid>
        </Grid>
    );
}