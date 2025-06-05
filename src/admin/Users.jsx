import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserProfile, getAllUsers } from '../redux/actions/admin'
import { toast } from 'react-hot-toast'
import DashboardLayout from './DashboardLayout'
import DataTable from './components/DataTable'

const Users = () => {
    const dispatch = useDispatch()
    const { loading, error, users, message } = useSelector(state => state.admin)
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteUserHandle = async (userId) => {
        setIsDeleting(true)
        try {
            const result = await dispatch(deleteUserProfile(userId))
            if (result?.type === "deleteUserSuccess") {
                toast.success(result.payload?.message || "User deleted successfully")
            }
        } catch (err) {
            toast.error(err?.message || "Failed to delete user")
        } finally {
            setIsDeleting(false)
        }
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
                searchPlaceholder="Search users by name, email, role..."
                deleteConfirmTitle="Delete User"
                deleteConfirmMessage="Are you sure you want to delete this user? This action cannot be undone and will remove all user data and associated content."
            />
        </DashboardLayout>
    )
}

export default Users