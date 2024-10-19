import {Container, Paper} from "@mui/material";

export const _404 = () => {
    return (
        <>
            <Container fluid>
                <Paper
                    sx={{
                        padding:'1rem',
                        textAlign:'center',
                    }}
                >
                    <h1>Error 404: Page Not Found!</h1>
                </Paper>
            </Container>
        </>
    )
}
