import Header from "./Header.jsx";
// import Title from "../shared/Title.jsx";
import { Drawer, Skeleton, Grid2 } from "@mui/material";
import ChatList from "../specific/ChatList.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { Profile } from "../specific/Profile.jsx";
import { useMyChatsQuery } from "../../redux/api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from "../../redux/reducers/misc.js";
import { useErrors, useSocketEvents } from "../../hooks/hook.jsx";
import { getSocket } from "../../Socket.jsx";
import {NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS} from "../../constants/events.js";
import {useCallback, useEffect, useRef, useState} from "react";
import { incrementNotifications, setNewMessagesAlert } from "../../redux/reducers/chat.js";
import { getOrSaveFromStorage } from "../../lib/features.js";
import DeleteChatMenu from "../dialogs/DeleteChatMenu.jsx";

const AppLayout = () => (WrappedComponent) => {
    // eslint-disable-next-line react/display-name
    return (props) => {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const params = useParams();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dispatch = useDispatch();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const navigate = useNavigate();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const deleteMenuAnchor = useRef(null);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [onlineUsers, setOnlineUsers] = useState([]);
        const chatId = params.chatId;

        const socket = getSocket();

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { isMobile } = useSelector((state) => state['misc']);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { user } = useSelector((state) => state.auth);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { newMessagesAlert } = useSelector((state) => state.chat);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const {isLoading, data, isError, error, refetch} = useMyChatsQuery(undefined, undefined);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            refetch();
        }, [user, refetch]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useErrors([{isError, error}]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            getOrSaveFromStorage({
                key: NEW_MESSAGE_ALERT,
                value: newMessagesAlert,
            });
        }, [newMessagesAlert]);

        const handleDeleteChat = (e, chatId, groupChat) => {
            e.preventDefault();
            deleteMenuAnchor.current = e.currentTarget;
            dispatch(setIsDeleteMenu(true));
            dispatch(setSelectedDeleteChat({ chatId, groupChat }))
            console.log("Delete Chat: ", chatId, groupChat);
        }

        const handleMobileClose = () => dispatch(setIsMobile(false));

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const newMessageAlertListener = useCallback((data) => {

            if(data.chatId === chatId) return;
            dispatch(setNewMessagesAlert(data));
        }, [chatId, dispatch]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const newRequestListener = useCallback(() => {
            dispatch(incrementNotifications());
        }, [dispatch]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const refetchListener = useCallback(() => {
            refetch();
            navigate('/');
        }, [refetch, navigate]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const onlineUsersListener = useCallback((data) => {
            setOnlineUsers(data);
        }, []);

        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,
            [NEW_REQUEST]: newRequestListener,
            [REFETCH_CHATS]: refetchListener,
            [ONLINE_USERS]: onlineUsersListener,
        };

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSocketEvents(socket, eventHandlers);

        return (
            <>
                {/*<Title />*/}
                <Header />

                <DeleteChatMenu deleteMenuAnchor={deleteMenuAnchor.current}/>

                {
                    isLoading ? (
                        <Skeleton />
                    ) : (
                        <Drawer open={isMobile} onClose={handleMobileClose}>
                            <ChatList
                                w={'85vw'}
                                chats={data?.chats}
                                chatId={chatId}
                                handleDeleteChat={handleDeleteChat}
                                newMessagesAlert={newMessagesAlert}
                                onlineUsers={onlineUsers}
                            />
                        </Drawer>
                    )
                }

                <Grid2 container height={"calc(100vh - 4rem)"}>
                    <Grid2 size={{ sm: 4, md: 3}} sx={{
                        display: {
                            xs: 'none',
                            sm: 'block'
                        },
                    }} height={"100%"} >
                        {
                            user === null || isLoading ? (
                                <Skeleton />
                            ) : (
                                <ChatList
                                    chats={data?.chats}
                                    chatId={chatId}
                                    handleDeleteChat={handleDeleteChat}
                                    newMessagesAlert={newMessagesAlert}
                                    onlineUsers={onlineUsers}
                                />
                            )
                        }
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 8, md: 5, lg: 6}} height={"100%"} >
                        <WrappedComponent {...props} chatId={chatId} user={user} />
                    </Grid2>
                    <Grid2 size={{ md: 4, lg: 3}} height={"100%"} sx={{
                        display: {
                            sm: 'none',
                            md: 'block'
                        },
                        padding: '2rem',
                        bgcolor: 'rgba(0, 0, 0, 0.85)',
                    }}>
                        <Profile user={user}/>
                    </Grid2>
                </Grid2>
            </>
        );
    };

}

export default AppLayout;
