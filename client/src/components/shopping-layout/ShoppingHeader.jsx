import { logoutUser } from '@/store/auth-slice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ShoppingHeader = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = () => {
        dispatch(logoutUser())
        navigate("/auth/login")

    }
    return (
        <div>
            ShoppingHeader
            <button
                onClick={handleLogout}
                className='bg-slate-400 p-2 text-white rounded'>
                Logout
            </button>
        </div>
    )
}

export default ShoppingHeader
