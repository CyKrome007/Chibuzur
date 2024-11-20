import {Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {CameraAlt as CameraAltIcon} from "@mui/icons-material";
import {VisuallyHiddenInput} from "../components/styles/StyledComponents.js";
import {useFileHandler, useInputValidation} from "6pp";
import {usernameValidator} from "../utils/validators.js";
import {bgGradient} from "../constants/color.js";
import axios from "axios";
import {server} from "../constants/config.js";
import {useDispatch} from "react-redux";
import {userExists} from "../redux/reducers/auth.js";
import toast from "react-hot-toast";

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    const toggleLogin = () => setIsLogin(prev => !prev);

    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("", usernameValidator);
    const password = useInputValidation('');

    const avatar = useFileHandler('single', 5);

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        const toastId = toast.loading('Logging in..');

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const { data } = await axios.post(
                `${server}/user/login`,
                {
                    username: username.value,
                    password: password.value,
                },
                config
            );
            dispatch(userExists(data?.user || true));
            toast.success(data?.message || 'Login Success', {id: toastId});
            // console.log(data.message || 'Login Success');
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Something Went Wrong', {id: toastId});
            setIsLoginLoading(false);
            // console.log(e?.response?.data?.message || 'Something Went Wrong');
        }

    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        setIsLoginLoading(true);
        const toastId = toast.loading('Creating Your Identity');

        const formData = new FormData();
        formData.append("avatar", avatar.file);
        formData.append("name", name.value);
        formData.append('bio', bio.value);
        formData.append("username", username.value);
        formData.append('password', password.value);

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        try{
            const { data } = await axios.post(
                `${server}/user/register`,
                formData,
                config
            );
            dispatch(userExists(data?.user || true));
            toast.success(data?.message || 'Register Success', { id: toastId });
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Something Went Wrong', { id: toastId });
        }
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
                                        disabled={isLoginLoading}
                                    >
                                        Login
                                    </Button>

                                    <Typography textAlign='center' m={'1rem'}>OR</Typography>

                                    <Button
                                        fullWidth
                                        variant="text"
                                        onClick={toggleLogin}
                                        disabled={isLoginLoading}
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
                                        disabled={isLoginLoading}
                                    >
                                        Signup
                                    </Button>

                                    <Typography textAlign='center' m={'1rem'}>OR</Typography>

                                    <Button
                                        fullWidth
                                        variant="text"
                                        onClick={toggleLogin}
                                        disabled={isLoginLoading}
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
