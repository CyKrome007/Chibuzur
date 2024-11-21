import { Backdrop, Box, Button, CircularProgress, Drawer, Grid2,
    IconButton, Stack, TextField, Tooltip, Typography
} from "@mui/material";
import { bgGradient, matteBlack } from '../constants/color.js'
import {
    Delete as DeleteIcon,
    Add as AddIcon,
    Done as DoneIcon,
    Edit as EditIcon,
    KeyboardBackspace as KeyboardBackspaceIcon,
    Menu as MenuIcon
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { memo, useState, useEffect, lazy, Suspense } from "react";
import { Link } from "../components/styles/StyledComponents.js";
import { AvatarCard } from "../components/shared/AvatarCard.jsx";
import UserItem from "../components/shared/UserItem.jsx";
import {
    useChatDetailsQuery, useDeleteChatMutation,
    useMyGroupsQuery,
    useRemoveGroupMemberMutation,
    useRenameGroupMutation
} from "../redux/api/api.js";
import {useAsyncMutation, useErrors} from "../hooks/hook.jsx";
import { LayoutLoader } from "../components/layout/Loaders.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember, setIsMobile } from "../redux/reducers/misc.js";

const ConfirmDeleteDialogue = lazy(() => import("../components/dialogs/ConfirmDialogue.jsx"));
const AddMemberDialogue = lazy(() => import("../components/dialogs/AddMemberDialogue.jsx"));


const Groups = () => {

    const dispatch = useDispatch();
    const { isMobile, isAddMember } = useSelector((state) => state['misc']);

    const chatId = useSearchParams()[0].get('group');
    const navigate = useNavigate();

    const myGroups = useMyGroupsQuery('');
    const groupDetails = useChatDetailsQuery(
        { chatId, populate:'true' },
        { skip: !chatId },
    );

    const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation);
    const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation);
    const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation);

    const [isEdit, setIsEdit] = useState(false);
    const [confirmDeleteDialogue, setConfirmDeleteDialogue] = useState(false);

    const [groupName, setGroupName] = useState('');
    const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState('');

    const [members, setMembers] = useState([]);

    const errors = [
        {
            isError: myGroups.isError,
            error: myGroups.error,
        },
    ];

    useErrors(errors);

    const navigateBack = () => {
        navigate('/');
    };

    const handleMobile = () => {
        dispatch(setIsMobile(true));
    };

    const handleMobileClose = () => {
        dispatch(setIsMobile(false));
    };

    const updateGroupName = () => {
        console.log("update group name");
        setGroupName(groupNameUpdatedValue);
        updateGroup(
            'Updating Your Group Name', {
                chatId,
                name: groupNameUpdatedValue,
            }
        );
        setIsEdit(false);
        console.log('update group complete');
    };

    const openConfirmDeleteHandler = () => {
        setConfirmDeleteDialogue(true);
    };

    const closeConfirmDeleteHandler = () => {
        setConfirmDeleteDialogue(false);
    }

    const openAddMemberHandler = () => {
        dispatch(setIsAddMember(true));
    };

    const deleteHandler = () => {
        deleteGroup('Deleting Group...', chatId);
                closeConfirmDeleteHandler();
                navigate('/groups');
    };

    const removeMemberHandler = (userId) => {
        removeMember('Removing member...', { chatId, userId });
    };

    useEffect(() => {
        if(groupDetails.data && chatId) {
            setGroupName(groupDetails.data?.chat.name || '');
            setGroupNameUpdatedValue(groupDetails.data?.chat.name || '');
            setMembers(groupDetails.data?.chat.members);
        }
        return () => {
            setGroupName('');
            setGroupNameUpdatedValue('');
            setMembers([]);
            setIsEdit(false);
        }
    }, [chatId, groupDetails]);

    const IconButtons = <>

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
                <IconButton onClick={handleMobile}>
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
                        <TextField
                            value={groupNameUpdatedValue}
                            onChange={(e) => setGroupNameUpdatedValue(e?.target?.value)
                        }/>
                        <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
                            <DoneIcon />
                        </IconButton>

                    </>
                ) : (
                    <>
                        <Typography variant='h4'>{groupName}</Typography>
                        <IconButton onClick={() => setIsEdit(true)} disabled={isLoadingGroupName}>
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

    return myGroups.isLoading ? <LayoutLoader /> : (
        <>
            <Grid2 container height={'100vh'}>
                <Grid2
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'block',
                        },
                        backgroundImage: bgGradient,
                    }}
                    size={{ sm: 4, md: 3 }}
                >
                    <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
                </Grid2>

                <Grid2
                    size={{ xs: 12, sm: 8 }}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        padding: '1rem 3rem',
                    }}
                >
                    {IconButtons}
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
                                        isLoadingRemoveMember ? (
                                            <CircularProgress />
                                        ) : (
                                            groupDetails?.data?.chat.members.map((i) => (
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
                                        )
                                    }
                                </Stack>

                                {ButtonGroup}
                            </>
                        )
                    }
                </Grid2>

                {
                    isAddMember && (
                        <Suspense fallback={<Backdrop open={true} />}>
                            <AddMemberDialogue chatId={chatId} />
                        </Suspense>
                    )
                }

                {
                    confirmDeleteDialogue && (
                        <Suspense fallback={<Backdrop open={true} /> }>
                            <ConfirmDeleteDialogue
                                open={confirmDeleteDialogue}
                                handleClose={closeConfirmDeleteHandler}
                                confirmHandler={deleteHandler}
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
                    open={isMobile}
                    onClose={handleMobileClose}
                >
                    <GroupList w={'80vw'} myGroups={myGroups?.data?.groups} chatId={chatId} />
                </Drawer>
            </Grid2>
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
