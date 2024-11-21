import AdminLayout from "../../components/layout/AdminLayout.jsx";
import { useEffect, useState } from "react";
import Table from "../../components/shared/Table.jsx";
import { Avatar } from "@mui/material";
import { transformImage } from "../../lib/features.js";
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
        width: 150,
        renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar}/>,
    },
    {
        field: 'name',
        headerName: 'Name',
        headerClassName: 'table-header',
        width: 200,
    },
    {
        field: 'username',
        headerName: 'Username',
        headerClassName: 'table-header',
        width: 200,
    },
    {
        field: 'friends',
        headerName: 'Friends',
        headerClassName: 'table-header',
        width: 160,
    },
    {
        field: 'groups',
        headerName: 'Groups',
        headerClassName: 'table-header',
        width: 200,
    },

];

const UserManagement = () => {

    const { isAdmin } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAdmin)
            navigate('/admin');
    }, [isAdmin, navigate]);

    const { loading, data, error, refetch } = useFetchData(
        `${server}/admin/users`,
        'user-management'
    );

    const { users } = data || {};

    useErrors([{ isError: error, error}]);

    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(
            users?.map(
                (user) => (
                    {
                        ...user,
                        id: user._id,
                        avatar: transformImage(user.avatar, 50)
                    }
                )
            )
        );
    }, [users]);

    return loading ? <LayoutLoader /> : (
        <>
            <AdminLayout>
                <Table heading={'All Users'} columns={columns} rows={rows} />
            </AdminLayout>
        </>
    )
}

export default UserManagement;
