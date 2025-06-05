import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { deleteProject, getAllProjects } from '../redux/actions/project'
import DashboardLayout from './DashboardLayout'
import DataTable from './components/DataTable'

const AdminProjects = () => {
    const dispatch = useDispatch()
    const { loading, error, projects, message } = useSelector(state => state.project)
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteProjectHandle = async (projectId) => {
        setIsDeleting(true)
        try {
            await dispatch(deleteProject(projectId))
            // Toast is shown via useEffect when message changes
        } catch (err) {
            toast.error(err?.message || "Failed to delete project")
        } finally {
            setIsDeleting(false)
        }
    }

    // Define table columns
    const columns = [
        {
            header: 'Title',
            accessor: 'title',
        },
        {
            header: 'Created At',
            accessor: 'createdAt',
            render: (item) => item.createdAt?.slice(0, 10)
        },
        {
            header: 'Category',
            accessor: 'category',
            render: (item) => item.category || "No category"
        },
        {
            header: 'URL',
            accessor: 'link',
            render: (item) => (
                <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline"
                >
                    {item.link.length > 30 ? `${item.link.substring(0, 30)}...` : item.link}
                </a>
            )
        },
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

        dispatch(getAllProjects())
    }, [error, message, dispatch])
    
    return (
        <DashboardLayout 
            title="Projects" 
            addButton={true} 
            addButtonLink="/dashboard/addprojects" 
            addButtonText="Add New Project"
        >
            <DataTable 
                data={projects || []}
                columns={columns}
                loading={loading}
                onDelete={deleteProjectHandle}
                editLink="/dashboard/project"
                viewLink={(item) => item.link}
                emptyMessage="No projects available. Create your first project!"
                searchPlaceholder="Search projects by title, category..."
                deleteConfirmTitle="Delete Project"
                deleteConfirmMessage="Are you sure you want to delete this project? This action cannot be undone and will remove all associated data."
            />
        </DashboardLayout>
    )
}

export default AdminProjects