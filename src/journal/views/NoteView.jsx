import React from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {SaveOutlined} from "@mui/icons-material";
import {ImageGallery} from "../components/index.js";

export const NoteView = () => {
    return (
        <Grid
            container
            direction='row'
            justifyContent='space-between'
            sx={{mb: 1}}
        >
            <Grid item>
                <Typography fontSize={39}
                    fontWeight='light'
                >
                    28 de Agosto, 2023
                </Typography>
            </Grid>

            <Grid
                item
            >
                <Button>
                    <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                    Save
                </Button>
            </Grid>
            <Grid
                container
            >
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='put title'
                    label='title'
                    sx={{border: 'none', mb: 1}}

                />
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='put content'
                    label='content'
                    minRows={5}
                />

            </Grid>

        {/*    gallery images*/}
        <ImageGallery/>

        </Grid>
    );
}