import {Button, Dialog, DialogTitle, Skeleton, Stack, Typography} from "@mui/material";
import {sampleUsers} from "../../constants/sampleData.js";
import UserItem from "../shared/UserItem.jsx";
import { useState } from "react";
import {useAsyncMutation, useErrors} from "../../hooks/hook.jsx";
import {useAddGroupMembersMutation, useAvailableFriendsQuery} from "../../redux/api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc.js";

// eslint-disable-next-line react/prop-types
const AddMemberDialogue = ({ chatId }) => {

    const dispatch = useDispatch();

    const { isAddMember } = useSelector((state) => state.misc);

    const {isLoading, data, isError, error} = useAvailableFriendsQuery(chatId);

    const [addMembers, isLoadingAddMembers] = useAsyncMutation(useAddGroupMembersMutation);

    const [selectedMembers, setSelectedMembers] = useState([]);
    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) =>
            prev.includes(id)
                ? prev.filter((currentElement) => currentElement !== id)
                : [...prev, id]
        )
    };
    const addMemberSubmitHandler = () => {

        addMembers('Adding Members...', { members: selectedMembers, chatId });
        closeHandler();
    };
    const closeHandler = () => {

        setSelectedMembers([]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        dispatch(setIsAddMember(false));
    };

    useErrors([{isError, error}]);

    return (
        <>
            <Dialog open={isAddMember} onClose={closeHandler}>
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
                        {
                            isLoading ? (<Skeleton />) : (
                                data?.friends.length > 0 ? (
                                    data?.friends.map((i) => (
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
                                )
                            )
                        }
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
                        <Button variant='contained' onClick={addMemberSubmitHandler} disabled={isLoadingAddMembers}>Submit Changes</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </>
    )
}

export default AddMemberDialogue;
