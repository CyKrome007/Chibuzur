import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material";
import {
    Face as FaceIcon,
    AlternateEmail as UsernameIcon,
    CalendarMonth as CalendarIcon,
    InfoOutlined as BioIcon,
    Edit as EditIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features.js";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Profile = () => {

    const { user } = useSelector((state) => state.auth);

    return !user ? <Skeleton /> : (
        <>
            <Stack spacing={'2rem'} direction='column' alignItems={'center'}>
                <Avatar
                    sx={{
                        width: 200,
                        height: 200,
                        objectFit: 'contain',
                        marginBottom: '1rem',
                        border: '5px solid white'
                    }}
                    src={transformImage(user?.avatar?.url)}
                />
                <ProfileCard index={1} heading={'Name'} text={user?.name} Icon={<FaceIcon />} />
                <ProfileCard index={2} heading={'Username'} text={user?.username} Icon={<UsernameIcon />} />
                <ProfileCard index={3} heading={'Bio'} text={user?.bio} Icon={<BioIcon />}/>
                <ProfileCard index={4} heading={'Joined'} text={moment(user?.createdAt).fromNow()} Icon={<CalendarIcon />} />
                <Box flexDirection='column' flexGrow={1} />
                <Link to={'/profile'}>
                    <Stack
                        direction='row'
                        color={'white'}
                        gap={1}
                    >
                        <EditIcon />
                        <Typography variant='body1'>
                            Edit Profile
                        </Typography>
                    </Stack>
                </Link>
            </Stack>
        </>
    )
}

// eslint-disable-next-line react/prop-types
const ProfileCard = ({ text, Icon, heading, index }) => (
    <Box sx={{
        width: '100%'
    }}>
        <motion.div
            initial={{opacity: 0, y: '100%'}}
            whileInView={{opacity: 1, y: '0'}}
            transition={{delay: index * 0.1}}
            alignItems={'center'}
        >
            <Stack
                direction='row'
                alignItems={'center'}
                spacing={'1rem'}
                color={'white'}
                width={'100%'}
            >
                {Icon && Icon}
                <Stack>
                    <Typography variant='body1'>{text}</Typography>
                    <Typography variant='caption' color={'gray'}>{heading}</Typography>
                </Stack>
            </Stack>
        </motion.div>
    </Box>
)
