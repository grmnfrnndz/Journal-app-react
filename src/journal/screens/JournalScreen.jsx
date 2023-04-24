import React from 'react';
import {IconButton, Typography} from "@mui/material";
import {JournalLayout} from "../layout/JournalLayout.jsx";
import {NoteView, NothingSelectedView} from "../views/index.js";
import {AddOutlined} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {startNewNote} from "../../store/journal/index.js";

export const JournalScreen = () => {

    const {isSaving, activeNote} = useSelector(state => state.journal);

    const dispatch = useDispatch();

    const onClickNewNote = () => {
        dispatch(startNewNote());
    }

    return (
        <JournalLayout>
            {/*<Typography>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</Typography>*/}

            {/*noteView*/}
            {/*nothing selected*/}

            {
                (!!activeNote)
                ? <NoteView/>
                : <NothingSelectedView/>
            }

            <IconButton
                onClick={onClickNewNote}
                disabled={isSaving}
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': {backgroundColor: 'error.main', opacity: 0.8},
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{fontSize: 30}}/>
            </IconButton>


        </JournalLayout>
    );
}