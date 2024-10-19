import {bgGradient} from "../../constants/color.js";
import {Button, Container, Paper, TextField, Typography} from "@mui/material";
import {useInputValidation} from "6pp";
import {Navigate} from "react-router-dom";

const AdminLogin = () => {
    
    const secretKey = useInputValidation('');

    const isAdmin = true;

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submit');
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