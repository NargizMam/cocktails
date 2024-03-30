import React, {useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { selectRegisterError, selectRegisterLoading } from './usersSlice.ts';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {googleLogin, register} from './usersThunks.ts';
import FileInput from "../../components/UI/FileInput/FileInput.tsx";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {Alert, Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {GoogleLogin} from "@react-oauth/google";
import Link from "@mui/material/Link";
import { LoadingButton } from '@mui/lab';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {RegisterMutation} from "../../types";



const Register = () => {
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const registering = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(registerError?.message);

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    displayName: '',
    avatar: ''
  });
  const fieldsError = !state.email || !state.password || !state.displayName || !state.avatar;
  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };
  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (fieldsError) {
      setErrorMessage('All fields must be filled in')
    }
      await dispatch(register(state)).unwrap();
      navigate('/');
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };
  const googleRegisterHandler = async (credential: string) => {
    try {
      await dispatch(googleLogin(credential)).unwrap();
      navigate('/');
    } catch (e) {
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'darkGrey'}}>
          <LockOpenIcon/>
        </Avatar>
        {errorMessage && (<Alert variant="filled" severity="error">{errorMessage}</Alert>)}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box>
          <GoogleLogin onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              void googleRegisterHandler(credentialResponse.credential);
            }
          }}
                       onError={() => {
                         console.log('Login failed!');
                       }}
          />
        </Box>
        <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                type="email"
                label="E-mail"
                name="email"
                value={state.email}
                onChange={inputChangeHandler}
                autoComplete="new-email"
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                value={state.password}
                onChange={inputChangeHandler}
                autoComplete="new-password"
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="displayName"
                type='text'
                label="Display name"
                value={state.displayName}
                onChange={inputChangeHandler}
                autoComplete="new-displayName"
                error={Boolean(getFieldError('displayName'))}
                helperText={getFieldError('displayName')}
              />
            </Grid>
            <Grid item xs>
              <FileInput
                label="Avatar"
                name="avatar"
                onChange={fileInputChangeHandler}
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={registering}
            disabled={fieldsError}
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Register;