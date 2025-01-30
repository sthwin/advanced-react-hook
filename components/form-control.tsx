
interface FormControlProps {
    label: string
    htmlFor: string
    required?: boolean
    children: React.ReactNode
}

const FormControl = ({ label, htmlFor, required = false, children }: FormControlProps) => {
    return (
        <div className="flex flex-col items.start">
            <label htmlFor={htmlFor}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
        </div>
    )
}

export default FormControl