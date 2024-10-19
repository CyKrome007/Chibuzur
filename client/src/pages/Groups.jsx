import {Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography} from "@mui/material";
import {bgGradient, matteBlack} from '../constants/color.js'
import {
    Delete as DeleteIcon,
    Add as AddIcon,
    Done as DoneIcon,
    Edit as EditIcon,
    KeyboardBackspace as KeyboardBackspaceIcon,
    Menu as MenuIcon
} from "@mui/icons-material";
import {useNavigate, useSearchParams} from "react-router-dom";
import {memo, useState, useEffect, lazy, Suspense} from "react";
import {Link} from "../components/styles/StyledComponents.js";
import {AvatarCard} from "../components/shared/AvatarCard.jsx";
import {sampleChats, sampleUsers} from "../constants/sampleData.js";
import UserItem from "../components/shared/UserItem.jsx";

const ConfirmDeleteDialogue = lazy(() => import("../components/dialogs/ConfirmDeleteDialogue.jsx"));
const AddMemberDialogue = lazy(() => import("../components/dialogs/AddMemberDialogue.jsx"));

const isAddMember = false;

const Groups = () => {

    const chatId = useSearchParams()[0].get('group');

    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [confirmDeleteDialogue, setConfirmDeleteDialogue] = useState(false);

    const [groupName, setGroupName] = useState('');
    const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState('');

    const navigateBack = () => {
        navigate('/');
    };

    const handleMobile = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    const handleMobileClose = () => {
        setIsMobileMenuOpen(false)
    };

    const updateGroupName = () => {
        setIsEdit(false);
    };

    const openConfirmDeleteHandler = () => {
        setConfirmDeleteDialogue(true);
    };

    const closeConfirmDeleteHandler = () => {
        setConfirmDeleteDialogue(false);
    }

    const openAddMemberHandler = () => {

    };

    const deleteHandler = () => {

    };

    const removeMemberHandler = () => {

    };

    useEffect(() => {
        if(chatId) {
            setGroupName(`Group Name ${chatId}`);
            setGroupNameUpdatedValue(`Group Name ${chatId}`);
        }

        return () => {
            setGroupName('');
            setGroupNameUpdatedValue('');
            setIsEdit(false);
        }
    }, [chatId]);

    const IconBtns = <>

        <Box
            sx={{
                display: {
                    xs: 'block',
                    sm: 'none',
                    position: 'fixed',
                    right: '1rem',
                    top: '1rem',
                },
            }}
        >
            <Tooltip title={'Menu'}>
                <IconButton
                    onClick={handleMobile}
                >
                    <MenuIcon />
                </IconButton>
            </Tooltip>
        </Box>

        <Tooltip title="Back">
            <IconButton
                sx={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    bgcolor: matteBlack,
                    color: 'white',
                    '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                    },
                }}
                onClick={navigateBack}
            >
                <KeyboardBackspaceIcon />
            </IconButton>
        </Tooltip>
    </>;

    const GroupName = <>
        <Stack
            direction='row'
            alignItems={'center'}
            justifyContent={'center'}
            spacing={'1rem'}
            padding={'3rem'}
        >
            {
                isEdit ? (
                    <>
                        <TextField value={groupNameUpdatedValue} onChange={(e) => {
                                console.log('e.target.value [Group.jsx 138]', e.target.value);
                                setGroupNameUpdatedValue(e.target.value);
                            }
                        }/>
                        <IconButton onClick={updateGroupName}>
                            <DoneIcon />
                        </IconButton>

                    </>
                ) : (
                    <>
                        <Typography variant='h4'>{groupName}</Typography>
                        <IconButton onClick={() => setIsEdit(true)}>
                            <EditIcon />
                        </IconButton>
                    </>
                )
            }
        </Stack>
    </>

    const ButtonGroup = <>
        <Stack
            direction={{
                xs: 'column',
                sm: 'row'
            }}
            spacing={'1rem'}
            p={{
                xs: '1rem 0 0 0',
                sm: '1rem',
                md: '1rem 4rem'
            }}
        >
            <Button variant='outlined' color='primary' startIcon={<AddIcon />} onClick={openAddMemberHandler}>Add Member</Button>
            <Button variant='contained' color='error' startIcon={<DeleteIcon />} onClick={openConfirmDeleteHandler}>Delete Group</Button>
        </Stack>
    </>

    return (
        <>
            <Grid container height={'100vh'}>
                <Grid
                    item
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'block',
                        },
                        backgroundImage: bgGradient,
                    }}
                    sm={4}
                    md={3}
                >
                    <GroupList myGroups={sampleChats} chatId={chatId} />
                </Grid>

                <Grid
                    item xs={12}
                    sm={8}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        padding: '1rem 3rem',

                    }}
                >
                    {IconBtns}
                    {
                        groupName && (
                            <>
                                {GroupName}
                                <Typography
                                    variant='body1'
                                    margin={'2rem'}
                                    alignSelf={'flex-start'}
                                >
                                    Members
                                </Typography>
                                <Stack
                                    maxWidth={'45rem'}
                                    width={'100%'}
                                    boxSizing='border-box'
                                    padding={{
                                        sm: '1rem',
                                        xs: '0',
                                        md: '1rem 4rem'
                                    }}
                                    spacing={'2rem'}
                                    height={'50vh'}
                                    overflow={'auto'}
                                >
                                    {
                                        sampleUsers.map((i) => (
                                            <UserItem
                                                user={i}
                                                key={i._id}
                                                isAdded
                                                styling={{
                                                    boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.2)',
                                                    padding: '1rem 2rem',
                                                    borderRadius: '.8rem'
                                                }}
                                                handler={removeMemberHandler}
                                            />
                                        ))
                                    }
                                </Stack>

                                {ButtonGroup}
                            </>
                        )
                    }
                </Grid>

                {
                    isAddMember && (
                        <Suspense fallback={<Backdrop open={true} />}>
                            <AddMemberDialogue />
                        </Suspense>
                    )
                }

                {
                    confirmDeleteDialogue && (
                        <Suspense fallback={<Backdrop open={true} /> }>
                            <ConfirmDeleteDialogue
                                open={confirmDeleteDialogue}
                                handleClose={closeConfirmDeleteHandler}
                                deleteHandler={deleteHandler}
                            />
                        </Suspense>
                    )
                }

                <Drawer
                    sx={{
                        display: {
                            xs: 'block',
                            sm: 'none'
                        },
                    }}
                    open={isMobileMenuOpen}
                    onClose={handleMobileClose}
                >
                    <GroupList w={'80vw'} myGroups={sampleChats} chatId={chatId} />
                </Drawer>

            </Grid>
        </>
    )
}

// eslint-disable-next-line react/prop-types
const GroupList = ({w = '100%', myGroups = [], chatId }) => {
    return(
        <>
            <Stack
                width={w}
                height={'100vh'}
                sx={{
                    backgroundImage: bgGradient,
                    overflowY: 'scroll'
                }}
            >
                <Typography variant='h4' fontWeight={'bold'}>Groups</Typography>
                {
                    myGroups.length > 0
                        ? myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />)
                        : <Typography
                            textAlign='center'
                            padding={'1rem'}
                        >
                            No Groups T_T
                        </Typography>
                }
            </Stack>
        </>
    )
};

// eslint-disable-next-line react/prop-types,react/display-name
const GroupListItem = memo(({group, chatId}) => {
    // eslint-disable-next-line react/prop-types
    const {name, avatar, _id} = group

    return(
        <>
            <Link to={`?group=${_id}`} onClick={e => {
                if(chatId === _id)  e.preventDefault();
            }}>
                <Stack direction='row' alignItems={'center'} spacing={'1rem'}>
                    <AvatarCard avatar={avatar} />
                    <Typography>{name}</Typography>
                </Stack>
            </Link>
        </>
    );
});

export default Groups;
