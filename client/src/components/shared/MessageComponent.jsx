import {memo} from "react";
import {Box, Typography} from "@mui/material";
import {lightBlue} from "../../constants/color.js";
import moment from "moment";
import {fileFormat} from "../../lib/features.js";
import RenderAttachment from "./RenderAttachment.jsx";

const MessageComponent = ({ message, user }) => {

    const {sender, content, attachments = [], createdAt} = message;

    const sameSender = sender?._id === user._id;

    const timeAgo = moment(createdAt).fromNow()

    return (
        <>
            <div
                style={{
                    alignSelf: sameSender ? 'flex-end' : 'flex-start',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    color: 'black',
                    borderRadius: '.8rem',
                    padding: '.5rem 1rem',
                    width: 'fit-content'
                }}
            >
                {
                    !sameSender &&
                    <Typography
                        color={lightBlue}
                        fontWeight={'600'}
                        variant='caption'
                    >
                        {sender.name}
                    </Typography>
                }

                {
                    attachments.length > 0 && attachments.map((attachment, index) => {
                        const url = attachment.url;
                        const file = fileFormat(url);
                        return (
                            <Box key={index}>
                                <a
                                    href={url}
                                    target="_blank"
                                    download
                                    style={{
                                        color: 'black',
                                    }}
                                >
                                    <RenderAttachment file={file} url={url} />
                                </a>
                            </Box>
                        )
                    })
                }

                {
                    content && <Typography>{content}</Typography>
                }

                <Typography variant='caption' color={'text.secondary'}>{timeAgo}</Typography>

            </div>
        </>
    )
}

export default memo(MessageComponent);
