import {AvatarGroup, Stack, Box, Avatar} from "@mui/material";
import {transformImage} from "../../lib/features.js";

export const AvatarCard = ({
    avatar= [],
    max= 4,
                           }) => {
    return (
        <>
            <Stack direction="row" spacing={0}>
                <AvatarGroup
                    max={max}
                    sx={{
                        position: 'relative',
                    }}
                >
                    <Box width={'3rem'} height={'3rem'}>
                        {
                            avatar.map((a, index) => (
                                <Avatar
                                    key={Math.random() * 100}
                                    src={transformImage(a.url)}
                                    alt={`Avatar ${index}`}
                                    style={{
                                        width: '3rem',
                                        height: '3rem',
                                        position: 'absolute',
                                        left: {
                                            xs: `${0.5 + index} rem`,
                                            sm: `${index}rem`
                                        }
                                    }}
                                />
                            ))
                        }
                    </Box>
                </AvatarGroup>
            </Stack>
        </>
    );
}
