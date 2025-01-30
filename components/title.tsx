import Link from "next/link"
import { IoIosArrowRoundBack } from "react-icons/io"

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    backUrl?: string
    className?: string
}

const Title = ({ backUrl, className, ...props }: TitleProps) => {
    if (backUrl) {
        return (
            <div className="flex w-full items-center justify-start">
                <Link href={backUrl}> <IoIosArrowRoundBack className="h-6 w-6" /></Link>
                <h1 className={`w-full flex-1 text-xl text-center my-3 text-black font-bold -translate-x-2 ${className}`}>
                    {props.children}
                </h1>
            </div>
        )
    }
    return (
        <h1 className={`text-xl text-center my-3 text-black font-bold ${className}`}>
            {props.children}
        </h1>
    )
}

export default Title