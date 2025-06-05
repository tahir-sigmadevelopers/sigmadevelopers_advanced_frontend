import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { approveTestimonial, deleteUserTestimonial, getAllTestimonials, bulkDeleteTestimonials, bulkApproveTestimonials } from '../redux/actions/testimonial'
import DashboardLayout from './DashboardLayout'
import DataTable from './components/DataTable'

const Testimonials = () => {
    const dispatch = useDispatch()
    const { loading, error, testimonials, message } = useSelector(state => state.testimonial)
    const [isDeleting, setIsDeleting] = useState(false)

    const approveReviewHandle = async (testimonialId) => {
        try {
            await dispatch(approveTestimonial(testimonialId))
            // Toast is shown via useEffect when message changes
        } catch (err) {
            toast.error(err?.message || "Failed to approve testimonial")
        }
    }

    const deleteTestimonialHandle = async (testimonialId) => {
        setIsDeleting(true)
        try {
            await dispatch(deleteUserTestimonial(testimonialId))
            // Toast is shown via useEffect when message changes
        } catch (err) {
            toast.error(err?.message || "Failed to delete testimonial")
        } finally {
            setIsDeleting(false)
        }
    }

    const bulkDeleteTestimonialsHandle = async (testimonialIds) => {
        setIsDeleting(true)
        try {
            await dispatch(bulkDeleteTestimonials(testimonialIds))
            // Toast is shown via useEffect when message changes
        } catch (err) {
            toast.error(err?.message || "Failed to delete testimonials")
        } finally {
            setIsDeleting(false)
        }
    }

    const bulkApproveTestimonialsHandle = async (testimonialIds) => {
        try {
            await dispatch(bulkApproveTestimonials(testimonialIds))
            // Toast is shown via useEffect when message changes
        } catch (err) {
            toast.error(err?.message || "Failed to approve testimonials")
        }
    }

    // Define table columns
    const columns = [
        {
            header: 'Name',
            accessor: 'user',
            render: (item) => item.user?.name || 'Unknown'
        },
        {
            header: 'Email',
            accessor: 'user',
            render: (item) => item.user?.email || 'Unknown'
        },
        {
            header: 'Description',
            accessor: 'description',
            render: (item) => (
                <div className="max-w-xs truncate">
                    {item.description}
                </div>
            )
        },
        {
            header: 'Status',
            accessor: 'approved',
            render: (item) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.approved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                }`}>
                    {item.approved ? 'Approved' : 'Pending'}
                </span>
            )
        }
    ]

    // Define filter options
    const filterOptions = [
        {
            key: 'approved',
            label: 'Status',
            options: [
                { label: 'Approved', value: 'true' },
                { label: 'Pending', value: 'false' }
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

        dispatch(getAllTestimonials())
    }, [error, message, dispatch])

    // Filter data based on status
    const getFilteredTestimonials = () => {
        if (!testimonials) return [];
        
        return testimonials.map(testimonial => {
            // Convert boolean to string for filtering
            return {
                ...testimonial,
                approvedString: testimonial.approved ? 'true' : 'false'
            };
        });
    };

    return (
        <DashboardLayout title="Testimonials">
            <DataTable 
                data={getFilteredTestimonials()}
                columns={columns}
                loading={loading}
                onDelete={deleteTestimonialHandle}
                onBulkDelete={bulkDeleteTestimonialsHandle}
                onApprove={approveReviewHandle}
                onBulkApprove={bulkApproveTestimonialsHandle}
                showApprove={true}
                emptyMessage="No testimonials available."
                searchPlaceholder="Search testimonials by name, content..."
                deleteConfirmTitle="Delete Testimonial"
                deleteConfirmMessage="Are you sure you want to delete this testimonial? This action cannot be undone."
                bulkDeleteConfirmTitle="Delete Multiple Testimonials"
                bulkDeleteConfirmMessage="Are you sure you want to delete the selected testimonials? This action cannot be undone."
                filterOptions={filterOptions}
            />
        </DashboardLayout>
    )
}

export default Testimonials