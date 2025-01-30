import { cn } from "@/lib/cn"
import React, { createContext, useContext, useEffect, useRef, useState } from "react"

export interface Values {
    [key: string]: string
}

export interface FormErrors {
    [key: string]: string
}

interface Touched {
    [key: string]: boolean
}

export const useForm = <T extends Values>(
    initialValues: T,
    validate: (values: T) => FormErrors,
    onSubmit: (values: T) => void) => {
    const ref = useRef<HTMLFormElement>(null)
    const [values, setValues] = useState<T>(initialValues)
    const [errors, setErrors] = useState<FormErrors>({})
    const [touched, setTouched] = useState<Touched>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues(prev => {
            const newValues = {
                ...prev,
                [name]: value
            }
            setErrors(validate(newValues))
            return newValues
        })
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setTouched(prev => ({
            ...prev,
            [e.target.name]: true
        }))
    }

    const getFieldProps = (name: string) => ({
        name,
        value: values[name] || '',
        onChange: handleChange,
        onBlur: handleBlur
    })

    useEffect(() => {
        const errors = validate(values)
        setErrors(errors)
    }, [values])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setTouched(
            Object.keys(values).reduce((touched, key) => {
                touched[key] = true
                return touched
            }, {} as Touched)
        )

        const newErrors = validate(values)
        setErrors(newErrors)
        if (Object.keys(newErrors).some(Boolean)) return
        onSubmit(values)
    }

    return {
        ref,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        handleSubmit,
        getFieldProps
    }
}

export const formContext = createContext<{
    values: Values
    errors: FormErrors
    touched: Touched
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    getFieldProps: (name: string) => {
        name: string
        value: string
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
        onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void
    }
}>({
    values: {} as Values,
    errors: {} as FormErrors,
    touched: {} as Touched,
    handleChange: () => { },
    handleBlur: () => { },
    handleSubmit: () => { },
    getFieldProps: () => ({ name: '', value: '', onChange: () => { }, onBlur: () => { } })
})
formContext.displayName = 'FormContext'

export const Form = <T extends Values>({ children, defaultValue, validate, onSubmit, className }:
    {
        children: React.ReactNode,
        defaultValue: T,
        validate: (values: T) => FormErrors,
        onSubmit: (values: T) => void,
        className?: string
    }) => {
    const formRef = useForm(defaultValue, validate, onSubmit)
    return (<formContext.Provider value={formRef}>
        <form noValidate onSubmit={formRef.handleSubmit} className={className ?? ""}>
            {children}
        </form>
    </formContext.Provider>)
}

export default Form

export const Field = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, ...props }, ref) => {
        const { getFieldProps } = useContext(formContext)
        return <input
            className={cn(className)}
            {...getFieldProps(props.name || '')}
            {...props} ref={ref}></input>
    })
Field.displayName = 'Field'

export const ErrorMessage = ({ name }: { name: string }) => {
    const { errors, touched } = useContext(formContext)
    if (!touched?.[name] && !errors?.[name]) return null
    return (touched?.[name] && errors?.[name] && <p className="text-red-500">{errors[name]}</p>)
}