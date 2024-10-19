import {Box, Stack, Typography} from "@mui/material";
import {Link} from "../styles/StyledComponents.js";
import {memo} from "react";
import {AvatarCard} from "./AvatarCard.jsx";

export const ChatItem = ({
    avatar=[],
    name,
    _id,
    LastMessage,
    groupChat=false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,
                         }) => {
    return (
        <>
            <Link
                to={`/chat/${_id}`}
                onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
                sx={{
                    padding: '0rem',
                }}
            >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "1rem",
                    backgroundColor: sameSender ? 'black' : 'unset',
                    color: sameSender ? 'white' : 'unset',
                    gap: '1rem',
                    position: 'relative'
                }}>
                    <AvatarCard avatar={avatar}/>
                    <Stack >
                        <Typography>{name}</Typography>
                        {
                            newMessageAlert && (
                                // eslint-disable-next-line react/prop-types
                                <Typography>{newMessageAlert.count} New Message(s)</Typography>
                            )
                        }
                    </Stack>
                    {
                        isOnline && (
                            <Box
                                sx={{
                                    width: "10px",
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: 'green',
                                    position: 'absolute',
                                    top: '50%',
                                    right: '1rem',
                                    transform: 'translateY(-50%)',
                                }}
                            />
                        )
                    }
                </div>
            </Link>
        </>
    );
};

export default memo(ChatItem);
