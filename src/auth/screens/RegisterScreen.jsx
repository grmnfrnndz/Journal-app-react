import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";


import {AuthLayout} from "../layout/AuthLayout.jsx";
import {useForm} from "../../hooks/useForm.js";
import {startCreatingUserWithEmailPassword} from "../../store/auth/index.js";



const formData = {
        displayName: 'Lepmah',
        email: 'inginf.german.fernandez@gmail.com',
        password: '',
    };

const formValidations = {
    email: [(value) => value.includes('@'), 'El email debe tener un @.'],
    password: [(value) => value.length >=6, 'El password debe tener mas 6 letras.'],
    displayName: [(value) => value.length >=1, 'El nombre es obligatorio.'],
}

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const {formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations);

    const {status, errorMessage} = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo(() => status == 'checking' , [status]);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        if (!isFormValid) return;

        // console.log(formState);
        dispatch(startCreatingUserWithEmailPassword(formState));
    }

    return (
        <AuthLayout title="Create Account">
                <h1>FormValid {isFormValid ? 'Valid': 'Incorrect'}</h1>
                <form onSubmit={onSubmit}
                className='animate__animated animate__fadeIn animate__faster'
                >
                    <Grid container>
                        <Grid item xs={12} sx={{mt: 2}}>
                            <TextField
                                label="FirstName"
                                type="text"
                                placeholder="your name"
                                fullWidth
                                name='displayName'
                                value={displayName}
                                onChange={onInputChange}
                                error={!!displayNameValid && formSubmitted}
                                helperText={displayNameValid}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{mt: 2}}>
                            <TextField
                                label="Correo"
                                type="email"
                                placeholder="email@email.com"
                                fullWidth
                                name='email'
                                value={email}
                                onChange={onInputChange}
                                error={!!emailValid && formSubmitted}
                                helperText={emailValid}
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
                                error={!!passwordValid && formSubmitted}
                                helperText={passwordValid}
                            />
                        </Grid>

                        <Grid
                            container
                            spacing={2}
                            sx={{mb: 2, mt: 1}}
                        >

                            <Grid item xs={12}
                            display={!!errorMessage ? '': 'none'}
                            >
                                <Alert severity='error'>
                                    {errorMessage}
                                </Alert>
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth disabled={isCheckingAuthentication}>
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