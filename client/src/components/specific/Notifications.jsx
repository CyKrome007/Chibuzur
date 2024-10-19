import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from "@mui/material";
import { sampleNotifications } from "../../constants/sampleData.js";
import { memo } from "react";
import {transformImage} from "../../lib/features.js";

const Notifications = () => {

    const friendRequestHandler = ({ _id, accept }) => {
        console.log('Friend Request Handler');
    }

    return (
        <>
            <Dialog open>
                <Stack
                    p={{
                        xs: '1rem',
                        sm: '2rem'
                    }}
                    maxWidth={'25rem'}
                >
                    <DialogTitle title='Notifications'>Notifications</DialogTitle>
                    {
                        sampleNotifications.length > 0 ? (
                            sampleNotifications.map(
                                (notification) =>
                                    <NotificationItem
                                        sender={notification.sender}
                                        _id={notification._id}
                                        key={notification._id}
                                        handler={friendRequestHandler}
                                    />
                            )
                        ) : (
                            <Typography textAlign='center'>No Notifications</Typography>
                        )
                    }
                </Stack>
            </Dialog>
        </>
    )
}

const NotificationItem = memo(({ sender, _id, handler }) => {

    const {name, avatar} = sender

    return(
        <>
            <ListItem>
                <Stack
                    direction='column'
                    alignItems={'center'}
                    spacing={'1rem'}
                    width={'100%'}
                    border={'2px solid gray'}
                    borderRadius={'1rem'}
                    p={'1rem'}
                >
                    <Avatar src={transformImage(avatar)} />
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
                        {`${name} sent you a friend request`}
                    </Typography>

                    <Stack
                        direction={'row'}
                    >
                        <Button onClick={() => handler({ _id, accept: true})}>Accept</Button>
                        <Button onClick={() => handler({ _id, accept: false})} color={'error'}>Reject</Button>
                    </Stack>
                </Stack>
            </ListItem>
        </>
    )
})

export default Notifications;
