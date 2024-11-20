import {
    AppBar, Backdrop, Badge, Box, IconButton,
    Toolbar, Tooltip, Typography
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

import { useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import axios from "axios";
import { server } from "../../constants/config.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth.js";
import { setIsMobile, setIsSearch, setIsNotification, setIsNewGroup } from "../../redux/reducers/misc.js";
import { resetNotificationsCount } from "../../redux/reducers/chat.js";

const SearchDialogue = lazy(() => import("../specific/Search.jsx"));
const NotificationsDialogue = lazy(() => import("../specific/Notifications.jsx"));
const NewGroupDialogue = lazy(() => import("../specific/NewGroup.jsx"));


const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isSearch, isNotification, isNewGroup } = useSelector((state) => state['misc']);
    const { notificationCount } = useSelector((state) => state.chat);

    const handleMobile = (e) => {
        e.preventDefault();
        dispatch(setIsMobile(true));
    }

    const openSearch = (e) => {
        e.preventDefault();
        dispatch(setIsSearch(true));
    }

    const openNewGroup = (e) => {
        e.preventDefault();
        dispatch(setIsNewGroup(true));
    }

    const openNotification = (e) => {
        e.preventDefault();
        dispatch(setIsNotification(true));
        dispatch(resetNotificationsCount())
    }

    const navigateToGroups = () => navigate("/groups");

    const handleLogout = async () => {
        try{
            const {data} = await axios.get(
                `${server}/user/logout`, {
                    withCredentials: true,
                }
            );
            toast.success(data?.message || 'Logout Success');
            dispatch(userNotExists());
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Something Went Wrong');
        }
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
                        <IconBtn title={'Notifications'} icon={<NotificationsIcon />} value={notificationCount} onClick={openNotification} />
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
const IconBtn = ({title, icon, onClick, value}) => {
    return(
        <>
            <Tooltip title={title}>
                <IconButton color='inherit' size='large' onClick={onClick}>
                    {
                        value ? (
                            <Badge badgeContent={value} color='error'>{icon}</Badge>
                        ) : (
                            icon
                        )
                    }
                </IconButton>
            </Tooltip>
        </>
    )
}

export default Header;
