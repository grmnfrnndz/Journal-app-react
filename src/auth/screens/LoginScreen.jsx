import React, {useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from 'react-router-dom';
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";

import {AuthLayout} from "../layout/AuthLayout.jsx";
import {checkingAuthentication, startEmailPasswordSignIn, startGoogleSignIn} from "../../store/auth/index.js";

import {useForm} from "../../hooks/useForm.js";


export const LoginScreen = () => {

    const {status, errorMessage} = useSelector(state => state.auth);

    const {email, password, onInputChange} = useForm({
        email: 'german@german.com',
        password: '123456789'
    });
    const dispatch = useDispatch();

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const onSubmit = (event) => {
        event.preventDefault();

        console.log('onSubmit');
        console.log({email, password});
        dispatch(startEmailPasswordSignIn({email, password}));
    }

    const onGoogleSignIn = () => {


        console.log('onGoogleSignIn');
        dispatch(startGoogleSignIn());
    }

    return (
        <AuthLayout title="Login">
                <form onSubmit={onSubmit}
                className='animate__animated animate__fadeIn animate__faster'
                >
                    <Grid container>
                        <Grid item xs={12} sx={{mt: 2}}>
                            <TextField
                                label="Correo"
                                type="email"
                                placeholder="email@email.com"
                                fullWidth
                                name='email'
                                value={email}
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{mt: 2}}>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                name='password'
                                value={password}
                                onChange={onInputChange}
                            />
                        </Grid>

                        <Grid
                            container
                            spacing={2}
                            sx={{mb: 2, mt: 1}}
                        >
                            <Grid  item xs={12}
                                display={!!errorMessage ? '': 'none'}
                            >
                                <Alert severity='error'>
                                    {errorMessage}
                                </Alert>
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <Button type="submit" variant="contained" fullWidth disabled={isAuthenticating} >
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button onClick={onGoogleSignIn} variant="contained" fullWidth disabled={isAuthenticating}>
                                    <Google/>
                                    <Typography sx={{ml: 1}}>
                                        Google
                                    </Typography>
                                </Button>
                            </Grid>

                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justifyContent='end'
                        >
                            <Link component={RouterLink} color='inherit' to="/auth/register">
                                Crear Otra Cuenta
                            </Link>

                        </Grid>


                    </Grid>
                </form>

        </AuthLayout>

    );
}