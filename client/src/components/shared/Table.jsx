import {DataGrid} from "@mui/x-data-grid";
import {Container, Paper, Typography} from "@mui/material";
import {matteBlack} from "../../constants/color.js";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
    return (
        <>
            <Container
                sx={{
                    height: '100vh',
                }}
            >
                <Paper
                    // elevation={3}
                    sx={{
                        padding: '1rem 4rem',
                        borderRadius: '1rem',
                        margin: 'auto',
                        overflow: 'hidden',
                        height: '100%',
                        boxShadow: 'none',
                    }}
                >
                    <Typography
                        variant="h4"
                        textAlign='center'
                        sx={{
                            margin: '2rem',
                            textTransform: 'uppercase',
                        }}
                    >
                        {heading}
                    </Typography>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        rowHeight={rowHeight}
                        style={{
                            height: '80%',
                        }}
                        sx={{
                            border: 'none',
                            '.table-header': {
                                bgcolor: matteBlack,
                                color: 'white',
                            },
                        }}
                    />
                </Paper>
            </Container>
        </>
    )
}

export default Table;
