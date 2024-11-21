import { Box, Drawer, Grid2, IconButton, Stack, styled, Typography } from "@mui/material";
import { gray, matteBlack } from "../../constants/color.js";
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    ExitToApp as ExitToAppIcon
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, Link as LinkComponent, Navigate, useNavigate } from "react-router-dom";
import { adminTabs } from "../../constants/route.jsx";
import { adminExists } from "../../redux/reducers/auth.js";
import { useAsyncMutation } from "../../hooks/hook.jsx";
import { useAdminLogoutMutation } from "../../redux/api/api.js";
import { useDispatch } from "react-redux";

const Link = styled(LinkComponent)`
    text-decoration: none;
    border-radius: 2rem;
    padding: 1rem 2rem;
    color: black;
    &:hover {
        color: rgba(0, 0, 0, 0.54);
    }
`;

const Sidebar = ({ w = '100%' }) => {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [adminLogout, isAdminLogoutLoading, data] = useAsyncMutation(useAdminLogoutMutation);

    useEffect(() => {
        if(data?.success) {
            dispatch(adminExists(false));
            navigate('/admin');
        }
    }, [data, navigate, dispatch]);

    const logoutHandler = () => {
        adminLogout('Logging out...');
    }

    return(
        <>
            <Stack
                width={w}
                direction='column'
                p={'3rem'}
                spacing={'3rem'}
            >
                <Typography variant='s3' textTransform='uppercase'>Admin</Typography>
                <Stack
                    spacing={'1rem'}
                >
                    {
                        adminTabs.map((tab) => (
                            <Link
                                key={tab.path}
                                to={tab.path}
                                sx={
                                    location.pathname === tab.path && {
                                        bgcolor: matteBlack,
                                        color: 'white',
                                        border: '2px solid black',
                                        ':hover': {
                                            bgcolor: 'white',
                                            color: 'black',
                                            border: '2px solid gray'
                                        },
                                    }
                                }
                            >
                                <Stack direction='row' alignItems={'center'} spacing={'1rem'}>
                                    {tab.icon}
                                    <Typography>{tab.name}</Typography>
                                </Stack>
                            </Link>
                        ))
                    }
                    <Link onClick={logoutHandler}>
                        <Stack direction='row' alignItems={'center'} spacing={'1rem'}>
                            <ExitToAppIcon />
                            <Typography>Logout</Typography>
                        </Stack>
                    </Link>
                </Stack>
            </Stack>
        </>
    );
}

const isAdmin = true;

const AdminLayout = ({ children }) => {

    const [isMobile, setIsMobile] = useState(false);

    const handleMobile = () => setIsMobile(prev => !prev);

    const handleClose = () => setIsMobile(false);

    if(!isAdmin) return <Navigate to={'/admin'} />;

    return (
        <>
            <Grid2 container minHeight={'100vh'}>

                <Box
                    sx={{
                        display: {
                            xs: 'block',
                            md: 'none'
                        },
                        position: 'fixed',
                        right: '1rem',
                        top: '1rem',
                    }}
                >
                    <IconButton onClick={handleMobile}>
                        {
                            isMobile ? <CloseIcon /> : <MenuIcon />
                        }
                    </IconButton>
                </Box>

                <Grid2 size={{ md: 4, lg: 3 }}

                    sx={{
                        display: {
                            xs: 'none',
                            md: 'block'
                        },
                    }}
                >
                    <Sidebar />
                </Grid2>

                <Grid2
                    size={{ xs: 12, md: 8, lg: 9 }}
                    sx={{
                        bgcolor: gray
                    }}
                >
                    {children}
                </Grid2>

                <Drawer open={isMobile} onClose={handleClose}>
                    <Sidebar w={'80vw'} />
                </Drawer>

            </Grid2>
        </>
    )
}

export default AdminLayout
