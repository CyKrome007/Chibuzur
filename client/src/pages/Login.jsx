import {Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {CameraAlt as CameraAltIcon} from "@mui/icons-material";
import {VisuallyHiddenInput} from "../components/styles/StyledComponents.js";
import {useFileHandler, useInputValidation} from "6pp";
import {usernameValidator} from "../utils/validators.js";
import {bgGradient} from "../constants/color.js";

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);

    const toggleLogin = () => setIsLogin(prev => !prev);

    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("", usernameValidator);
    const password = useInputValidation();

    const avatar = useFileHandler('single', 5);

    const handleLogin = (e) => {
        e.preventDefault();
    }

    const handleSignUp = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div
                style={{
                    backgroundImage: bgGradient,
                }}
            >
                <Container component={"main"} maxWidth="xs" sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {isLogin ? (
                            <>
                                <Typography variant="h5">Login</Typography>
                                <form style={{
                                    width: '100%',
                                    marginTop: '1rem',
                                }}
                                      onSubmit={handleLogin}
                                >
                                    <TextField
                                        required
                                        label="Username"
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        value={username.value}
                                        onChange={username.changeHandler}
                                    />
                                    {
                                        username.error && (
                                            <Typography variant='caption' color={'error'} >
                                                {username.error}
                                            </Typography>
                                        )
                                    }

                                    <TextField
                                        required
                                        label="Password"
                                        type={"password"}
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        value={password.value}
                                        onChange={password.changeHandler}
                                    />
                                    <Button
                                        sx={{
                                            marginTop: '1rem'
                                        }}
                                        fullWidth
                                        variant="contained"
                                        color='primary'
                                        type={'submit'}
                                    >
                                        Login
                                    </Button>

                                    <Typography textAlign={'center'} m={'1rem'}>OR</Typography>

                                    <Button
                                        fullWidth
                                        variant="text"
                                        onClick={toggleLogin}
                                    >
                                        Signup Instead
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Typography variant="h5">Signup</Typography>
                                <form
                                    style={{
                                        width: '100%',
                                        marginTop: '1rem',
                                    }}
                                    onSubmit={handleSignUp}
                                >
                                    <Stack position='relative' width={'10rem'} margin={'auto'}>
                                        <Avatar
                                            sx={{
                                                width: '10rem',
                                                height: '10rem',
                                                objectFit: 'contain',
                                            }}
                                            src={avatar.preview}
                                        />

                                        <IconButton
                                            sx={{
                                                position: 'absolute',
                                                bottom: '0',
                                                right: '0',
                                                color: 'white',
                                                bgcolor: 'rgba(0, 0, 0, 0.6)',
                                                ":hover": {
                                                    bgcolor: 'rgba(0, 0, 0, 0.8)'
                                                }
                                            }}
                                            component={'label'}
                                        >
                                            <>
                                                <CameraAltIcon />
                                                <VisuallyHiddenInput type={'file'} onChange={avatar.changeHandler} />
                                            </>
                                        </IconButton>

                                    </Stack>

                                    {
                                        avatar.error && (
                                            <Typography
                                                color={'error'}
                                                variant='caption'
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: '14px',
                                                    margin: '1rem auto'
                                                }}
                                                width={'fit-content'}
                                                display={'block'}
                                            >
                                                {avatar.error}
                                            </Typography>
                                        )
                                    }
                                    <TextField
                                        required
                                        label="Name"
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        value={name.value}
                                        onChange={name.changeHandler}
                                    />

                                    <TextField
                                        required
                                        label="Username"
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        value={username.value}
                                        onChange={username.changeHandler}
                                    />

                                    <TextField
                                        required
                                        label="Bio"
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        value={bio.value}
                                        onChange={bio.changeHandler}
                                    />

                                    <TextField
                                        required
                                        label="Password"
                                        type={"password"}
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        value={password.value}
                                        onChange={password.changeHandler}
                                    />

                                    <Button
                                        sx={{
                                            marginTop: '1rem'
                                        }}
                                        fullWidth
                                        variant="contained"
                                        color='primary'
                                        type={'submit'}
                                    >
                                        Signup
                                    </Button>

                                    <Typography textAlign={'center'} m={'1rem'}>OR</Typography>

                                    <Button
                                        fullWidth
                                        variant="text"
                                        onClick={toggleLogin}
                                    >
                                        Login Instead
                                    </Button>
                                </form>
                            </>
                        )}
                    </Paper>
                </Container>
            </div>
        </>
    )
}

export default Login;
