import React from 'react';
import {Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography} from "@mui/material";
import {TurnedInNot} from "@mui/icons-material";
import {useSelector} from "react-redux";

export const SideBar = ({drawerWidth=240}) => {

    const {displayName = 'Sin Definir'} = useSelector(state => state.auth);

    return (
        <Box
            component='div'
            sx={{width: { sm: drawerWidth }, flexShrink: {sm: 0} }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{
                    display: {xs: 'block'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width:drawerWidth }
                }}
            >

                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider/>

                <List>

                    {
                        ['Enero', 'Febrero', 'Marzo', 'Abril'].map(text => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot/>
                                    </ListItemIcon>
                                    <Grid
                                        container
                                    >
                                        <ListItemText primary={text}/>
                                        <ListItemText secondary={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'}/>

                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }


                </List>

            </Drawer>
        </Box>
    );
}