import {Avatar, Stack, Typography} from "@mui/material";
import {Face as FaceIcon, AlternateEmail as UsernameIcon, CalendarMonth as CalendarIcon} from "@mui/icons-material";
import moment from "moment";

export const Profile = () => {
    return (
        <>
            <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
                <Avatar
                    sx={{
                        width: 200,
                        height: 200,
                        objectFit: 'contain',
                        marginBottom: '1rem',
                        border: '5px solid white'
                    }}
                />
                <ProfileCard heading={'Name'} text={'Hafizun Nisha'} Icon={<FaceIcon />} />
                <ProfileCard heading={'Username'} text={'sayed.hafizun'} Icon={<UsernameIcon />} />
                <ProfileCard heading={'Bio'} text={'Hafizun is the best person in the whole world. I Love you'} />
                <ProfileCard heading={'Joined'} text={moment('2023-11-04T18:30:00.000Z').fromNow()} Icon={<CalendarIcon />} />
            </Stack>
        </>
    )
}

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack
        direction='row'
        alignItems={'center'}
        spacing={'1rem'}
        color={'white'}
        textAlign='center'
    >
        {Icon && Icon}
        <Stack>
            <Typography variant='body1'>{text}</Typography>
            <Typography variant='caption' color={'gray'}>{heading}</Typography>
        </Stack>
    </Stack>
)
