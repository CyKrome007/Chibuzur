import { Container, Paper, Stack, Typography } from "@mui/material";
import { ArrowBack as ArrowBackIcon, Error as ErrorIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const _404 = () => {
    return (
        <>
            <Container maxWidth="lg" sx={{ height: '100vh' }}>
                <Paper sx={{
                    padding: '2rem',
                    margin: '2rem'
                }}>
                    <Stack
                        direction={{
                            xs: 'column',
                            sm: 'row'
                        }}
                        alignItems='center'
                    >
                        <ErrorIcon sx={{ fontSize: '10rem', color: 'red' }} />
                        <Stack
                            direction={{
                                xs: 'column',
                                sm: 'row'
                            }}
                            alignItems={{
                                xs: 'center',
                                sm: 'baseline'
                            }}
                        >
                            <Typography variant='h2'>Error 404</Typography>
                            <Typography variant='h4'>&nbsp;Page Not Found!</Typography>
                        </Stack>
                    </Stack>
                    <Link to={'/'}><Typography sx={{ display: 'flex', alignItems: 'center'}}><ArrowBackIcon />Go Back To Home</Typography></Link>
                </Paper>
            </Container>
        </>
    )
}
