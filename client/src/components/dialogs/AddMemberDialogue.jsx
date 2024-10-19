import {Button, Dialog, DialogTitle, Stack, Typography} from "@mui/material";
import {sampleUsers} from "../../constants/sampleData.js";
import UserItem from "../shared/UserItem.jsx";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const AddMemberDialogue = ({ addMember, isLoadingAddMember, chatId }) => {

    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (id) => {
        console.log(id)
        setSelectedMembers((prev) =>
            prev.includes(id)
                ? prev.filter((currentElement) => currentElement !== id)
                : [...prev, id]
        )
    };

    const addMemberSubmitHandler = () => {
        closeHandler();
    };

    const closeHandler = () => {
        setMembers([]);
        setSelectedMembers([]);

    };

    return (
        <>
            <Dialog open={true} onClose={closeHandler}>
                <Stack
                    p={'2rem'}
                    width={{
                        xs: '18rem',
                        sm: '22rem'
                    }}
                    spacing={'2rem'}
                >
                    <DialogTitle textAlign='center' title="Add Member">Add Member</DialogTitle>
                    <Stack>
                        { members.length > 0 ? (
                            members.map((i) => (
                                <UserItem
                                    key={i._id}
                                    user={i}
                                    handler={() => selectMemberHandler(i._id)}
                                    isAdded={selectedMembers.includes(i._id)}
                                />
                            ))
                        ) : (
                            <Typography
                                variant="body2"
                                textAlign='center'
                                color='textSecondary'
                                p={'.8rem'}
                            >
                                You have no friends :(
                            </Typography>
                        )}
                    </Stack>
                    <Stack
                        spacing={'1rem'}
                        direction={{
                            xs: 'column-reverse',
                            sm: 'row'
                        }}
                        sm={{
                            alignItems: 'center'
                        }}
                        justifyContent={'center'}
                    >
                        <Button variant='outlined' onClick={closeHandler} color='error'>Cancel</Button>
                        <Button variant='contained' onClick={addMemberSubmitHandler} disabled={isLoadingAddMember}>Submit Changes</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    )
}

export default AddMemberDialogue;
