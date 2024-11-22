import CommonForm from "@/components/common/form"
import { registerFormControls } from "@/Form-Configs"
import { useToast } from "@/hooks/use-toast"
import { registerUser } from "@/store/auth-slice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
    const { toast } = useToast()
    const initialState = {
        userName: "",
        email: "",
        password: ""
    }
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData)).then((data) => {
            console.log(data);

            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message || "Something went wrong",
                });
                navigate("/auth/login");
                setFormData(initialState)
            } else {
                toast({
                    title: data?.payload?.message || "Something went wrong",
                    variant: "destructive",
                });
            }
        });

    }


    return (
        <div className="mx-auto w-full max-w-md space-y-6 px-4 py-8 rounded-2xl bg-slate-100">
            <div className="text-start">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Create new account
                </h1>

            </div>


            <CommonForm
                formControls={registerFormControls}
                buttonText={"Sign Up"}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
            <p className="mt-2">
                Already have an account
                <Link
                    className="font-medium ml-2 text-primary hover:underline"
                    to="/auth/login"
                >
                    Login
                </Link>
            </p>

        </div>
    )
}

export default Register
