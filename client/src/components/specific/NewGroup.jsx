import {Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography} from "@mui/material";
import UserItem from "../shared/UserItem.jsx";
import { useInputValidation } from "6pp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsNewGroup } from "../../redux/reducers/misc.js";
import {useAvailableFriendsQuery, useNewGroupMutation} from "../../redux/api/api.js";
import {useAsyncMutation, useErrors} from "../../hooks/hook.jsx";
import toast from "react-hot-toast";

const NewGroup = () => {

    const dispatch = useDispatch();
    const { isNewGroup } = useSelector((state) => state.misc);

    const {isError, isLoading, error, data} = useAvailableFriendsQuery();

    const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

    const groupName = useInputValidation('');

    const [selectedMembers, setSelectedMembers] = useState([]);

    const errors = [
        {
            isError,
            error,
        },
    ];

    useErrors(errors);

    const selectMemberHandler = (id) => {

        setSelectedMembers((prev) =>
            prev.includes(id)
            ? prev.filter((i) => i != id)
            : [...prev, id]);
    };

    const submitHandler = () => {
        if(!groupName || groupName.value === '')
            return toast.error("Group Name is required");
        if(selectedMembers.length < 2)
            return toast.error(`You Need ${2 - selectedMembers.length} Member${selectedMembers.length === 1 ? '' : 's'} More.`);

        newGroup('Creating Your New Group..', {
            name: groupName.value,
            members: selectedMembers,
        });

        closeHandler();
    };

    const closeHandler = () => dispatch(setIsNewGroup(false));

    return (
        <>
            <Dialog open={isNewGroup} onClose={closeHandler}>
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
                            isLoading ? <Skeleton /> : data?.friends?.map((user) => (
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
                        <Button onClick={submitHandler} variant='contained' disabled={isLoadingNewGroup} >Create</Button>
                    </Stack>

                </Stack>
            </Dialog>
        </>
    )
}

export default NewGroup;
