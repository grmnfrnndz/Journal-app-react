import React, {useEffect, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Button, Grid, IconButton, TextField, Typography} from "@mui/material";
import {DeleteOutline, SaveOutlined, UploadOutlined} from "@mui/icons-material";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import {useForm} from "../../hooks/useForm.js";
import {ImageGallery} from "../components/index.js";
import {setActiveNote, startDeletingNote, startSaveNote, startUploadImages} from "../../store/journal/index.js";



export const NoteView = () => {

    const dispatch = useDispatch();

    const {activeNote, messageSaving, isSaving} = useSelector(state => state.journal);

    const {title, body, date, onInputChange, formState, setFormState} = useForm(activeNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

    useEffect(() => {
            dispatch(setActiveNote(formState));
        },
        [formState]
    );

    useEffect(
        () => {
            if (messageSaving.length > 0) {
                Swal.fire('Note Update', messageSaving, 'success');
            }
        },
        [messageSaving]
    );

    const fileInputRef = useRef();

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({target}) => {
        if (target.files.length === 0) return;
        dispatch(startUploadImages(target.files));
    }

    const onDeleteNote = () => {
        dispatch(startDeletingNote());
    }

    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            direction='row'
            justifyContent='space-between'
            sx={{mb: 1}}
        >
            <Grid item>
                <Typography fontSize={39}
                    fontWeight='light'
                >
                    {dateString}
                </Typography>
            </Grid>

            <Grid
                item
            >

                <input
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                    style={{display: 'none'}}
                    ref={fileInputRef}
                />

                <IconButton
                    color='primary'
                    disabled={isSaving}
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined/>

                </IconButton>

                <Button
                    onClick={onSaveNote}
                    disabled={isSaving}
                >
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
                    name='title'
                    value={title}
                    onChange={onInputChange}

                />
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='put content'
                    label='content'
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />

            </Grid>

            <Grid container
            justifyContent='end'
            >
                <Button
                    onClick={onDeleteNote}
                    sx={{mt:2}}
                    color='error'
                >
                    <DeleteOutline/>
                    Delete
                </Button>
            </Grid>

        {/*    gallery images*/}
        <ImageGallery images={ activeNote.imageUrls }/>

        </Grid>
    );
}