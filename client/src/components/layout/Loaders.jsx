import {Grid, Skeleton, Stack} from "@mui/material";
import {BouncingSkeleton} from "../styles/StyledComponents.js";

const LayoutLoader = () => {
    return (
        <>
            <Grid container height={"calc(100vh - 4rem)"} spacing={'1rem'}>
                <Grid item sm={4} md={3} sx={{
                    display: {
                        xs: 'none',
                        sm: 'block'
                    },
                }} height={"100%"} >
                    <Skeleton variant='rounded' height={'100vh'} />
                </Grid>
                <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"} >
                    <Stack spacing={'1rem'}>
                        {
                            Array.from({ length: 10 }).map((_, i) => (
                                <Skeleton key={i} variant='rounded' height={'5rem'}/>
                            ))
                        }
                    </Stack>
                </Grid>
                <Grid item sm={4} md={4} lg={3} height={"100%"} sx={{
                    display: {
                        xs: 'none',
                        sm: 'block'
                    },
                }}>
                    <Skeleton variant='rounded' height={'100vh'} />
                </Grid>
            </Grid>
        </>
    )
}

const TypingLoader = () => {
    return (
        <>
            <Stack
                spacing={'0.5rem'}
                direciton={'row'}
                padding={'0.5rem'}
                justifyContent={'center'}
            >
                <BouncingSkeleton
                    variant='circular'
                    width={10}
                    height={10}
                    style={{
                        animationDelay: '0.1s'
                    }}
                />
                <BouncingSkeleton
                    variant='circular'
                    width={10}
                    height={10}
                    style={{
                        animationDelay: '0.2s'
                    }}
                />
                <BouncingSkeleton
                    variant='circular'
                    width={10}
                    height={10}
                    style={{
                        animationDelay: '0.4s'
                    }}
                />
                <BouncingSkeleton
                    variant='circular'
                    width={10}
                    height={10}
                    style={{
                        animationDelay: '0.6s'
                    }}
                />
            </Stack>
        </>
    );
}

export { LayoutLoader, TypingLoader };