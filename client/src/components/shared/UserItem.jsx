import { memo } from "react";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const UserItem = ({
    user,
    handler,
    handlerIsLoading,
    isAdded = false,
    styling = {}
}) => {

    // eslint-disable-next-line react/prop-types
    const {name, _id, avatar} = user;

    return (
        <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            whileInView={{ opacity: 1, y: '0' }}
        >
            <ListItem>
                <Stack
                    direction='row'
                    alignItems={'center'}
                    spacing={'1rem'}
                    width={'100%'}
                    {...styling}
                >
                    <motion.div>

                    </motion.div>
                    <Avatar src={avatar} />
                    <Typography
                        variant='body1'
                        sx={{
                            flexGrow: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {name}
                    </Typography>

                    <IconButton
                        size='small'
                        sx={{
                            bgcolor: isAdded ? 'error.main' : 'primary.main',
                            color: 'white',
                            '&:hover': {
                                bgcolor: isAdded ? 'error.main' : 'primary.dark',
                            }
                        }}
                        onClick={() => handler(_id)}
                        disabled={handlerIsLoading}
                    >
                        {
                            isAdded
                                ? <RemoveIcon />
                                : <AddIcon />
                        }
                    </IconButton>
                </Stack>
            </ListItem>
        </motion.div>
    )
}

export default memo(UserItem);
