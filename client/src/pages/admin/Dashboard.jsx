import AdminLayout from "../../components/layout/AdminLayout.jsx";
import {Box, Container, Paper, Stack, Typography} from "@mui/material";
import {
    AdminPanelSettings as AdminPanelSettingsIcon,
    Group as GroupIcon,
    Message as MessageIcon,
    Notifications as NotificationsIcon,
    Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {CurveButton, SearchField} from "../../components/styles/StyledComponents.js";
import {matteBlack} from "../../constants/color.js";
import {DoughnutChart, LineChart} from "../../components/specific/Charts.jsx";

const Dashboard = () => {

    const AppBar = () => {
        return(
            <>
                <Paper
                    elevation={3}
                    sx={{
                        padding: '2rem',
                        margin: '2rem 0',
                        borderRadius: '1rem'
                    }}
                >
                    <Stack
                        direction={{
                            xs: 'column',
                            sm: 'row'
                        }}
                    >
                        <Stack
                            direction='row'
                            alignItems={'center'}
                            justifyContent={'space-evenly'}
                            spacing={'1rem'}
                        >
                            <AdminPanelSettingsIcon
                                sx={{
                                    fontSize: '3rem'
                                }}
                            />
                            <SearchField />
                            <CurveButton>Search</CurveButton>
                        </Stack>
                        <Box flexGrow={1} />
                        <Stack
                            direction='row'
                            alignItems={'center'}
                            justifyContent={'center'}
                            padding={{
                                xs: '1.5rem 0 0 0',
                                sm: '0'
                            }}
                            spacing={1}
                        >
                            <Typography>
                                {
                                    moment().format('dddd, D MMMM YYYY')
                                }
                            </Typography>
                            <NotificationsIcon />
                        </Stack>
                    </Stack>
                </Paper>
            </>
        );
    }

    const Widgets = (
        <>
            <Stack
                direction={{
                    xs: 'column',
                    sm: 'row',
                }}
                spacing={'2rem'}
                justifyContent={'space-between'}
                alignItems={'center'}
                margin={'2rem 0'}
            >
                <Widget title={'Users'} value={34} Icon={<PersonIcon /> }/>
                <Widget title={'Chats'} value={3} Icon={<GroupIcon /> }/>
                <Widget title={'Messages'} value={345} Icon={<MessageIcon /> }/>
            </Stack>
        </>
    );

    return (
        <>
            <AdminLayout>
                <Container component={'main'}>
                    <AppBar />
                    <Stack
                        direction={{
                            xs: 'column',
                            lg: 'row'
                        }}
                        sx={{
                            gap: '2rem'
                        }}
                        flexWrap='wrap'
                        justifyContent={'center'}
                        alignItems={{
                            sm: 'center',
                            lg: 'stretch',
                        }}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                padding: '2rem 3.5rem',
                                borderRadius: '1rem',
                                width: '100%',
                                maxWidth: '40rem',
                            }}
                        >
                            <Typography margin={'2rem 0'} variant='h4'>
                                Last Messages
                            </Typography>
                            <LineChart value={[1, 22, 3, 50, 5]}/>
                        </Paper>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: '1rem',
                                borderRadius: '1rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: {
                                    xs: '100%',
                                    sm: '50%'
                                },
                                position: 'relative',
                                maxWidth: '25rem',
                            }}
                        >
                            <DoughnutChart labels={['Single Chats', 'Group Chats']} value={[23, 66]} />
                            <Stack
                                position='absolute'
                                direction='row'
                                justifyContent={'center'}
                                alignItems={'center'}
                                width={'100%'}
                                height={'100%'}
                            >
                                <GroupIcon />
                                <Typography>Vs </Typography>
                                <PersonIcon />
                            </Stack>
                        </Paper>
                    </Stack>
                    <Stack>
                        {Widgets}
                    </Stack>
                </Container>
            </AdminLayout>
        </>
    );
};

const Widget = ({ title, value, Icon }) => <>
    <Paper
        elevation={3}
        sx={{
            padding: '2rem',
            margin: '2rem 0',
            borderRadius: '1.5rem',
            width: '20rem',
        }}
    >
        <Stack
            alignItems={'center'}
            spacing={'1rem'}
        >
            <Typography
                sx={{
                    color: matteBlack,
                    borderRadius: '50%',
                    border: `5px solid ${matteBlack}`,
                    width: '5rem',
                    height: '5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {value}
            </Typography>
            <Stack
                direction='row'
                spacing={'1rem'}
                alignItems={'center'}
            >
                {Icon}
                <Typography>
                    {title}
                </Typography>
            </Stack>
        </Stack>
    </Paper>
</>;

export default Dashboard;