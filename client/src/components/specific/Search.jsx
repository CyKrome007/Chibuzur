import {Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField} from "@mui/material";
import {useInputValidation} from "6pp";
import {Search as SearchIcon} from "@mui/icons-material";
import UserItem from "../shared/UserItem.jsx";
import {useState} from "react";
import {sampleUsers} from "../../constants/sampleData.js";

const Search = () => {

    const search = useInputValidation('');

    let isLoadingSendFriendRequest = false;

    const [users,setUsers] = useState(sampleUsers);

    const addFriendHandler = (id) => {
        console.log(id);
    }

    return (
        <>
            <Dialog open>
                <Stack direction="column" width={'25rem'} p={'2rem'}>
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
                            users.map((user) => (
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
