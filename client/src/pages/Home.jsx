import AppLayout from "../components/layout/AppLayout.jsx";
import { Box, Typography } from "@mui/material";
import { gray } from "../constants/color.js";

// eslint-disable-next-line react-refresh/only-export-components
const Home = () => {
    return (
        <>
            <Box bgcolor={gray} height={'100%'}>
                <Typography
                    p={'2rem'}
                    variant='h5'
                    textAlign='center'
                >
                    Select a friend to chat
                </Typography>
            </Box>
        </>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default AppLayout()(Home);
