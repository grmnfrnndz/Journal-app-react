import React from 'react';
import {Box, Toolbar} from "@mui/material";
import {NavBar, SideBar} from "../components/index.js";


const drawerWidth = 280;

export const JournalLayout = ({children}) => {
    return (
        <Box sx={{display: 'flex'}}>
            {/*Navbar drawerWidth*/}
            <NavBar drawerWidth={drawerWidth}/>

            {/*Sidebar drawerWidth*/}
            <SideBar drawerWidth={drawerWidth}/>

            <Box
                component='main'
                sx={{flexGrowl: 1, p: 3, width: '100%'}}
            >
                {/*toolbar*/}
                <Toolbar>
                </Toolbar>

                {children}
            </Box>
        </Box>
    );
}