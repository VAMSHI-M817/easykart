import { logoutUser } from '@/store/auth-slice'
import { HousePlug, Menu } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'

const ShoppingHeader = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = () => {
        dispatch(logoutUser())
        navigate("/auth/login")

    }
    return (
        <div>
            <header className="sticky top-0 z-40 w-full border-b bg-background">
                <div className="flex h-16 items-center justify-between px-4 md:px-6">
                    <Link to="/shop/home" className="flex items-center gap-2">
                        <HousePlug className="h-6 w-6" />
                        <span className="font-bold">Ecommerce</span>
                    </Link>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="lg:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle header menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-full max-w-xs">
                            {/* <MenuItems />
                            <HeaderRightContent /> */}
                        </SheetContent>
                    </Sheet>
                    {/* <div className="hidden lg:block">
                        <MenuItems />
                    </div>

                    <div className="hidden lg:block">
                        <HeaderRightContent />
                    </div> */}
                </div>
            </header>
            <button
                onClick={handleLogout}
                className='bg-slate-400 p-2 text-white rounded'>
                Logout
            </button>
        </div>
    )
}

export default ShoppingHeader
