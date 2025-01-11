interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    className?: string
}

const Title = ({ className, ...props }: TitleProps) => {
    return (
        <h1 className={`text-xl text-center my-3 text-black font-bold ${className}`} {...props} />
    )
}

export default Title