import React, {useMemo} from 'react';
import {useDispatch} from "react-redux";

import {Grid, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {TurnedInNot} from "@mui/icons-material";

import {setActiveNote} from "../../store/journal/index.js";

export const SideBarItem = ({date, title, body, id, imageUrls = []}) => {

    const dispatch = useDispatch();

    const newTitle = useMemo(()=> {
        return title.length > 10 ? title.substring(0, 5) + '...': title;
    }, [title])


    const onActiveNote = () => {
        dispatch(setActiveNote({date, title, body, id, imageUrls}));
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onActiveNote}>
                <ListItemIcon>
                    <TurnedInNot/>
                </ListItemIcon>
                <Grid
                    container
                >
                    <ListItemText primary={title}/>
                    <ListItemText secondary={body}/>
                </Grid>
            </ListItemButton>
        </ListItem>
    );
}