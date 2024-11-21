import AdminLayout from "../../components/layout/AdminLayout.jsx";
import {Avatar, Box, Stack, Typography} from "@mui/material";
import Table from "../../components/shared/Table.jsx";
import { useEffect, useState } from "react";
import { fileFormat, transformImage } from "../../lib/features.js";
import moment from "moment";
import RenderAttachment from "../../components/shared/RenderAttachment.jsx";
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
        field: 'attachments',
        headerName: 'Attachments',
        headerClassName: 'table-header',
        width: 200,
        renderCell: (params) => {

            const { attachments } = params.row;

            return attachments?.length > 0 ? attachments.map((i, index) => {

                const url = i.url;
                const file = fileFormat(url);

                return (
                    <Box key={index}>
                        <a
                            href={url}
                            target="_blank"
                            download={true}
                            style={{
                                color: 'black',

                            }}
                        >
                            <RenderAttachment file={file} url={url} />
                        </a>
                    </Box>
                );
            }) : 'No Attachments';
        },
    },
    {
        field: 'content',
        headerName: 'Content',
        headerClassName: 'table-header',
        width: 400,
    },
    {
        field: 'sender',
        headerName: 'Sent By',
        headerClassName: 'table-header',
        width: 200,
        renderCell: (params) => (
            <Stack
                direction='row'
                alignItems={'center'}
                gap={2}
                sx={{ height: '100%' }}
            >
                <Avatar alt={params.row.name} src={params.row.sender.avatar}/>
                <Typography>{params.row.sender.name}</Typography>
            </Stack>
        ),
    },
    {
        field: 'chat',
        headerName: 'Chat',
        headerClassName: 'table-header',
        width: 220,
    },
    {
        field: 'groupChat',
        headerName: 'Group Chat',
        headerClassName: 'table-header',
        width: 100,
    },
    {
        field: 'createdAt',
        headerName: 'Time',
        headerClassName: 'table-header',
        width: 250,
    },

];

const MessageManagement = () => {

    const { isAdmin } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAdmin)
            navigate('/admin');
    }, [isAdmin, navigate]);

    const { loading, data, error } = useFetchData(
        `${server}/admin/messages`,
        'messages-management'
    );

    const { messages } = data || {};

    useErrors([{ isError: error, error }]);

    const [rows, setRows] = useState([]);

    useEffect(() => {
        if(messages)
            setRows(
                messages?.map(
                    (message) => (
                        {
                            ...message,
                            id: message._id,
                            sender: {
                                name: message.sender.name,
                                avatar: transformImage(message.sender.avatar, 150),
                            },
                            createdAt: moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
                        }
                    )
                )
            );
    }, [messages]);

    return loading ? <LayoutLoader /> : (
        <>
            <AdminLayout>
                <Table heading={'All Messages'} columns={columns} rows={rows} rowHeight={200} />
            </AdminLayout>
        </>
    )
}

export default MessageManagement;
