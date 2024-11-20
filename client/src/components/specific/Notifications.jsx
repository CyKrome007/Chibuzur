import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from "@mui/material";
import { memo, useState } from "react";
import { transformImage } from "../../lib/features.js";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc.js";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../../redux/api/api.js";
import {useAsyncMutation, useErrors} from "../../hooks/hook.jsx";
import toast from "react-hot-toast";

const Notifications = () => {

    const dispatch = useDispatch();
    const { isNotification } = useSelector((state) => state.misc);
    const { isLoading, data, isError, error } = useGetNotificationsQuery();
    const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

    useErrors([{isError, error}]);

    const friendRequestHandler = async ({ _id, accept }) => {
        await acceptRequest('Processing your request..', { requestId: _id, accept })
    }

    return (
        <>
            <Dialog open={isNotification} onClose={() => dispatch(setIsNotification(false))}>
                <Stack
                    p={{
                        xs: '1rem',
                        sm: '2rem'
                    }}
                    maxWidth={'25rem'}
                >

                    <DialogTitle title='Notifications'>Notifications</DialogTitle>
                    {
                        isLoading ? (
                            <Skeleton />
                        ) : (
                            data?.Request.length > 0 ? (
                                data?.Request.map(
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
                        )
                    }
                </Stack>
            </Dialog>
        </>
    )
}

const NotificationItem = memo(({ sender, _id, handler }) => {

    // eslint-disable-next-line react/prop-types
    const { name, avatar } = sender
    const [display, setDisplay] = useState(true);

    const handleClick = (args) => {
        setDisplay(false);
        handler(args);
    };

    return(
        <>
            <ListItem
                sx={{
                    display: `${display ? 'block' : 'none'}`,
                }}
            >
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
                        <Button onClick={() => handleClick({ _id, accept: true})}>Accept</Button>
                        <Button onClick={() => handleClick({ _id, accept: false})} color='error'>Reject</Button>
                    </Stack>
                </Stack>
            </ListItem>
        </>
    )
})

export default Notifications;
