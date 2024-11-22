import {
    AppBar, Avatar, Backdrop, Badge, Box, IconButton, Menu, MenuItem,
    Toolbar, Tooltip, Typography
} from "@mui/material";

import {
    Add as AddIcon,
    Group as GroupIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
    Person as PersonIcon,
} from "@mui/icons-material";

import { orange } from "../../constants/color.js";

import { useNavigate } from "react-router-dom";
import {lazy, Suspense, useState} from "react";
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
    const { user } = useSelector((state) => state['auth']);
    const { notificationCount } = useSelector((state) => state.chat);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMobile = (e) => {
        e.preventDefault();
        dispatch(setIsMobile(true));
    }

    const openSearch = (e) => {
        e.preventDefault();
        handleCloseUserMenu();
        dispatch(setIsSearch(true));
    }

    const openNewGroup = (e) => {
        e.preventDefault();
        handleCloseUserMenu();
        dispatch(setIsNewGroup(true));
    }

    const openNotification = (e) => {
        e.preventDefault();
        handleCloseUserMenu();
        dispatch(setIsNotification(true));
        dispatch(resetNotificationsCount())
    }

    const navigateToGroups = () => {
        handleCloseUserMenu();
        navigate("/groups");
    }

    const openProfile = (e) => {
        e.preventDefault();
        handleCloseUserMenu();
        navigate('/profile');
    }

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

    // const menuItems = {
    //     {
    //         onClick: openSearch,
    //         title: 'Search',
    //         icon: (<SeachIcon />),
    //         text: 'Search Users',
    //     },
    //     {
    //         onClick: openSearch,
    //             title: 'Search',
    //         icon: <SeachIcon />,
    //         text: 'Search Users'
    //     },
    // };

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
                        <Box sx={{
                            display: {
                                xs: 'none',
                                md: 'block'
                            }
                        }}>
                            <IconBtn title={'Search'} icon={<SearchIcon />} onClick={openSearch} />
                            <IconBtn title={'New Group'} icon={<AddIcon />} onClick={openNewGroup} />
                            <IconBtn title={'Manage Groups'} icon={<GroupIcon />} onClick={navigateToGroups} />
                            <IconBtn title={'Notifications'} icon={<NotificationsIcon />} value={notificationCount} onClick={openNotification} />
                            <IconBtn title={'Logout'} icon={<LogoutIcon />} onClick={handleLogout} />
                        </Box>
                        <Box sx={{
                            display: {
                                xs: 'block',
                                md: 'none'
                            }
                        }}>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={user?.name} src={user?.avatar.url} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {/*settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                        </MenuItem>
                                    ))*/}
                                    <MenuItem onClick={openSearch}>
                                        <IconBtn title={'Search'} icon={<SearchIcon />} />
                                        <Typography variant='body1' sx={{ paddingRight: '1rem'}}>Search Users</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={openNewGroup}>
                                        <IconBtn title={'New Group'} icon={<AddIcon />} />
                                        <Typography variant='body1' sx={{ paddingRight: '1rem'}}>New Group</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={navigateToGroups}>
                                        <IconBtn title={'Manage Groups'} icon={<GroupIcon />} />
                                        <Typography variant='body1' sx={{ paddingRight: '1rem'}}>Manage Groups</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={openNotification}>
                                        <IconBtn title={'Notifications'} icon={<NotificationsIcon />} value={notificationCount} />
                                        <Typography variant='body1' sx={{ paddingRight: '1rem'}}>Notifications</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={openProfile}>
                                        <IconBtn title={'Profile'} icon={<PersonIcon />} />
                                        <Typography variant='body1' sx={{ paddingRight: '1rem'}}>Profile</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <IconBtn title={'Logout'} icon={<LogoutIcon />} />
                                        <Typography variant='body1' sx={{ paddingRight: '1rem'}}>Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Box>
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
