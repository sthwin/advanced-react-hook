import { cn } from "@/lib/cn"

const loading = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex justify-center items-center h-[50vh]", className)}>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    );
}

export default loading