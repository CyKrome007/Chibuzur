import AppLayout from "../components/layout/AppLayout.jsx";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { AttachFile as AttachFileIcon, Send as SendIcon } from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents.js";
import { bgGradient, gray, orange } from "../constants/color.js";
import FileMenu from "../components/dialogs/FileMenu.jsx";
import MessageComponent from "../components/shared/MessageComponent.jsx";
import { getSocket } from "../Socket.jsx";
import { ALERT, CHAT_JOINED, CHAT_LEFT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../constants/events.js";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api.js";
import { useErrors, useSocketEvents } from "../hooks/hook.jsx";
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenu, setIsMobile } from "../redux/reducers/misc.js";
import { useDispatch } from "react-redux";
import { removeNewMessagesAlert } from "../redux/reducers/chat.js";
import { TypingLoader } from "../components/layout/Loaders.jsx";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components,react/prop-types
const Chat = ({ chatId, user }) => {

    const socket = getSocket();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const containerRef = useRef(null);
    const bottomRef = useRef(null);

    const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

    const [selfTyping, setSelfTyping] = useState(false);
    const [otherTyping, setOtherTyping] = useState(false);
    const typingTimout = useRef(null);

    const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

    const {data: oldMessages, setData: setOldMessages} = useInfiniteScrollTop(
        containerRef,
        oldMessagesChunk.data?.totalPages,
        page,
        setPage,
        oldMessagesChunk.data?.messages
    );

    const errors = [
        {
            isError: chatDetails.isError,
            error: chatDetails.error,
        },
        {
            isError: oldMessagesChunk.isError,
            error: oldMessagesChunk.error,
        },
    ];

    const members = chatDetails.data?.chat?.members;

    const messageChangeHandler = (e) => {
        setMessage(e.target.value);

        if(!selfTyping) {
            socket.emit(START_TYPING, {members, chatId});
            setSelfTyping(true);
        }

        if(typingTimout.current) clearTimeout(typingTimout.current);

        typingTimout.current = setTimeout(() => {
            socket.emit(STOP_TYPING, {members, chatId});
            setSelfTyping(false);
        }, 2000);
    };

    const handleFileOpen = (e) => {
        dispatch(setIsFileMenu(true));
        setFileMenuAnchor(e.currentTarget);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if(!message.trim())
            return;
        socket.emit(NEW_MESSAGE, {chatId, members, message});
        setTimeout(() => {
            setMessage('');
        }, 200);
    };

    useEffect(() => {
        // console.log('useEffect memebers', members);
        // eslint-disable-next-line react/prop-types
        socket.emit(CHAT_JOINED, { userId: user?._id, members })
        dispatch(removeNewMessagesAlert(chatId));
        dispatch(setIsMobile(false));

        return () => {
            setMessages([]);
            setMessage('');
            setPage(1);
            setOldMessages([]);
            // console.log('Cleanup members', members);
            // eslint-disable-next-line react/prop-types
            socket.emit(CHAT_LEFT, { userId: user?._id, members })
        }
    }, [chatId, dispatch, setOldMessages, setPage, setMessages, setMessage, socket]);

    useEffect(() => {
        bottomRef?.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    useEffect(() => {
        if(chatDetails.isError) {
            return navigate('/');
        }
    }, [chatDetails.data, chatDetails.isLoading, navigate]);

    const newMessagesListener = useCallback((data) => {
        if(data.chatId !== chatId)
            return;
        setMessages(prev => [...prev, data.message]);
    }, [chatId]);

    const startTypingListener = useCallback((data) => {
        if(data.chatId !== chatId)
            return;
        setOtherTyping(true);
    }, [chatId]);

    const stopTypingListener = useCallback((data) => {
        if(data.chatId !== chatId)
            return;
        setOtherTyping(false);
    }, [chatId]);

    const alertListener = useCallback((data) => {
        if(data.chatId !== chatId)
            return;
        const messageForAlert = {
            message: data.message,
            sender: {
                _id: 'asdfhj2321',
                name: 'Chibuzur',
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, messageForAlert]);
    }, [chatId]);

    const eventHandlers = {
        [NEW_MESSAGE]: newMessagesListener,
        [ALERT]: alertListener,
        [START_TYPING]: startTypingListener,
        [STOP_TYPING]: stopTypingListener,
    }

    useSocketEvents(socket, eventHandlers);

    useErrors(errors);

    const allMessages = [...oldMessages, ...messages]

    return chatDetails.isLoading ? (
        <Skeleton />
    ) : (
        <>
            <Stack
                direction="column"
                spacing={'1rem'}
                ref={containerRef}
                boxSizing='border-box'
                padding={'1rem'}
                height={'90%'}
                bgcolor={gray}
                sx={{
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    backgroundImage: bgGradient,
                }}
            >
                {
                    allMessages?.map((i) => {
                        return (<MessageComponent message={i} key={i._id} user={user}/>);
                    })
                }
                {
                    otherTyping && <TypingLoader/>
                }
                <div ref={bottomRef}/>
            </Stack>

            <form
                style={{
                    height: '10%'
                }}
                onSubmit={submitHandler}
            >
                <Stack
                    direction='row'
                    height={'100%'}
                    spacing={'.2rem'}
                    padding={'.5rem'}
                    alignItems={'center'}
                    position='relative'
                >
                    <IconButton
                        sx={{
                            position: 'absolute',
                            rotate: '45deg',
                            left: '1.2rem',
                            "&:hover": {
                                bgcolor: orange,
                                color: 'white',
                            },
                        }}
                        onClick={handleFileOpen}
                    >
                        <AttachFileIcon />
                    </IconButton>

                    <InputBox
                        placeholder={'Type Message Here....'}
                        value={message}
                        onChange={messageChangeHandler}
                    />

                    <IconButton
                        type={'submit'}
                        sx={{
                            bgcolor: orange,
                            color: 'white',
                            marginLeft: '1rem',
                            padding: '0.5rem',
                            "&:hover": {
                                bgcolor: 'error.dark'
                            },
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Stack>
            </form>

            <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />

        </>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default AppLayout()(Chat);
