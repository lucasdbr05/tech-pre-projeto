'use client';
import { useFormik } from "formik";
import Link from "next/link";
import logo from "../../../public/logo.png";
import Image from "next/image";
import Input from "@/components/Input/OldInput";
import axios from "axios";
import { useState } from "react";
import Error from "@/components/Error/Error";
import Button from "@/components/Button/Button";

export default function Login() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            console.log(values)
            setLoading(true);
            try{
                // Todo: criar logica de request
                setLoading(false);
            } catch (e: any) {
                setError(e.data.error);
                setLoading(false);
            }
        },
        validate: (value) => {
            let errors: { email?: string, password?: string } = {};

            if (!value.email) {
                errors.email = 'Obrigatorio';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
                errors.email = 'Email Invalido';
            } 

            if (!value.password) {
                errors.password = "Obrigatorio";
            }

            return errors;
        }
    });


    return (
        <div className="w-screen h-screen absolute flex justify-center items-center">
            <div className="w-full bg-inherit md:bg-[#18181B] md:w-2/3 xl:w-1/3 h-3/4 p-4 rounded-xl flex flex-col items-center justify-center">
                {error !== "" &&
                    <div className="w-1/4 absolute -translate-y-[34vh]">
                        <Error error={error} />
                    </div>
                }
                <h1 className="text-3xl font-bold py-2">Devstore Login</h1>
                <div className="w-[25vw] h-[25vw] sm:w-[20vw] sm:h-[20vw] md:w-[7vw] md:h-[7vw] border border-white rounded-full flex items-center justify-center p-2">
                    <Image src={logo} alt="logo" className="w-full" />
                </div>
                <form onSubmit={formik.handleSubmit} className="w-full h-[60%] flex flex-col items-center justify-between">
                    <div className="w-full h-2/3 flex flex-col items-center justify-evenly">
                        <div className="w-full h-[40%] flex flex-col items-center">
                            <Input name="email" error={formik.errors.email} value={formik.values.email} handleChange={formik.handleChange} />
                        </div>

                        <div className="w-full h-[40%] flex flex-col items-center">
                            <Input name="password" error={formik.errors.password} value={formik.values.password} handleChange={formik.handleChange} />
                            <Link href="/login" className="text-sm underline w-[60%] p-1">Nao possui conta ainda?</Link>
                        </div>
                    </div>
                    <Button text="Login" isValid={formik.isValid && formik.dirty} isLoading={loading} />
                </form>
            </div>
        </div>
    );
}