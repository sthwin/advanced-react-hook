import { cn } from "@/lib/cn"

interface PageProps {
    header: React.ReactNode
    footer: React.ReactNode
    children: React.ReactNode
    className?: string
}

const Page = ({ header, footer, children, className }: PageProps) => {
    return (
        <div className={cn("flex flex-col min-w-80")} >
            <header>{header}</header>
            <main className={className ?? ""}>{children}</main>
            <footer className="fixed bottom-0 w-full px-1">{footer}</footer>
        </div>
    )
}

export default Page