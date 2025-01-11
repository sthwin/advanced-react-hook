import { cn } from "@/lib/cn"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
}

const Button = ({
    className,
    ...props
}: Props) => (
    <button className={
        cn("w-20 text-md border text-brand border-brand hover:bg-brand hover:text-white rounded-md px-2 py-1"
            , className)}
        {...props}
    />
)


export default Button