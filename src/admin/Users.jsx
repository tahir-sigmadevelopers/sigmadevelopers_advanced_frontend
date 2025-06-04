import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserProfile, getAllUsers } from '../redux/actions/admin'
import { toast } from 'react-hot-toast'
import DashboardLayout from './DashboardLayout'
import DataTable from './components/DataTable'

const Users = () => {
    const dispatch = useDispatch()
    const { loading, error, users, message } = useSelector(state => state.admin)

    const deleteUserHandle = (userId) => {
        dispatch(deleteUserProfile(userId))
    }

    // Define table columns
    const columns = [
        {
            header: 'Joined At',
            accessor: 'joinedAt',
            render: (item) => item.joinedAt?.slice(0, 10)
        },
        {
            header: 'Name',
            accessor: 'name',
        },
        {
            header: 'Email',
            accessor: 'email',
        },
        {
            header: 'Role',
            accessor: 'role',
            render: (item) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.role === 'dhola' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                }`}>
                    {item.role}
                </span>
            )
        }
    ]

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: "clearError" })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: "clearMessage" })
        }

        dispatch(getAllUsers())
    }, [error, message, dispatch])
    
    return (
        <DashboardLayout title="Users">
            <DataTable 
                data={users || []}
                columns={columns}
                loading={loading}
                onDelete={deleteUserHandle}
                editLink="/dashboard/user"
                emptyMessage="No users available."
            />
        </DashboardLayout>
    )
}

export default Users