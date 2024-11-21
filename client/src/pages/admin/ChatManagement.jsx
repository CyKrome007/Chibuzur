import AdminLayout from "../../components/layout/AdminLayout.jsx";
import { useEffect, useState } from "react";
import Table from "../../components/shared/Table.jsx";
import { Avatar, Stack } from "@mui/material";
import { transformImage } from "../../lib/features.js";
import { AvatarCard } from "../../components/shared/AvatarCard.jsx";
import { useFetchData } from "6pp";
import { server } from "../../constants/config.js";
import { useErrors } from "../../hooks/hook.jsx";
import { LayoutLoader } from "../../components/layout/Loaders.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        headerClassName: 'table-header',
        width: 200,
    },
    {
        field: 'avatar',
        headerName: 'Avatar',
        headerClassName: 'table-header',
        width: 100,
        renderCell: (params) => <AvatarCard avatar={params.row.avatar}/>,
    },
    {
        field: 'name',
        headerName: 'Name',
        headerClassName: 'table-header',
        width: 300,
    },
    {
        field: 'groupChat',
        headerName: 'Group Chat',
        headerClassName: 'table-header',
        width: 100,
    },
    {
        field: 'totalMembers',
        headerName: 'Total Members',
        headerClassName: 'table-header',
        width: 120,
    },
    {
        field: 'members',
        headerName: 'Members',
        headerClassName: 'table-header',
        width: 400,
        renderCell: (params) => (
            <AvatarCard max={100} avatar={params.row.members} />
        ),
    },
    {
        field: 'totalMessages',
        headerName: 'Total Messages',
        headerClassName: 'table-header',
        width: 150,
    },
    {
        field: 'creator',
        headerName: 'Created By',
        headerClassName: 'table-header',
        width: 250,
        renderCell: (params) => (
            <Stack direction='row' alignItems='center' spacing={'1rem'}>
                <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
                <span>{params.row.creator.name}</span>
            </Stack>
        ),
    },
];

const ChatManagement = () => {

    const { isAdmin } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAdmin)
            navigate('/admin');
    }, [isAdmin, navigate]);

    const { loading, data, error} = useFetchData(
        `${server}/admin/chats`,
        'chat-management'
    );

    const { chats } = data || {};

    useErrors([{ isError: error, error }]);

    const [rows, setRows] = useState([]);

    useEffect(() => {
        if(chats) {
            setRows(
                chats?.map(
                    (chat) => (
                        {
                            ...chat,
                            id: chat._id,
                            avatar: chat.avatar,
                            members: chat.members.map((member) => (member.avatar)),
                            groupChat: chat.groupChat ? 'Yes' : 'No',
                            creator: {
                                name: chat.creator.name,
                                avatar: transformImage(chat.creator.avatar?.url || '', 50),
                            },
                        }
                    )
                )
            );
        }
            // setRows(
            //     chats?.map(
            //         (chat) => (
            //             {
            //                 ...chat,
            //                 id: chat._id,
            //                 avatar: chat.avatar.map((avatar) => transformImage(avatar.url, 50)),
            //                 members: chat.members.map((member) => transformImage(member.avatar.url, 50)),
            //                 creator: {
            //                     name: chat.creator.name,
            //                     avatar: transformImage(chat.creator.avatar?.url || '', 50),
            //                 },
            //             }
            //         )
            //     )
            // );
    }, [chats]);

    return loading ? <LayoutLoader /> : (
        <>
            <AdminLayout>
                <Table heading={'All Chats'} columns={columns} rows={rows} />
            </AdminLayout>
        </>
    )
}

export default ChatManagement;
