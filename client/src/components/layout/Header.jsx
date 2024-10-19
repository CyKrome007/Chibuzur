import {
    AppBar, Backdrop,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";

import {
    Add as AddIcon,
    Group as GroupIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
} from "@mui/icons-material";

import {orange} from "../../constants/color.js";

import {useNavigate} from "react-router-dom";
import {lazy, Suspense, useState} from "react";
const SearchDialogue = lazy(() => import("../specific/Search.jsx"));
const NotificationsDialogue = lazy(() => import("../specific/Notifications.jsx"));
const NewGroupDialogue = lazy(() => import("../specific/NewGroup.jsx"));


const Header = () => {

    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isNewGroup, setIsNewGroup] = useState(false);
    const [isNotification, setIsNotification] = useState(false);

    const handleMobile = (e) => {
        e.preventDefault();
        setIsMobile((prev) => !prev);
    }

    const openSearch = (e) => {
        e.preventDefault();
        setIsSearch((prev) => !prev);
    }

    const openNewGroup = (e) => {
        e.preventDefault();
        setIsNewGroup((prev) => !prev);
    }

    const openNotification = (e) => {
        e.preventDefault();
        setIsNotification((prev) => !prev);
    }

    const navigateToGroups = () => navigate("/groups");

    const handleLogout = () => {
        console.log('logout');
    }

    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                }}
                height="4rem"
            >
                <AppBar
                    position="static"
                    sx={{
                        bgcolor: orange
                    }}
                >
                    <Toolbar>
                        <Box
                            sx={{
                                display: {
                                    xs: 'block',
                                    sm: 'none'
                                },
                                paddingRight: '1rem'
                            }}
                        >
                            <IconButton color='inherit' onClick={handleMobile}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Typography
                            variant='h6'
                            display={'block'}
                        >
                            Chibuzur
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                            }}
                        />
                        <IconBtn title={'Search'} icon={<SearchIcon />} onClick={openSearch} />
                        <IconBtn title={'New Group'} icon={<AddIcon />} onClick={openNewGroup} />
                        <IconBtn title={'Manage Groups'} icon={<GroupIcon />} onClick={navigateToGroups} />
                        <IconBtn title={'Notifications'} icon={<NotificationsIcon />} onClick={openNotification} />
                        <IconBtn title={'Logout'} icon={<LogoutIcon />} onClick={handleLogout} />
                    </Toolbar>
                </AppBar>
            </Box>

            {
                isSearch && (
                    <Suspense fallback={<Backdrop open />} ><SearchDialogue /></Suspense>
                )
            }

            {
                isNotification && (
                    <Suspense fallback={<Backdrop open />}><NotificationsDialogue /></Suspense>
                )
            }

            {
                isNewGroup && (
                    <Suspense fallback={<Backdrop open />}><NewGroupDialogue /></Suspense>
                )
            }

        </>
    )
}

// eslint-disable-next-line react/prop-types
const IconBtn = ({title, icon, onClick}) => {
    return(
        <>
            <Tooltip title={title}>
                <IconButton color='inherit' size='large' onClick={onClick}>
                    {icon}
                </IconButton>
            </Tooltip>
        </>
    )
}

export default Header;
