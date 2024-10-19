import AdminLayout from "../../components/layout/AdminLayout.jsx";
import {Avatar, Box, Stack} from "@mui/material";
import Table from "../../components/shared/Table.jsx";
import {useEffect, useState} from "react";
import {dashboardData} from "../../constants/sampleData.js";
import {fileFormat, transformImage} from "../../lib/features.js";
import moment from "moment";
import RenderAttachment from "../../components/shared/RenderAttachment.jsx";

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

            const {attachments} = params.row;

            return attachments?.length > 0 ? attachments.map(i => {

                const url = i.url;
                const file = fileFormat(url);

                return (
                    <Box>
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

            return(
                <Avatar alt={params.row.name} src={params.row.avatar}/>
            );
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
            <Stack>
                <Avatar alt={params.row.name} src={params.row.sender.avatar}/>
                <span>{params.row.sender.name}</span>
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

    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(
            dashboardData.messages.map(
                (message) => (
                    {
                        ...message,
                        id: message._id,
                        sender: {
                            name: message.sender.name,
                            avatar: transformImage(message.sender.avatar, 50),
                        },
                        createdAt: moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
                    }
                )
            )
        );
    }, []);

    return (
        <>
            <AdminLayout>
                <Table heading={'All Messages'} columns={columns} rows={rows} rowHeight={200} />
            </AdminLayout>
        </>
    )
}

export default MessageManagement;
