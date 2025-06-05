import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { approveTestimonial, deleteUserTestimonial, getAllTestimonials } from '../redux/actions/testimonial'
import DashboardLayout from './DashboardLayout'
import DataTable from './components/DataTable'

const Testimonials = () => {
    const dispatch = useDispatch()
    const { loading, error, testimonials, message } = useSelector(state => state.testimonial)
    const [isDeleting, setIsDeleting] = useState(false)

    const approveReviewHandle = async (testimonialId) => {
        try {
            const result = await dispatch(approveTestimonial(testimonialId))
            if (result?.type === "approveTestimonialSuccess") {
                toast.success(result.payload?.message || "Testimonial approved successfully")
            }
        } catch (err) {
            toast.error(err?.message || "Failed to approve testimonial")
        }
    }

    const deleteTestimonialHandle = async (testimonialId) => {
        setIsDeleting(true)
        try {
            const result = await dispatch(deleteUserTestimonial(testimonialId))
            if (result?.type === "deleteTestimonialSuccess") {
                toast.success(result.payload?.message || "Testimonial deleted successfully")
            }
        } catch (err) {
            toast.error(err?.message || "Failed to delete testimonial")
        } finally {
            setIsDeleting(false)
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

    return (
        <DashboardLayout title="Testimonials">
            <DataTable 
                data={testimonials || []}
                columns={columns}
                loading={loading}
                onDelete={deleteTestimonialHandle}
                onApprove={approveReviewHandle}
                showApprove={true}
                emptyMessage="No testimonials available."
                searchPlaceholder="Search testimonials by name, content..."
                deleteConfirmTitle="Delete Testimonial"
                deleteConfirmMessage="Are you sure you want to delete this testimonial? This action cannot be undone."
            />
        </DashboardLayout>
    )
}

export default Testimonials