import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents.js";
import { useState } from "react";
import { useFileHandler, useInputValidation } from "6pp";
import { usernameValidator } from "../utils/validators.js";
import { useSelector } from "react-redux";
import { bgGradient } from "../constants/color.js";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../constants/config.js";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {

    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const { user } = useSelector((state) => state['auth']);
    const navigate = useNavigate();

    const name = useInputValidation(user.name);
    const bio = useInputValidation(user.bio);
    const username = useInputValidation(user.username, usernameValidator);
    const password = useInputValidation('');

    const avatar = useFileHandler('single', 5);

    const handleUpdate = async (e) => {
        e.preventDefault();

        setIsUpdateLoading(true);
        const toastId = toast.loading('Updating...');
        const formData = new FormData();
        if(avatar.preview)
            formData.append("avatar", avatar.file);
        formData.append("name", name.value);
        formData.append("bio", bio.value);
        formData.append("username", username.value);
        formData.append("password", password.value);

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            const result = await axios.post(`${server}/user/update`, formData, config);
            console.log(result)
            if (result.data.success) {
                toast.success(result.message, {id: toastId});
                navigate('/');
            } else {
                toast.error('Something Went Wrong!', {id: toastId})
            }
        } catch (e) {
            toast.error(e?.response?.data?.message, {id: toastId});
        }

        setIsUpdateLoading(false);
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
                        <Typography variant="h5">Update Profile</Typography>
                        <form
                            style={{
                                width: '100%',
                                marginTop: '1rem',
                            }}
                            onSubmit={handleUpdate}
                        >
                            <Stack position='relative' width={'10rem'} margin={'auto'}>
                                <Avatar
                                    sx={{
                                        width: '10rem',
                                        height: '10rem',
                                        objectFit: 'contain',
                                    }}
                                    src={avatar.preview || user.avatar.url}
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
                                label="Username"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={username.value}
                                onChange={username.changeHandler}
                            />

                            <TextField
                                label="Bio"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={bio.value}
                                onChange={bio.changeHandler}
                            />

                            <TextField
                                label="New Password"
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
                                disabled={isUpdateLoading}
                            >
                                Update
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </div>
        </>
    );
}

export default EditProfile;