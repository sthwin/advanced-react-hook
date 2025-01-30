"use client"

import Form, { ErrorMessage, Field, FormErrors, Values } from "@/shared/hooks/use-form-ref"

export interface LoginDefaultValues extends Values {
    email: string
    password: string
}

const Login = () => {
    const defaultValues: LoginDefaultValues = {
        email: '',
        password: ''
    }

    const validate = (values: LoginDefaultValues) => {
        const errors: FormErrors = {}

        if (!values) return errors

        Object.keys(values).forEach(key => {
            if (!values[key]) {
                errors[key] = 'This field is required'
            }
        })

        return errors
    }

    const onSubmit = (values: LoginDefaultValues) => {
        console.log('submit', values)
    }

    return (
        <div className="w-full p-4" >
            <Form
                className="flex flex-col gap-2 justify-center items-start w-full"
                defaultValue={defaultValues}
                validate={validate}
                onSubmit={onSubmit}
            >
                <Field className="w-full p-2 border" name="email" placeholder="Email" />
                <ErrorMessage name="email" />
                <Field
                    className="w-full p-2 border"
                    type="text"
                    placeholder="Password"
                    name="password"
                />
                <ErrorMessage name="password" />
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}

export default Login
