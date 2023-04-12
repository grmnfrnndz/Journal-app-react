import React from 'react';
import {AuthLayout} from "../layout/AuthLayout.jsx";
import {Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";

export const RegisterScreen = () => {
    return (
        <AuthLayout title="Create Account">
                <form>
                    <Grid container>
                        <Grid item xs={12} sx={{mt: 2}}>
                            <TextField
                                label="FirstName"
                                type="text"
                                placeholder="your name"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sx={{mt: 2}}>
                            <TextField
                                label="Correo"
                                type="email"
                                placeholder="email@email.com"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sx={{mt: 2}}>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                            />
                        </Grid>

                        <Grid
                            container
                            spacing={2}
                            sx={{mb: 2, mt: 1}}
                        >

                            <Grid item xs={12}>
                                <Button variant="contained" fullWidth>
                                    Create Account
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justifyContent='end'
                        >
                            <Typography sx={{mr: 1}}>Have a Account?</Typography>
                            <Link component={RouterLink} color='inherit' to="/auth/login">
                                Login
                            </Link>

                        </Grid>


                    </Grid>
                </form>

        </AuthLayout>
    );
}