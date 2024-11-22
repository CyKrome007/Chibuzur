import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from "@mui/material";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc.js";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api.js";
import toast from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook.jsx";

const Search = () => {

    const dispatch = useDispatch()
    const { isSearch } = useSelector((state) => state['misc']);

    const [searchUser] = useLazySearchUserQuery();
    const [sendFriendRequest, isLoadingSendFriendRequest, ] = useAsyncMutation(useSendFriendRequestMutation);

    const search = useInputValidation('');

    const [users,setUsers] = useState([]);

    const addFriendHandler = async (id) => {
        await sendFriendRequest('Sending Friend Request....', {
            userId: id,
        });
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if(search.value !== '')
                searchUser(search.value)
                    .then(({data}) => setUsers(data.users))
                    .catch(err => console.log(err));
        }, 1000);

        return () => {
            clearTimeout(timeOutId);
        };

    }, [search.value]);

    return (
        <>
            <Dialog open={isSearch} onClose={() => dispatch(setIsSearch(false))}>
                <Stack direction="column" width={'100%'} p={'2rem'}>
                    <DialogTitle textAlign="center">Find People</DialogTitle>
                    <TextField
                        label={''}
                        value={search.value}
                        onChange={search.changeHandler}
                        variant={'outlined'}
                        size='small'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position={'start'}>
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                    <List>
                        {
                            users?.map((user) => (
                                <UserItem
                                    user={user}
                                    key={user._id}
                                    handler={addFriendHandler}
                                    handlerIsLoading={isLoadingSendFriendRequest}
                                />
                            ))
                        }
                    </List>
                </Stack>
            </Dialog>
        </>
    )
}

export default Search;
