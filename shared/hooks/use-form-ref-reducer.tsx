import { cn } from "@/lib/cn"
import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from "react"
import MyReact from "../lib/my-react"

export interface Values {
    [key: string]: string
}

export interface FormErrors {
    [key: string]: string
}

interface Touched {
    [key: string]: boolean
}

interface Action {
    type: string
    name?: string
    value?: string
    validate?: (values: unknown) => FormErrors
}

interface State {
    values: Values
    errors: FormErrors
    touched: Touched
}

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_VALUES':
            const newState = {
                ...state,
                values: {
                    [action.name!]: action.value!
                }
            }
            return newState
        case 'SET_TOUCHED':
            return {
                ...state,
                touched: {
                    ...state.touched,
                    [action.name!]: true
                }
            }
        case 'SET_TOUCHED_ALL':
            return {
                ...state,
                touched: {
                    ...Object.keys(state.touched).reduce((touched, key) => {
                        touched[key] = true
                        return touched
                    }, {} as Touched)
                }
            }
        case 'VALIDATE':
            const validatedState = {
                ...state,
                errors: action.validate(state.values)
            }
            return validatedState
        default:
            throw new Error('Unkown action type')
    }
}

export const useForm = <T extends Values>(
    initialValues: T,
    validate: (values: T) => FormErrors,
    onSubmit: (values: T) => void) => {

    const initialState: State = {
        values: initialValues,
        errors: {} as FormErrors,
        touched: {} as Touched
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch({
            type: 'SET_VALUES',
            name,
            value
        })
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        dispatch({
            type: 'SET_TOUCHED',
            name: e.target.name,
        })
    }

    const getFieldProps = (name: string) => ({
        name,
        value: state.values[name] || '',
        onChange: handleChange,
        onBlur: handleBlur
    })

    useEffect(() => {
        dispatch({ type: 'VALIDATE', validate })
    }, [state.values])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'SET_TOUCHED_ALL' })

        const nextState = reducer(state, { type: 'VALIDATE', validate })
        if (Object.values(nextState.errors).some(Boolean)) return

        onSubmit(state.values)
    }

    return {
        handleChange,
        handleBlur,
        handleSubmit,
        getFieldProps,
        ...state,
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