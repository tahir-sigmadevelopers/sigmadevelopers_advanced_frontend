import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { deleteProject, getAllProjects, bulkDeleteProjects } from '../redux/actions/project'
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

    const bulkDeleteProjectsHandle = async (projectIds) => {
        setIsDeleting(true)
        try {
            await dispatch(bulkDeleteProjects(projectIds))
            // Toast is shown via useEffect when message changes
        } catch (err) {
            toast.error(err?.message || "Failed to delete projects")
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

    // Extract unique categories for filter options
    const categoryOptions = useMemo(() => {
        if (!projects) return [];
        
        const categories = [...new Set(projects.map(project => project.category))]
            .filter(Boolean)
            .map(category => ({
                label: category,
                value: category
            }));
            
        return categories;
    }, [projects]);

    // Define filter options
    const filterOptions = [
        {
            key: 'category',
            label: 'Category',
            options: categoryOptions
        },
        {
            key: 'createdAt',
            label: 'Time Period',
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

        dispatch(getAllProjects())
    }, [error, message, dispatch])
    
    // Filter data based on time period
    const getFilteredProjects = () => {
        if (!projects) return [];
        
        return projects.map(project => {
            // Add computed properties for filtering if needed
            return {
                ...project,
                // Add any computed properties here
            };
        });
    };
    
    return (
        <DashboardLayout 
            title="Projects" 
            addButton={true} 
            addButtonLink="/dashboard/addprojects" 
            addButtonText="Add New Project"
        >
            <DataTable 
                data={getFilteredProjects()}
                columns={columns}
                loading={loading}
                onDelete={deleteProjectHandle}
                onBulkDelete={bulkDeleteProjectsHandle}
                editLink="/dashboard/project"
                viewLink={(item) => item.link}
                emptyMessage="No projects available. Create your first project!"
                searchPlaceholder="Search projects by title, category..."
                deleteConfirmTitle="Delete Project"
                deleteConfirmMessage="Are you sure you want to delete this project? This action cannot be undone and will remove all associated data."
                bulkDeleteConfirmTitle="Delete Multiple Projects"
                bulkDeleteConfirmMessage="Are you sure you want to delete the selected projects? This action cannot be undone."
                filterOptions={filterOptions}
            />
        </DashboardLayout>
    )
}

export default AdminProjects