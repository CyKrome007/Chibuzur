import {Menu, Stack, Typography} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc.js";
import { Delete as DeleteIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook.jsx";
import { useDeleteChatMutation, useLeaveGroupMutation } from "../../redux/api/api.js";
import { useEffect } from "react";

const DeleteChatMenu = ({ deleteMenuAnchor }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isDeleteMenu, selectedDeleteChat } = useSelector((state) => state['misc']);
    const [deleteChat, _, deleteChatData] = useAsyncMutation(useDeleteChatMutation);
    const [leaveGroup, __, leaveGroupData] = useAsyncMutation(useLeaveGroupMutation);

    const isGroup = selectedDeleteChat?.groupChat;

    const leaveGroupHandler = () => {
        closeHandler();
        leaveGroup('Bye Bye...', selectedDeleteChat.chatId);
    };
    const deleteChatHandler = () => {
        closeHandler();
        deleteChat('Deleting Chat...', selectedDeleteChat.chatId );
    };

    const closeHandler = () => {
        dispatch(setIsDeleteMenu(false));
        deleteMenuAnchor.current = null;
    };

    useEffect(() => {
        if(deleteChatData || leaveGroupData) navigate('/');
    }, [deleteChatData, leaveGroupData, navigate]);

    return (
        <>
            <Menu
                open={isDeleteMenu}
                anchorEl={deleteMenuAnchor}
                onClose={closeHandler}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                <Stack
                    sx={{
                        width: '10rem',
                        padding: '.5rem',
                        cursor: 'pointer',
                    }}
                    direction='row'
                    alignItems={'center'}
                    spacing={'.5rem'}
                    onClick={ isGroup ? leaveGroupHandler : deleteChatHandler}
                >
                    {
                        isGroup ? ( <LogoutIcon /> ) : ( <DeleteIcon /> )
                    }
                    <Typography
                        paddingLeft={'.15rem'}
                        variant='body1'
                    >
                        {
                            selectedDeleteChat.groupChat ? 'Leave Group' : 'Delete'
                        }
                    </Typography>
                </Stack>
            </Menu>
        </>
    )
}

export default DeleteChatMenu;
