import AppLayout from "../components/layout/AppLayout.jsx";
import { IconButton, Stack } from "@mui/material";
import { useRef } from "react";
import { AttachFile as AttachFileIcon, Send as SendIcon } from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents.js";
import {bgGradient, gray, orange} from "../constants/color.js";
import FileMenu from "../components/dialogs/FileMenu.jsx";
import {sampleMessage} from "../constants/sampleData.js";
import MessageComponent from "../components/shared/MessageComponent.jsx";

const user = {
    _id: 'dlkasjf',
    name: 'Owaiz Mustafa Khan'
}

// eslint-disable-next-line react-refresh/only-export-components
const Chat = () => {

    const containerRef = useRef(null);

    return (
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
                    sampleMessage.map(i => (
                        <MessageComponent message={i} key={i._id} user={user} />
                    ))
                }
            </Stack>

            <form
                style={{
                    height: '10%'
                }}
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
                    >
                        <AttachFileIcon />
                    </IconButton>

                    <InputBox placeholder={'Type Message Here....'}/>

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

            <FileMenu />

        </>
    )
}

export default AppLayout()(Chat);
