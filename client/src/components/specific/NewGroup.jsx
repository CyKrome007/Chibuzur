import {Button, Dialog, DialogTitle, Stack, TextField, Typography} from "@mui/material";
import { sampleUsers } from "../../constants/sampleData.js";
import UserItem from "../shared/UserItem.jsx";
import { useInputValidation } from "6pp";
import {useState} from "react";

const NewGroup = () => {

    const groupName = useInputValidation('');

    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (id) => {

        setSelectedMembers((prev) =>
            prev.includes(id)
            ? prev.filter((i) => i != id)
            : [...prev, id]);
    };
    // console.log(selectedMembers);

    const submitHandler = () => {};

    const closeHandler = () => {};

    return (
        <>
            <Dialog open>
                <Stack
                    p={{
                        xs: '1rem',
                        sm: '2rem'
                    }}
                    width={'25rem'}
                    spacing={'2rem'}
                >
                    <DialogTitle title='NewGroup' variant='h4'>New Group</DialogTitle>

                    <TextField label={'Group Name'} value={groupName.value} onChange={groupName.changeHandler}/>

                    <Typography variant={'body1'}>Members</Typography>

                    <Stack>
                        {
                            members.map((user) => (
                                <UserItem
                                    user={user}
                                    key={user._id}
                                    handler={() => selectMemberHandler(user._id)}
                                    isAdded={selectedMembers.includes(user._id)}
                                />
                            ))
                        }
                    </Stack>

                    <Stack direction='row' spacing={2} sx={{
                        width: '100%',
                        justifyContent: 'center',
                    }}>
                        <Button onClick={closeHandler} variant='outlined' color='error'>Cancel</Button>
                        <Button onClick={submitHandler} variant='contained' >Create</Button>
                    </Stack>

                </Stack>
            </Dialog>
        </>
    )
}

export default NewGroup;
