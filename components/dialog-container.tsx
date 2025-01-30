import BackDrop from "./backdrop"

interface DialogProps {
    children: React.ReactNode
}

const DialogContainer = ({ children }: DialogProps) => {
    return <BackDrop>
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4 relative w-72 z-50">
            {children}
        </div>
    </BackDrop>
}

export default DialogContainer