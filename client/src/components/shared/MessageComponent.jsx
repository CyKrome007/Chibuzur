import { memo } from "react";
import { Box, Typography } from "@mui/material";
import { lightBlue } from "../../constants/color.js";
import moment from "moment";
import { fileFormat } from "../../lib/features.js";
import RenderAttachment from "./RenderAttachment.jsx";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const MessageComponent = ({ message, user, index }) => {

    // eslint-disable-next-line react/prop-types
    const { sender, content, attachments = [], createdAt } = message;

    // eslint-disable-next-line react/prop-types
    const sameSender = sender?._id === user._id;

    const timeAgo = moment(createdAt).fromNow()

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: `${sameSender ? '100%' : '-100%'}` }}
                whileInView={{ opacity: 1, x: '0' }}
                transition={{ delay: index * 0.1 }}
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

            </motion.div>
        </>
    )
}

export default memo(MessageComponent);
