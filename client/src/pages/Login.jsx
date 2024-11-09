import CommonForm from '@/components/common/form'
import { loginFormControls } from '@/Form-Configs'
import { useToast } from '@/hooks/use-toast'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const initialState = {
        email: "",
        password: ""
    }
    const { toast } = useToast()
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            dispatch(loginUser(formData)).then((result) => {
                // console.log(result); // Success response 
                if (result?.success) {
                    toast({
                        title: result?.payload?.message || "Something Went Wrong",
                        status: 'success'
                    });

                } else {
                    toast({
                        title: result?.payload?.message || "Something went wrong",
                        status: result?.payload?.success ? "success" : "error",
                        variant: result?.payload?.success ? "solid" : "destructive", // adjust variant as needed
                    });
                }

            })

        } catch (error) {
            console.error(error); // Error response
            toast({
                title: error.message || "An error occurred",
                status: 'error',
                variant: "destructive"
            });
        }
    };

    return (
        <>
            <div className="mx-auto w-full max-w-md space-y-6 border px-4 py-8 rounded-2xl bg-slate-100">
                <div className="text-start">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Sign in to your account
                    </h1>

                </div>
                <CommonForm
                    formControls={loginFormControls}
                    buttonText={"Sign In"}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
                />
                <p className="mt-2">
                    Don't have an account
                    <Link
                        className="font-medium ml-2 text-primary hover:underline"
                        to="/auth/register"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </>
    )
}

export default Login
