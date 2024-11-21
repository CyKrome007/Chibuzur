import { bgGradient } from "../../constants/color.js";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAdminLoginMutation } from "../../redux/api/api.js";
import { useAsyncMutation } from "../../hooks/hook.jsx";
import { adminExists } from "../../redux/reducers/auth.js";

const AdminLogin = () => {

    const dispatch = useDispatch();

    const secretKey = useInputValidation('');

    const { isAdmin } = useSelector((state) => state['auth']);

    const [adminLogin, isAdminLoginLoading, data] = useAsyncMutation(useAdminLoginMutation);

    useEffect(() => {
        if(data?.success)
            dispatch(adminExists(true));
    }, [data, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        adminLogin('Verifying Your Secret...', { secretKey: secretKey.value });
    };

    if(isAdmin) return <Navigate to="/admin/dashboard" />;

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
                        <Typography variant="h5">Admin Login</Typography>
                        <form style={{
                            width: '100%',
                            marginTop: '1rem',
                        }}
                              onSubmit={submitHandler}
                        >
                            <TextField
                                required
                                label="Secret Key"
                                type={"password"}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={secretKey.value}
                                onChange={secretKey.changeHandler}
                            />
                            <Button
                                sx={{
                                    marginTop: '1rem'
                                }}
                                fullWidth
                                variant="contained"
                                color='primary'
                                type={'submit'}
                                disabled={isAdminLoginLoading}
                            >
                                Login
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </div>
        </>
    )
}

export default AdminLogin;
