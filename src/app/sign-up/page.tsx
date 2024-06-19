"use client"
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from 'yup';
import logo from "../../../public/s.png";
import Link from "next/link";
import Image from "next/image";

interface SignUpFields {
    name: string;
    username: string;
    password: string;
    email: string;
}

const initialValues: SignUpFields = {
    name: '',
    username: '',
    password: '',
    email: '',
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    name: Yup.string().required(),
    username: Yup.string().ensure().required(),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const onSubmit = (values: SignUpFields) => {
    //TODO: data fetchinng with axios
    console.log(values)
    return;
}

const SignUp = () => {

    const inputClassName = "placeholder-gray-500 border border-primary border-4 font-bold bg-transparent placeholder:font-semibold";
    return (
        <div className="w-screen h-screen absolute flex justify-center items-center">
            <div className="w-full bg-inherit bg-[#242526] h-auto md:w-2/3 xl:w-1/3 p-4 rounded-xl flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold py-2">Devstore SignUp</h1>
                <div className="w-[25vw] h-[25vw] sm:w-[20vw] sm:h-[20vw] md:w-[7vw] md:h-[7vw] border border-white rounded-full flex items-center justify-center p-2">
                    <Image src={logo} alt="logo" className="w-full" />
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {
                        ({isSubmitting, errors, dirty, touched, isValid, values ,handleChange}: FormikProps<SignUpFields>) => (

                        <Form className="w-full h-[90%] flex flex-col items-center justify-between">
                            <div className="w-full h-2/3 flex flex-col items-center justify-evenly p-5 gap-2">
                                <div className="w-full h-[40%] flex flex-col gap-2 justify-center lg:flex-row items-center">
                                    <Input name="email" type="email" label="e-mail" handleChange={handleChange} className={inputClassName}/>
                                    <Input name="password" type="password" label="senha" handleChange={handleChange} className={inputClassName} />
                                </div>
                                <div className="w-full h-[40%] flex flex-col gap-2 justify-center lg:flex-row items-center">
                                    <Input name="name" type="text" label="nome" handleChange={handleChange} className={inputClassName} />
                                    <Input name="username" type="text" label="usuário" handleChange={handleChange} className={inputClassName} />
                                </div>
                            </div>
                            <Button text="SignUp" isValid={isValid && dirty} isLoading={isSubmitting} />
                        </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    );
}

export default SignUp;