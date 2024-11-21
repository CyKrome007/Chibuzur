import AdminLayout from "../../components/layout/AdminLayout.jsx";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
    AdminPanelSettings as AdminPanelSettingsIcon,
    Group as GroupIcon,
    Message as MessageIcon,
    Notifications as NotificationsIcon,
    Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import { CurveButton, SearchField } from "../../components/styles/StyledComponents.js";
import { matteBlack } from "../../constants/color.js";
import { DoughnutChart, LineChart } from "../../components/specific/Charts.jsx";
import { useFetchData } from "6pp";
import { server } from "../../constants/config.js";
import { LayoutLoader } from "../../components/layout/Loaders.jsx";
import { useErrors } from "../../hooks/hook.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {

    const { isAdmin } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAdmin)
            navigate('/admin');
    }, [isAdmin, navigate]);

    const { loading, data, error, refetch } = useFetchData(
        `${server}/admin/stats`,
        'disaboards-stats'
    );

    const { stats } = data || {};

    useErrors([{ isError: error, error: error }]);

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
                <Widget title={'Users'} value={stats?.usersCount || 0} Icon={<PersonIcon /> }/>
                <Widget title={'Chats'} value={stats?.totalChats || 0} Icon={<GroupIcon /> }/>
                <Widget title={'Messages'} value={stats?.messagesCount || 0} Icon={<MessageIcon /> }/>
            </Stack>
        </>
    );

    return loading ? <LayoutLoader loading={loading} error={error} /> : (
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
                            <LineChart value={stats?.messagesChart || []}/>
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
                            <DoughnutChart
                                labels={['Single Chats', 'Group Chats']}
                                value={[stats?.totalChats - stats?.groupsCount, stats?.groupsCount || 0]}
                            />
                            <Stack
                                position='absolute'
                                direction='row'
                                justifyContent={'center'}
                                alignItems={'center'}
                                width={'100%'}
                                height={'100%'}
                            >
                                <GroupIcon />
                                <Typography>&nbsp;Vs&nbsp;</Typography>
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
