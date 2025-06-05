import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserProfile, getAllUsers, bulkDeleteUsers } from '../redux/actions/admin'
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
            await dispatch(deleteUserProfile(userId))
            // Toast is shown via useEffect when message changes
        } catch (err) {
            toast.error(err?.message || "Failed to delete user")
        } finally {
            setIsDeleting(false)
        }
    }

    const bulkDeleteUsersHandle = async (userIds) => {
        setIsDeleting(true)
        try {
            await dispatch(bulkDeleteUsers(userIds))
            // Toast is shown via useEffect when message changes
        } catch (err) {
            toast.error(err?.message || "Failed to delete users")
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

    // Extract unique roles for filter options
    const roleOptions = useMemo(() => {
        if (!users) return [];
        
        const roles = [...new Set(users.map(user => user.role))]
            .filter(Boolean)
            .map(role => ({
                label: role,
                value: role
            }));
                
        return roles;
    }, [users]);

    // Define filter options
    const filterOptions = [
        {
            key: 'role',
            label: 'Role',
            options: roleOptions
        },
        {
            key: 'joinedAt',
            label: 'Joined',
            options: [
                { label: 'Last 7 days', value: 'last7days' },
                { label: 'Last 30 days', value: 'last30days' },
                { label: 'Last 90 days', value: 'last90days' },
                { label: 'This year', value: 'thisyear' }
            ]
        }
    ];

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
    
    // Filter data based on time period
    const getFilteredUsers = () => {
        if (!users) return [];
        
        return users.map(user => {
            // Add computed properties for filtering if needed
            return {
                ...user,
                // Add any computed properties here
            };
        });
    };
    
    return (
        <DashboardLayout title="Users">
            <DataTable 
                data={getFilteredUsers()}
                columns={columns}
                loading={loading}
                onDelete={deleteUserHandle}
                onBulkDelete={bulkDeleteUsersHandle}
                editLink="/dashboard/user"
                emptyMessage="No users available."
                searchPlaceholder="Search users by name, email, role..."
                deleteConfirmTitle="Delete User"
                deleteConfirmMessage="Are you sure you want to delete this user? This action cannot be undone and will remove all user data and associated content."
                bulkDeleteConfirmTitle="Delete Multiple Users"
                bulkDeleteConfirmMessage="Are you sure you want to delete the selected users? This action cannot be undone and will remove all user data and associated content."
                filterOptions={filterOptions}
            />
        </DashboardLayout>
    )
}

export default Users